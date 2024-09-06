import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

export const SetContext = createContext();

const SetContextProvider = (props) => {
    const [sidebar, setSidebar] = useState(false);
    const [category, setCategory] = useState(0);
    const [themeMode, setThemeMode] = useState("dark");

    const themeChanger = () => {
        setThemeMode((prev) => prev==="light" ? "dark" : "light")
    }




    const contextValue = {
        sidebar,
        setSidebar,
        category,
        setCategory, 
        themeMode,
        setThemeMode,
        themeChanger
    }

    return (
        <SetContext.Provider value={contextValue}>
            {props.children}
        </SetContext.Provider>
    )
}

export default SetContextProvider;