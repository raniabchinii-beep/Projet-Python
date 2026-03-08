import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Form.css'

function Form() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    budget: "",
    fuel: "",
    seats: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/loading", { state: formData })
  }

  return (
    <div className="form-page">
      {/* Éléments d'arrière-plan */}
      <div className="form-bg-circle circle-1"></div>
      <div className="form-bg-circle circle-2"></div>
      
      <div className="form-container">
        <div className="form-header">
          <div className="form-badge">🚗 Étape 1/3</div>
          <h2 className="form-title">
            Personnalisez votre <span className="gradient-text">recherche</span>
          </h2>
          <p className="form-subtitle">
            Répondez à ces quelques questions pour trouver la voiture de vos rêves
          </p>
        </div>

        <form onSubmit={handleSubmit} className="car-form">
          {/* Budget Field */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">💰</span>
              Budget
            </label>
            <div className="select-wrapper">
              <select 
                name="budget" 
                onChange={handleChange} 
                value={formData.budget}
                required
                className="form-select"
              >
                <option value="" disabled>Sélectionnez votre budget</option>
                <option value="low">Économique - Moins de 40 000DT</option>
                <option value="medium">Intermédiaire - 40 000 DT à 80 000DT</option>
                <option value="high">Premium - Plus de 80 000DT</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          {/* Fuel Type Field */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">⛽</span>
              Type de carburant
            </label>
            <div className="select-wrapper">
              <select 
                name="fuel" 
                onChange={handleChange} 
                value={formData.fuel}
                required
                className="form-select"
              >
                <option value="" disabled>Choisissez votre type de motorisation</option>
                <option value="petrol">Essence - Dynamisme et performance</option>
                <option value="electric">Électrique - Zéro émission</option>
                <option value="hybrid">Hybride - Le meilleur des deux mondes</option>
              </select>
              <span className="select-arrow">▼</span>
            </div>
          </div>

          {/* Seats Field */}
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">👥</span>
              Nombre de places
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                required
                min="2"
                max="9"
                placeholder="ex: 5"
                className="form-input"
              />
              <span className="input-suffix">places</span>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            <span>Obtenir mes recommandations</span>
            <svg className="button-arrow" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Progress Indicator */}
          <div className="form-progress">
            <div className="progress-step active"></div>
            <div className="progress-step"></div>
            <div className="progress-step"></div>
          </div>
        </form>

        {/* Trust Badges */}
        <div className="trust-badges">
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span>Données sécurisées</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">⚡</span>
            <span>Résultats instantanés</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🎯</span>
            <span>Recommandations précises</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form