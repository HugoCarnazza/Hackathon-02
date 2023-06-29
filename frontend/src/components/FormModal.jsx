/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactModal from "react-modal";
import LogoIOS from "../assets/logo-ios.png";
import LogoAndroid from "../assets/logo-android-resize.png";

// eslint-disable-next-line react/prop-types
function FormModal({
  modalFormOpen,
  setModalFormOpen,
  setSelectedValues,
  selectedSystemId,
  selectedBrand,
  selectedModel,
  selectedVersionSystem,
  selectedRam,
  selectedMemory,
  screenSize,
  selectedNetwork,
  selectedConditionning,
  priceReference,
  priceEstimate,
  setSelectedSystemId,
  setSelectedBrand,
  setSelectedModel,
  setSelectedVersionSystem,
  setSelectedRam,
  setSelectedMemory,
  setScreenSize,
  setSelectedNetwork,
  setSelectedConditionning,
  setPriceReference,
  setPriceEstimate,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };
  const [smartphone, setSmartphone] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/smartphone`)
      .then((res) => {
        setSmartphone(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleSystemChange = (event) => {
    const systemId = parseInt(event.target.value, 10);
    if (selectedSystemId === systemId) {
      setSelectedSystemId(null);
    } else {
      setSelectedSystemId(systemId);
      setSelectedBrand(null);
      setSelectedModel(null);
    }
  };

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setSelectedModel(null);
  };

  const filteredBrand = smartphone
    .filter((item) =>
      selectedSystemId ? item.system_id === selectedSystemId : false
    )
    .reduce((uniqueBrands, item) => {
      uniqueBrands.add(item.brand);
      return uniqueBrands;
    }, new Set());

  const uniqueBrandsArray = Array.from(filteredBrand);

  const filteredModels = smartphone
    .filter((item) => (selectedBrand ? item.brand === selectedBrand : false))
    .map((item) => item.model);

  useEffect(() => {
    const calculatePriceEstimate = () => {
      let ponderation = 0;
      if (selectedConditionning === "Deee") {
        ponderation = -100;
      }
      if (selectedConditionning === "Réparable") {
        ponderation = -50;
      }
      if (selectedConditionning === "Bloqué") {
        ponderation = -10;
      }
      if (selectedConditionning === "Reconditionnable") {
        ponderation = -5;
      }
      if (selectedConditionning === "Reconditionné") {
        ponderation = 0;
      }
      if (selectedConditionning === "Bon") {
        ponderation = 5;
      }
      if (selectedConditionning === "Parfait") {
        ponderation = 10;
      }
      setPriceEstimate(priceReference + (priceReference * ponderation) / 100);
    };

    calculatePriceEstimate();
  }, [priceReference, selectedConditionning]);

  const validation = () => {
    setSelectedValues({
      brand: selectedBrand,
      model: selectedModel,
      system_id: selectedSystemId,
      version_system: selectedVersionSystem,
      ram: selectedRam,
      memory: selectedMemory,
      screen_size: screenSize,
      network: selectedNetwork,
      conditionning: selectedConditionning,
      price_reference: priceReference,
      price_estimate: priceEstimate,
    });
    setModalFormOpen(false);
    navigate("/results");
  };

  const cancel = () => {
    setModalFormOpen(false);
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedSystemId("");
    setSelectedVersionSystem("");
    setSelectedRam("");
    setSelectedMemory("");
    setScreenSize("");
    setSelectedNetwork("");
    setSelectedConditionning("");
    setPriceReference("");
  };

  const isFormIncomplete = () => {
    if (
      selectedBrand === null ||
      selectedModel === null ||
      selectedSystemId === "" ||
      selectedVersionSystem === "" ||
      selectedRam === "" ||
      selectedMemory === "" ||
      screenSize === "" ||
      selectedNetwork === "" ||
      selectedConditionning === "" ||
      priceReference === ""
    ) {
      return true;
    }
    return false;
  };

  const content = () => {
    return (
      <div>
        {isLoaded && (
          <div className="flex flex-col gap-4 items-center w-[100%]">
            <div className="flex justify-between">
              <label className="flex justify-center">
                <input
                  type="checkbox"
                  id="Android"
                  name="Android"
                  value="2"
                  onChange={handleSystemChange}
                  checked={selectedSystemId === 2}
                  className="hidden"
                />
                <img
                  src={LogoAndroid}
                  alt="android-logo"
                  className={`${
                    selectedSystemId === 2 ? "bg-[#002743]" : "bg-white"
                  } hover:bg-[#002743c2] hover:cursor-pointer text-white font-bold py-2 px-4 rounded w-[30%]`}
                />
              </label>
              <label className="flex justify-center">
                <input
                  type="checkbox"
                  id="Apple"
                  name="Apple"
                  value="1"
                  onChange={handleSystemChange}
                  checked={selectedSystemId === 1}
                  className="hidden"
                />
                <img
                  src={LogoIOS}
                  alt="ios-logo"
                  className={`${
                    selectedSystemId === 1 ? "bg-[#002743]" : "bg-white"
                  } hover:bg-[#002743c2] hover:cursor-pointer text-white font-bold py-2 px-4 rounded w-[30%]`}
                />
              </label>
            </div>
            <div>
              <label className="flex justify-center items-center gap-5">
                <h3 className="font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal text-left w-[100%] text-[#002743]">
                  System Version:
                </h3>
                <input
                  className="appearance-none w-[100%] h-content p-[7px] rounded-[6px] focus:outline-none border-2 border-solid border-t-slate-200 border-l-slate-200 border-r-slate-200 border-b-[#002743] text-[#002743]"
                  type="text"
                  value={selectedVersionSystem}
                  onChange={(e) => setSelectedVersionSystem(e.target.value)}
                />
              </label>
            </div>
            <div className="flex justify-between w-[100%]">
              <div className="flex flex-col justify-between min-w-min w-320px min-h-min h-340px gap-6 p-[10px]">
                <div className="flex flex-col gap-5">
                  <h3 className="font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal text-left text-[#002743]">
                    Marque :
                  </h3>
                  <select
                    className="w-[100%] h-content p-[7px] rounded-[6px] focus:outline-none border-2 border-solid border-t-slate-200 border-l-slate-200 border-r-slate-200 border-b-[#002743] "
                    name="brand"
                    id="brand-select"
                    onChange={handleBrandChange}
                    value={selectedBrand || ""}
                    style={
                      selectedSystemId
                        ? { color: "#002743" }
                        : { color: "#A0AEC0" }
                    }
                  >
                    <option value="">Marque</option>
                    {uniqueBrandsArray.map((uniqueBrand) => (
                      <option key={uniqueBrand} value={uniqueBrand}>
                        {uniqueBrand}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-5">
                  <h3 className="font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal text-left text-[#002743]">
                    Modèle :
                  </h3>
                  <select
                    className="w-[100%] h-content p-[7px] rounded-[6px] focus:outline-none border-2 border-solid border-t-slate-200 border-l-slate-200 border-r-slate-200 border-b-[#002743] "
                    name="model"
                    id="model-select"
                    value={selectedModel || ""}
                    onChange={(event) => setSelectedModel(event.target.value)}
                    style={
                      selectedBrand
                        ? { color: "#002743" }
                        : { color: "#A0AEC0" }
                    }
                  >
                    <option value="" className="text-gray-400">
                      Modèle
                    </option>
                    {filteredModels.map((uniqueModel) => (
                      <option key={uniqueModel} value={uniqueModel}>
                        {uniqueModel}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex flex-col gap-5">
                    <h3 className="font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal text-left text-[#002743]">
                      Ecran (en pouces):
                    </h3>
                    <input
                      className="appearance-none w-[100%] h-content p-[7px] rounded-[6px] focus:outline-none border-2 border-solid border-t-slate-200 border-l-slate-200 border-r-slate-200 border-b-[#002743] text-[#002743]"
                      name="screen_size"
                      type="text"
                      value={screenSize}
                      onChange={(event) => setScreenSize(event.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col justify-between min-w-min w-320px min-h-min h-340px gap-6 p-[10px]">
                <div className="flex flex-col gap-5">
                  <h3 className="font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal text-left text-[#002743]">
                    RAM :
                  </h3>
                  <div className="grid grid-cols-4 gap-5">
                    <button
                      name="ram"
                      type="button"
                      className={`${
                        selectedRam === "2" ? "bg-[#002743]" : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedRam("2")}
                    >
                      2 Go
                    </button>
                    <button
                      name="ram"
                      type="button"
                      className={`${
                        selectedRam === "3" ? "bg-[#002743]" : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedRam("3")}
                    >
                      3 Go
                    </button>
                    <button
                      name="ram"
                      type="button"
                      className={`${
                        selectedRam === "4" ? "bg-[#002743]" : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedRam("4")}
                    >
                      4 Go
                    </button>
                    <button
                      name="ram"
                      type="button"
                      className={`${
                        selectedRam === "6" ? "bg-[#002743]" : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedRam("6")}
                    >
                      6 Go
                    </button>
                    <button
                      name="ram"
                      type="button"
                      className={`${
                        selectedRam === "8" ? "bg-[#002743]" : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedRam("8")}
                    >
                      8 Go
                    </button>
                    <button
                      name="ram"
                      type="button"
                      className={`${
                        selectedRam === "12" ? "bg-[#002743]" : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedRam("12")}
                    >
                      12 Go
                    </button>
                    <button
                      name="ram"
                      type="button"
                      className={`${
                        selectedRam === "16" ? "bg-[#002743]" : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedRam("16")}
                    >
                      16 Go
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <h3 className="font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal text-left text-[#002743]">
                    Mémoire :
                  </h3>
                  <div className="grid grid-cols-4 gap-5">
                    <button
                      name="memory"
                      type="button"
                      className={`${
                        selectedMemory === "16" ? "bg-[#002743]" : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedMemory("16")}
                    >
                      16 Go
                    </button>
                    <button
                      name="memory"
                      type="button"
                      className={`${
                        selectedMemory === "32" ? "bg-[#002743]" : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedMemory("32")}
                    >
                      32 Go
                    </button>
                    <button
                      name="memory"
                      type="button"
                      className={`${
                        selectedMemory === "64" ? "bg-[#002743]" : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedMemory("64")}
                    >
                      64 Go
                    </button>
                    <button
                      name="memory"
                      type="button"
                      className={`${
                        selectedMemory === "128"
                          ? "bg-[#002743]"
                          : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedMemory("128")}
                    >
                      128 Go
                    </button>
                    <button
                      name="memory"
                      type="button"
                      className={`${
                        selectedMemory === "256"
                          ? "bg-[#002743]"
                          : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedMemory("256")}
                    >
                      256 Go
                    </button>
                    <button
                      name="memory"
                      type="button"
                      className={`${
                        selectedMemory === "512"
                          ? "bg-[#002743]"
                          : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedMemory("512")}
                    >
                      512 Go
                    </button>
                    <button
                      name="memory"
                      type="button"
                      className={`${
                        selectedMemory === "1To"
                          ? "bg-[#002743]"
                          : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedMemory("1To")}
                    >
                      1 To
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <h3 className="font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal text-left text-[#002743]">
                    Réseau :
                  </h3>
                  <div className="flex gap-5">
                    <button
                      name="network"
                      type="button"
                      className={`${
                        selectedNetwork === "4G"
                          ? "bg-[#002743]"
                          : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedNetwork("4G")}
                    >
                      4G
                    </button>
                    <button
                      name="network"
                      type="button"
                      className={`${
                        selectedNetwork === "4G+"
                          ? "bg-[#002743]"
                          : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedNetwork("4G+")}
                    >
                      4G+
                    </button>
                    <button
                      name="network"
                      type="button"
                      className={`${
                        selectedNetwork === "5G"
                          ? "bg-[#002743]"
                          : "bg-gray-300"
                      } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                      onClick={() => setSelectedNetwork("5G")}
                    >
                      5G
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal text-center text-[#002743]">
                Etat de l'appareil :
              </h3>
              <div className="flex gap-5">
                <button
                  name="conditionning"
                  type="button"
                  className={`${
                    selectedConditionning === "DEEE"
                      ? "bg-[#002743]"
                      : "bg-gray-300"
                  } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                  onClick={() => setSelectedConditionning("DEEE")}
                >
                  DEEE
                </button>
                <button
                  name="conditionning"
                  type="button"
                  className={`${
                    selectedConditionning === "Réparable"
                      ? "bg-[#002743]"
                      : "bg-gray-300"
                  } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                  onClick={() => setSelectedConditionning("Réparable")}
                >
                  Réparable
                </button>
                <button
                  name="conditionning"
                  type="button"
                  className={`${
                    selectedConditionning === "Bloqué"
                      ? "bg-[#002743]"
                      : "bg-gray-300"
                  } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                  onClick={() => setSelectedConditionning("Bloqué")}
                >
                  Bloqué
                </button>
                <button
                  name="conditionning"
                  type="button"
                  className={`${
                    selectedConditionning === "Reconditionnable"
                      ? "bg-[#002743]"
                      : "bg-gray-300"
                  } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                  onClick={() => setSelectedConditionning("Reconditionnable")}
                >
                  Reconditionnable
                </button>
                <button
                  name="conditionning"
                  type="button"
                  className={`${
                    selectedConditionning === "Reconditionné"
                      ? "bg-[#002743]"
                      : "bg-gray-300"
                  } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                  onClick={() => setSelectedConditionning("Reconditionné")}
                >
                  Reconditionné
                </button>
                <button
                  name="conditionning"
                  type="button"
                  className={`${
                    selectedConditionning === "Bon"
                      ? "bg-[#002743]"
                      : "bg-gray-300"
                  } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                  onClick={() => setSelectedConditionning("Bon")}
                >
                  Bon
                </button>
                <button
                  name="conditionning"
                  type="button"
                  className={`${
                    selectedConditionning === "Parfait"
                      ? "bg-[#002743]"
                      : "bg-gray-300"
                  } hover:bg-[#002743c2] text-white font-bold py-2 px-4 rounded`}
                  onClick={() => setSelectedConditionning("Parfait")}
                >
                  Parfait
                </button>
              </div>
            </div>
            <div>
              <label className="flex justify-center items-center gap-5">
                <h3 className="font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal text-right w-content text-[#002743]">
                  Prix de référence
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-[20px] h-[20px] text-gray-500 cursor-pointer"
                  onClick={() => setShowModal(!showModal)}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                </svg>
                <input
                  name="price-reference"
                  type="text"
                  className="appearance-none w-[30%] h-content p-[7px] rounded-[6px] focus:outline-none border-2 border-solid border-t-slate-200 border-l-slate-200 border-r-slate-200 border-b-[#002743] text-[#002743] "
                  value={priceReference}
                  onChange={(event) => setPriceReference(event.target.value)}
                />
              </label>
            </div>
            {showModal && (
              <div>
                <p className="text-[#002743]">
                  Vous pouvez récupérer un prix sur
                  <a
                    href="https://www.kimovil.com/fr/"
                    className="text-blue-500 underline ml-2"
                  >
                    https://www.kimovil.com/fr/
                  </a>
                </p>
              </div>
            )}
            <div className="flex justify-between w-[100%] pl-[20%] pr-[20%]">
              <button
                type="button"
                onClick={cancel}
                className="w-content h-content p-[10px] rounded-[10px] border-2 border-solid border-[#002743] hover:bg-[#002743] hover:text-white font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal text-[#002743]"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={validation}
                disabled={isFormIncomplete()}
                className={`w-content h-content p-[10px] rounded-[10px] border-2 border-solid border-[#002743] font-fira-sans text-[22px] font-bold leading-[26px] tracking-normal ${
                  isFormIncomplete()
                    ? "bg-gray-400 border-none text-white"
                    : "text-[#002743] hover:bg-[#002743] hover:text-white "
                }`}
              >
                Valider
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <ReactModal
      isOpen={modalFormOpen}
      onRequestClose={cancel}
      style={customModalStyles}
      ariaHideApp={false}
      className="h-fit w-fit border-none rounded-2xl py-5 px-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
    >
      {content()}
    </ReactModal>
  );
}

export default FormModal;
