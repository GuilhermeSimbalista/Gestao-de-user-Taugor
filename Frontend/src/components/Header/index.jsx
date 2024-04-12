import React from "react";
import './Header.css';
import taugorLogo from '../../assets/taugorLogo.png'
import homeIcon from '../../assets/home.png'
    

const Header = () => {
    return (
      <header className="header">
            <div className="container">
                <div className="logo-container">
                    <img src={taugorLogo} alt="Taugor logo" className="logo" />
                </div>
                <div className="contact-info">
                    <p>PASSO 2 DE 6</p>
                    <span>Informação de contato</span>
                </div>
            </div>
        <div className="menu-icon">
            <img src={homeIcon} alt="Menu" className="menu" />
        </div>
      </header>
    );
  };
  

export default Header;