import React, { useEffect, useState } from "react";
import "../../App.css";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../constants";
import { gameTokenAddress, getContract } from "../../constants/contract";
import gameToken from "../../constants/abis/game_token_abi/game_token.json";
import {formatUnits} from "ethers";

const Header = () => {
  const { activate, active, account, library } = useWeb3React();
  const [tokenBalance, setTokenBalance] = useState<string>();

  useEffect(() => {
    getBalance();
  }, [account,active]);

  const getBalance = async () => {
    try {
      const gameTokenInstance = getContract(
        gameTokenAddress,
        gameToken.abi,
        library,
        account!
      );
      const balance = await gameTokenInstance.balanceOf(account);
      console.log(balance.toString(),"balance");
      const formattedBalance = balance.toString(); 
      const Balance = formatUnits(formattedBalance, 18); 
  
  
      setTokenBalance(Balance);
      
    } catch (error) {
      console.log("Error in getBalance : ", error)
    }
  };

  const connect = async () => {
    try {
      console.log("connect function");
      await activate(injected);
    } catch (exception) {
      console.log(exception);
    }
  };
  
  return (
    <div className="topnav">
      <div className="button-wrapper">
        <p style={{ fontSize: "20px" }}>
          Game Token: <b>{tokenBalance}</b>
        </p>

        <div className="p-2">
          {active ? (
            <span>
              Connected with <b>{account}</b>
            </span>
          ) : (
            <button onClick={connect} className="connect-button">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
