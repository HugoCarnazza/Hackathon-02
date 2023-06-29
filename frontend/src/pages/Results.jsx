/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import "../styles/Results.scss";

function getCategory(priceEstimate) {
  if (priceEstimate <= 90) {
    return { className: "category-1-HC", displayName: "Catégorie :<br/>1-HC" };
  }
  if (priceEstimate <= 165) {
    return { className: "category-2-C", displayName: "Catégorie :<br/>2-C" };
  }
  if (priceEstimate <= 255) {
    return { className: "category-3-B", displayName: "Catégorie :<br/>3-B" };
  }
  if (priceEstimate <= 375) {
    return { className: "category-4-A", displayName: "Catégorie :<br/>4-A" };
  }
  return {
    className: "category-5-Premium",
    displayName: "Catégorie : Premium",
  };
}

function Results({ selectedValues }) {
  const category = getCategory(selectedValues.price_estimate);
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
        <div className="results-right">
          <div className="results-images">
            <img src="src/assets/iphone.png" alt="Logo" />
            <img src="src/assets/iphone2.png" alt="Logo" />
          </div>
          <div className="results-description">
            <div className={`category ${category}`}>
              <p
                className={category.className}
                dangerouslySetInnerHTML={{ __html: category.displayName }}
              />
            </div>
            <div className="price">
              <p>Prix estimé : {selectedValues.price_estimate} euros</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
