import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import blueAddSymbol from "../assets/blue_add_symbol.png";
import blueInterrogation from "../assets/blue_interrogation.png";

function BurgerMenu({ burgerOpen, setBurgerOpen, openModalToggle }) {
  const navigate = useNavigate();
  return (
    <div
      className={`transition-container z-10 fixed top-0 left-[5vw] duration-500 w-[90vw] mx-auto mt-[50px] bg-[#002743] rounded-lg  ${
        burgerOpen ? "" : "hidden"
      }`}
    >
      <div
        className={`w-[90vw]  rounded-lg flex flex-col items-center mx-auto font-bold text-2xl px-[20px] py-[10px] justify-between gap-4 my-[16px] text-[#00ACB0] ${
          burgerOpen ? "" : "hidden"
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
