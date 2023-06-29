/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import Home from "./pages/Home";
// eslint-disable-next-line no-unused-vars
import UploadCSV from "./pages/UploadCSV";
import Results from "./pages/Results";
import NavBar from "./components/NavBar";
import FormModal from "./components/FormModal";
import "./reset.css";
import "./App.css";
import ToggleModal from "./components/ToggleModal";
import Faq from "./pages/Faq";

Modal.setAppElement("#root");
function App() {
  const [modalToggleIsOpen, setModalToggleIsOpen] = useState(false);
  const openModalToggle = () => {
    setModalToggleIsOpen(true);
  };

  const closeModalToggle = () => {
    setModalToggleIsOpen(false);
  };
  const [modalFormOpen, setModalFormOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedValues, setSelectedValues] = useState({
    brand: null,
    model: null,
    system_id: null,
    version_system: null,
    ram: "",
    memory: "",
    screen_size: "",
    network: "",
    conditionning: "",
    price_reference: "",
  });
  const [selectedSystemId, setSelectedSystemId] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedVersionSystem, setSelectedVersionSystem] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedMemory, setSelectedMemory] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [selectedConditionning, setSelectedConditionning] = useState("");
  const [priceReference, setPriceReference] = useState("");
  const [priceEstimate, setPriceEstimate] = useState("");

  const [urlSent, setUrlSent] = useState(false);

  const resetFormModal = () => {
    setModalFormOpen(true);
    setSelectedSystemId(null);
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedVersionSystem("");
    setSelectedRam("");
    setSelectedMemory("");
    setScreenSize("");
    setSelectedNetwork("");
    setSelectedConditionning("");
    setPriceReference("");
  };
  // eslint-disable-next-line no-unused-vars
  const [csvUrl, setCsvUrl] = useState("");

  return (
    <Router>
      <div className="App overflow-hidden">
        <FormModal
          modalFormOpen={modalFormOpen}
          setModalFormOpen={setModalFormOpen}
          setSelectedValues={setSelectedValues}
          selectedSystemId={selectedSystemId}
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          selectedVersionSystem={selectedVersionSystem}
          selectedRam={selectedRam}
          selectedMemory={selectedMemory}
          screenSize={screenSize}
          selectedNetwork={selectedNetwork}
          selectedConditionning={selectedConditionning}
          priceReference={priceReference}
          priceEstimate={priceEstimate}
          setSelectedSystemId={setSelectedSystemId}
          setSelectedBrand={setSelectedBrand}
          setSelectedModel={setSelectedModel}
          setSelectedVersionSystem={setSelectedVersionSystem}
          setSelectedRam={setSelectedRam}
          setSelectedMemory={setSelectedMemory}
          setScreenSize={setScreenSize}
          setSelectedNetwork={setSelectedNetwork}
          setSelectedConditionning={setSelectedConditionning}
          setPriceReference={setPriceReference}
          setPriceEstimate={setPriceEstimate}
          urlSent={urlSent}
        />
        <ToggleModal
          openModalToggle={openModalToggle}
          closeModalToggle={closeModalToggle}
          modalToggleIsOpen={modalToggleIsOpen}
          setModalToggleIsOpen={setModalToggleIsOpen}
          setModalFormOpen={setModalFormOpen}
          resetFormModal={resetFormModal}
        />
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                openModalToggle={openModalToggle}
                closeModalToggle={closeModalToggle}
              />
            }
          />
          <Route
            path="/upload"
            element={
              <UploadCSV
                csvUrl={csvUrl}
                setCsvUrl={setCsvUrl}
                urlSent={urlSent}
                setUrlSent={setUrlSent}
              />
            }
          />

          <Route
            path="/results"
            element={<Results selectedValues={selectedValues} />}
          />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
