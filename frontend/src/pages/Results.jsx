/* eslint-disable react/prop-types */
import "../styles/Results.scss";

function Results({ selectedValues }) {
  return (
    <div className="page-container">
      <h2>Résultats</h2>
      <div className="results-container">
        <div className="results">
          <p>Marque : {selectedValues.brand}</p>
          <p>Modèle : {selectedValues.model}</p>
          <p>Version du système: {selectedValues.version_system}</p>
          <p>Ram : {selectedValues.ram} GB</p>
          <p>Mémoire : {selectedValues.memory} GB</p>
          <p>Taille d'écran : {selectedValues.screen_size} pouces</p>
          <p>Réseau : {selectedValues.network}</p>
          <p>Conditionnement : {selectedValues.conditionning}</p>
          <p>Prix de référence : {selectedValues.price_reference} euros</p>
        </div>
        <div className="results-images">
          <img src="src/assets/iphone.png" alt="Logo" />
          <img src="src/assets/iphone2.png" alt="Logo" />
        </div>
      </div>
    </div>
  );
}

export default Results;
