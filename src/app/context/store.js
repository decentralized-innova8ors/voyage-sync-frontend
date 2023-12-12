'use client'

import { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
  myWeb5: '',
  myDid: ''
})

export const GlobalContextProvider = ({ children }) => {
  const [myWeb5, setMyWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);

  return (
    <GlobalContext.Provider value={{ myWeb5, setMyWeb5, myDid, setMyDid}}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);