import React from "react";
import "./DarkMode.css";
import ToggleOn from "../Assets/ToggleOn.png";
import ToggleOff from "../Assets/ToggleOff.png";

const DarkMode = ( )=> {
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
    }
    
    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
    }
    setDarkMode;
}

