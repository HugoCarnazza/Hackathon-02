/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import Home from "./pages/Home";
// eslint-disable-next-line no-unused-vars
import UploadCSV from "./pages/UploadCSV";
import FormModal from "./components/FormModal";
import "./reset.css";
import "./App.css";
import ToggleModal from "./components/ToggleModal";
import NavBar from "./components/NavBar";

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
  const [priceRefecence, setPriceRefecence] = useState("");

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
    setPriceRefecence("");
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
          priceRefecence={priceRefecence}
          setSelectedSystemId={setSelectedSystemId}
          setSelectedBrand={setSelectedBrand}
          setSelectedModel={setSelectedModel}
          setSelectedVersionSystem={setSelectedVersionSystem}
          setSelectedRam={setSelectedRam}
          setSelectedMemory={setSelectedMemory}
          setScreenSize={setScreenSize}
          setSelectedNetwork={setSelectedNetwork}
          setSelectedConditionning={setSelectedConditionning}
          setPriceRefecence={setPriceRefecence}
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
            element={<UploadCSV csvUrl={csvUrl} setCsvUrl={setCsvUrl} />}
          />
        </Routes>
        <ToggleModal
          openModalToggle={openModalToggle}
          closeModalToggle={closeModalToggle}
          modalToggleIsOpen={modalToggleIsOpen}
          setModalToggleIsOpen={setModalToggleIsOpen}
          setModalFormOpen={setModalFormOpen}
          resetFormModal={resetFormModal}
        />
      </div>
    </Router>
  );
}

export default App;
