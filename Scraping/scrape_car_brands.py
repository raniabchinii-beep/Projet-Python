import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import os

def scrape_car_brands(url="https://www.automobile.tn/fr/neuf"):
    """
    Scrapes car brands from the automobile.tn website.
    Objective: Extract all car brands available on the site.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    print(f"Fetching car brands from {url}...")
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        return None
    
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Chercher le conteneur des marques basé sur la structure HTML fournie
    brand_items = []
    
    # Méthode 1: Chercher les liens dans le div "brands-list"
    brands_container = soup.find("div", class_="brands-list")
    
    if brands_container:
        # Chercher tous les liens de marques
        brand_links = brands_container.find_all("a", href=True)
        
        for link in brand_links:
            # Extraire le nom de la marque de l'URL
            href = link.get("href", "")
            if "/fr/neuf/" in href or "/fr/occasion/" in href:
                # Extraire le nom de la marque de l'URL
                brand_name = href.split("/")[-1].replace("-", " ").title()
                
                # Chercher l'image associée
                img_tag = link.find("img")
                img_url = img_tag.get("src", "") if img_tag else ""
                
                brand_items.append({
                    "brand": brand_name,
                    "link": f"https://www.automobile.tn{href}" if not href.startswith("http") else href,
                    "image_url": img_url,
                    "scraped_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                })
    
    # Méthode alternative: Chercher toutes les images de marques
    if not brand_items:
        brand_images = soup.find_all("img", alt=True)
        
        for img in brand_images:
            alt_text = img.get("alt", "")
            if "logo" in alt_text.lower() or any(brand_keyword in alt_text.lower() for brand_keyword in ["alfa", "bmw", "mercedes", "audi", "toyota"]):
                # Chercher le lien parent
                parent_link = img.find_parent("a")
                link_url = parent_link.get("href", "") if parent_link else ""
                
                brand_items.append({
                    "brand": alt_text,
                    "link": f"https://www.automobile.tn{link_url}" if link_url and not link_url.startswith("http") else link_url,
                    "image_url": img.get("src", ""),
                    "scraped_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                })
    
    return pd.DataFrame(brand_items)

if __name__ == "__main__":
    df = scrape_car_brands()
    
    if df is not None and not df.empty:
        print(f"Successfully scraped {len(df)} car brands.")
        print("\nListe des marques trouvées:")
        print("-" * 50)
        for index, row in df.iterrows():
            print(f"{index+1}. {row['brand']}")
            print(f"   Lien: {row['link']}")
            print(f"   Image: {row['image_url'][:50]}..." if len(row['image_url']) > 50 else f"   Image: {row['image_url']}")
            print("-" * 50)
        
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        DATA_DIR = os.path.join(BASE_DIR, "..", "data")
        os.makedirs(DATA_DIR, exist_ok=True)
        # Sauvegarder dans un fichier CSV
        df.to_csv(os.path.join(DATA_DIR, "car_brands.csv"), index=False)
        print(f"\nDonnées sauvegardées dans data/car_brands.csv")
    else:
        print("Aucune marque de voiture trouvée.")