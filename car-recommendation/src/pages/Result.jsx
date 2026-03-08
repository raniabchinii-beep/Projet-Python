import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './Result.css'

function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state || {}
  const [selectedCar, setSelectedCar] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  // Base de données simulée de voitures (identique à votre code)
  const carDatabase = {
    // ... (votre base de données existante)
  }

  const getRecommendations = () => {
    if (!data.budget || !data.fuel) return []
    return carDatabase[data.budget]?.[data.fuel] || []
  }

  const recommendations = getRecommendations()

  const getBudgetLabel = (budget) => {
    const labels = { low: "Économique", medium: "Intermédiaire", high: "Premium" }
    return labels[budget] || budget
  }

  const getFuelLabel = (fuel) => {
    const labels = { petrol: "Essence", electric: "Électrique", hybrid: "Hybride" }
    return labels[fuel] || fuel
  }

  const handleCarSelect = (index) => {
    setSelectedCar(index)
    setShowDetails(true)
    // Scroll vers la section détails
    setTimeout(() => {
      document.getElementById('comparison-section')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }, 100)
  }

  return (
    <div className="result-page">
      {/* Cercles d'arrière-plan */}
      <div className="result-bg-circle"></div>
      <div className="result-bg-circle"></div>
      <div className="result-bg-circle"></div>
      
      {/* Boutons de navigation */}
      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => navigate('/')}>
          <span>🏠</span> Accueil
        </button>
        <button className="nav-btn" onClick={() => navigate('/form')}>
          <span>📝</span> Nouvelle recherche
        </button>
      </div>
      
      <div className="result-container">
        {/* En-tête avec les préférences */}
        <div className="result-header">
          <div className="success-badge">
            <span className="badge-icon">✅</span>
            {recommendations.length} véhicules trouvés
          </div>
          
          <h1 className="result-title">
            Vos <span className="gradient-text">recommandations</span>
          </h1>
          
          <div className="preference-summary">
            <div className="preference-chip">
              <span className="chip-icon">💰</span>
              {getBudgetLabel(data.budget)}
            </div>
            <div className="preference-chip">
              <span className="chip-icon">⛽</span>
              {getFuelLabel(data.fuel)}
            </div>
            <div className="preference-chip">
              <span className="chip-icon">👥</span>
              {data.seats} places
            </div>
          </div>
        </div>

        {/* Liste des recommandations */}
        {recommendations.length > 0 ? (
          <>
            <div className="cars-grid">
              {recommendations.map((car, index) => (
                <div 
                  key={index} 
                  className={`car-card ${selectedCar === index ? 'selected' : ''}`}
                  onClick={() => handleCarSelect(index)}
                >
                  <div className="car-card-header">
                    <span className="car-emoji">{car.image}</span>
                    <span className="car-rating">
                      {'★'.repeat(Math.floor(car.rating))}
                      {'☆'.repeat(5 - Math.floor(car.rating))}
                    </span>
                  </div>
                  
                  <h3 className="car-name">{car.name}</h3>
                  <div className="car-price">{car.price}</div>
                  
                  <div className="car-features">
                    <div className="feature">
                      <span className="feature-icon">⚡</span>
                      <span>{car.power}</span>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">⛽</span>
                      <span>{car.consumption}</span>
                    </div>
                    <div className="feature">
                      <span className="feature-icon">👥</span>
                      <span>{car.seats}</span>
                    </div>
                  </div>
                  
                  <button className="view-details-btn">
                    Voir détails
                  </button>
                </div>
              ))}
            </div>

            {/* Section comparateur */}
            {selectedCar !== null && recommendations[selectedCar] && (
              <div id="comparison-section" className="comparison-section">
                <h3 className="comparison-title">
                  <span className="comparison-icon">📊</span>
                  Détails - {recommendations[selectedCar].name}
                </h3>
                <div className="comparison-details">
                  <div className="detail-row">
                    <span>💰 Prix</span>
                    <strong>{recommendations[selectedCar].price}</strong>
                  </div>
                  <div className="detail-row">
                    <span>⚡ Motorisation</span>
                    <strong>{recommendations[selectedCar].fuel}</strong>
                  </div>
                  <div className="detail-row">
                    <span>🔋 Puissance</span>
                    <strong>{recommendations[selectedCar].power}</strong>
                  </div>
                  <div className="detail-row">
                    <span>📊 Consommation</span>
                    <strong>{recommendations[selectedCar].consumption}</strong>
                  </div>
                  <div className="detail-row">
                    <span>⭐ Note</span>
                    <strong>{recommendations[selectedCar].rating}/5</strong>
                  </div>
                  <div className="detail-row">
                    <span>👥 Places</span>
                    <strong>{recommendations[selectedCar].seats}</strong>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>Aucune recommandation trouvée</h3>
            <p>Veuillez retourner au formulaire et sélectionner vos préférences</p>
            <button 
              className="back-button"
              onClick={() => navigate('/form')}
            >
              Retour au formulaire
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Result