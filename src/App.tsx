import React from "react";
import "./App.css";
import Header from "./components/Header";
import GameTable from "./components/Table";
import GameCard from "./components/Gamecard";
import { Web3ReactProvider } from "@web3-react/core";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";

const App = () => {
  const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
    return new Web3Provider(provider);
  };
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
    <div className="App">
      <Header />
      <div className="game-container">
        <div style={{ width: "60%", marginTop: "10px" }}>
          <GameTable />
        </div>
        <GameCard />
      </div>
    </div>
    </Web3ReactProvider>
  );
}

export default App;
