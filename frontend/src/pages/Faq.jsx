import React from "react";
import "../styles/Faq.scss";

function Faq() {
  return (
    <div className="faq-container">
      <h1>FAQs</h1>
      <div>
        <h2>Comment commencer l'estimation du prix des téléphones?</h2>
        <p>
          Vous pouvez commencer l'estimation en cliquant sur le bouton
          "Commencer l'estimation" sur la page d'accueil ou "Estimer un
          smartphone" dans la barre de navigation latérale.
        </p>
      </div>
      <div>
        <h2>Comment ajouter des références?</h2>
        <p>
          Vous pouvez ajouter des références en cliquant sur le bouton "Ajouter
          des références" sur la page d'accueil.
        </p>
      </div>
      <div>
        <h2>Qu'est-ce qu'une référence?</h2>
        <p>
          Une référence est un modèle ou une version spécifique d'un téléphone.
        </p>
      </div>
      <div>
        <h2>Comment puis-je recevoir mon estimation?</h2>
        <p>
          Une fois que vous avez rempli les informations nécessaires pour
          l'estimation, vous recevrez votre estimation sur la page de résultats
          qui s'ouvrira automatiquement lorssque vous soumettrez votre demande
          d'estimation.
        </p>
      </div>
    </div>
  );
}

export default Faq;
