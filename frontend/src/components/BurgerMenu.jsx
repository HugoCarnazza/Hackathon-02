import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import blueAddSymbol from "../assets/blue_add_symbol.png";
import blueInterrogation from "../assets/blue_interrogation.png";

function BurgerMenu({ burgerOpen, setBurgerOpen, openModalToggle }) {
  const navigate = useNavigate();
  return (
    <div
      className={`transition-container z-10 relative transition-transform duration-500 w-[95vw] mx-auto mt-[50px] bg-[#002743] rounded-lg ${
        burgerOpen ? "transform translate-x-0" : "translate-x-[108%]"
      }`}
    >
      <div
        className={`w-[90vw] shadow-md drop-shadow-sm  rounded-lg flex flex-col items-center mx-auto font-bold text-xl px-[20px] py-[10px] justify-between gap-4 mt-[24px] text-[#00ACB0]  ${
          burgerOpen ? "translate-x-0" : " transform translate-x-[108%]"
        }`}
      >
        <button
          type="button"
          className="flex items-center justify-center align-baseline gap-2 w-[100%]"
          onClick={() => {
            setBurgerOpen(false);
            openModalToggle();
          }}
        >
          <img src={blueAddSymbol} alt="symbole plus" className="w-[18px]" />
          <p>Estimer un smartphone</p>
        </button>
        <Link
          to="/upload"
          className="flex items-center justify-center gap-3 w-[100%]"
          onClick={() => setBurgerOpen(false)}
        >
          <img src={blueAddSymbol} alt="symbole plus" className="w-[18px]" />
          <p>Ajouter des références</p>
        </Link>
        <button
          type="button"
          className="flex items-center justify-center gap-3 w-[100%]"
          onClick={() => {
            navigate("/faq");
            setBurgerOpen(false);
          }}
        >
          <img
            src={blueInterrogation}
            alt="symbole plus"
            className="w-[18px]"
          />
          <p>FAQ</p>
        </button>
      </div>
    </div>
  );
}

BurgerMenu.propTypes = {
  burgerOpen: PropTypes.bool.isRequired,
  setBurgerOpen: PropTypes.func.isRequired,
  openModalToggle: PropTypes.func.isRequired,
};

export default BurgerMenu;
