import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import './Loading.css'

function Loading() {
  const navigate = useNavigate()
  const location = useLocation()
  const userData = location.state

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result", { state: userData })
    }, 3000) // Un peu plus long pour profiter de l'animation

    return () => clearTimeout(timer)
  }, [navigate, userData])

  return (
    <div className="loading-page">
      {/* Éléments d'arrière-plan */}
      <div className="loading-bg-circle"></div>
      <div className="loading-bg-circle"></div>
      
      <div className="loading-container">
        {/* Animation de voiture */}
        <div className="car-animation">
          <div className="car-body">
            <div className="car-roof"></div>
            <div className="car-window front-window"></div>
            <div className="car-window back-window"></div>
            <div className="car-light front-light"></div>
            <div className="car-light back-light"></div>
          </div>
          <div className="car-wheels">
            <div className="wheel left-wheel">
              <div className="wheel-spin"></div>
            </div>
            <div className="wheel right-wheel">
              <div className="wheel-spin"></div>
            </div>
          </div>
          <div className="road-lines"></div>
        </div>

        {/* Barre de progression */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>

        {/* Texte de chargement */}
        <h2 className="loading-title">
          Recherche du véhicule idéal
        </h2>
        
        <p className="loading-subtitle">
          Analyse de vos préférences en cours
        </p>

        {/* Messages dynamiques */}
        <div className="loading-messages">
          <div className="message-bubble">
            <span className="message-icon">🔍</span>
            <span>Analyse du budget...</span>
          </div>
          <div className="message-bubble">
            <span className="message-icon">⚡</span>
            <span>Vérification des motorisations...</span>
          </div>
          <div className="message-bubble">
            <span className="message-icon">🎯</span>
            <span>Sélection des meilleures options...</span>
          </div>
        </div>

        {/* Statistiques en temps réel (simulées) */}
        <div className="live-stats">
          <div className="stat-pill">
            <span className="stat-pulse"></span>
            <span>1248 véhicules analysés</span>
          </div>
          <div className="stat-pill">
            <span>⏱️ Temps estimé: 3s</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading