import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from "../images/logo/Random-dog-logo.svg";

function Header (){
    return(
<header className="header">
        <img className="header__logo" src={logo} alt="Random Dog"></img>
</header>
)
}

export default Header