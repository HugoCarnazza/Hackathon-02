/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Papa from "papaparse";

function UploadCSV({ csvUrl, setCsvUrl }) {
  function tableauToJson(tableau) {
    const keys = tableau[0]; // Les clés sont définies par le premier tableau
    const result = [];

    for (let i = 1; i < tableau.length; i++) {
      const values = tableau[i];
      const obj = {};

      for (let j = 0; j < values.length; j++) {
        const key = keys[j];
        let value = values[j];
        // Conversion de certaines valeurs en types appropriés (par exemple, 'system_id' en nombre)
        if (key === "system_id") {
          value = Number(value);
        }

        obj[key] = value;
      }

      result.push(obj);
    }

    return result;
  }

  const handleDataBaseUpload = (url) => {
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        Papa.parse(data, {
          complete: (parsedData) => {
            const allresults = parsedData.data;
            const results = tableauToJson(allresults);
            axios
              .post(`${import.meta.env.VITE_BACKEND_URL}/smartphone`, {
                resultsCsv: results,
              })
              // eslint-disable-next-line no-shadow
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.error("Erreur lors de l'envoi des données :", error);
              });
          },
          error: (err) => {
            console.error("Erreur lors de la lecture du fichier CSV :", err);
          },
        });
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données CSV :",
          error
        );
      });
  };

  return (
    <div className="mx-auto px-4">
      <div className="fixed top-[65px] left-[8px] md:left-[22%]">
        <h1 className="mx-auto text-center font-bold text-xl mb-5">
          Enrichissez votre base de données
        </h1>
        <div className="flex flex-col gap-5">
          <p>
            1. Rendez-vous sur le lien suivant :{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1f3ATnddcekf3OuJkntZyLNDpdGF0ya-b/edit?usp=sharing&ouid=115175269734328738233&rtpof=true&sd=true"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              Cliquez ici
            </a>
          </p>
          <p>2. Cliquez sur "Fichier" {">"} "Créer une copie"</p>
          <p>
            3. Renseignez les valeurs des smartphones que vous souhaitez ajouter
            à votre base de données en remplissant soigneusement tous les
            champs.
          </p>
          <p>
            4. Cliquez sur "Fichier" {">"} "Partager" {">"} "Publier sur le Web"
          </p>
          <p>
            5. Sélectionnez "Document Entier" et "Valeurs séparées par des
            virgules (.csv)" puis cliquez sur "Publier"{" "}
          </p>
          <p>
            6. Copiez le lien ainsi obtenu, collez-le dans l'input ci-dessous et
            cliquez sur "Valider":
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 mt-[24px]">
          <input
            type="text"
            value={csvUrl}
            onChange={(e) => setCsvUrl(e.target.value)}
            className="border-2 border-gray-300 rounded-lg w-[200px]"
          />
          <button
            type="button"
            onClick={() => handleDataBaseUpload(csvUrl)}
            className=""
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

UploadCSV.propTypes = {
  csvUrl: PropTypes.string.isRequired,
  setCsvUrl: PropTypes.func.isRequired,
};

export default UploadCSV;
