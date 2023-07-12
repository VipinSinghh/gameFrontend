import React, { useState } from "react";
import "../../App.css";
import { Button, TextField } from "@mui/material";
import { getContract, pricePredictionAddress } from "../../constants/contract";
import { useWeb3React } from "@web3-react/core";
import pricePrediction from "../../constants/abis/price_prediction_abi/priceprediction.json"
import { JsonRpcProvider } from "@ethersproject/providers";


const GameCard = () => {
  const {library, account} = useWeb3React();
  const [betAmount, setBetAmount ] = useState<any>();
  const startGame = async () => {
    console.log("clicked");
    try {
      const provider = new JsonRpcProvider({url : "https://rpc.ankr.com/polygon_mumbai"});
      const pricePredictionInstance = getContract(
        pricePredictionAddress,
        pricePrediction.abi,
        provider,
        account!
      );
  
      const start = await pricePredictionInstance.startGame(5*60*1000);
      console.log("game started")
    } catch (error) {
      console.log("Error in startgameFunction", error)
    }
  }

  const finishGame = async () => {
    try {
      const provider = new JsonRpcProvider({url : "https://rpc.ankr.com/polygon_mumbai"});
      const pricePredictionInstance = getContract(
        pricePredictionAddress,
        pricePrediction.abi,
        provider,
        account!
      );
      const tx = await pricePredictionInstance.finalizeSlot();
      
      console.log('game finished');
    } catch (error) {
      console.log("Error in finishGame", error)
    }
  }
  const placeBet = async (isUp: boolean) => {
    try {
      const provider = new JsonRpcProvider({url : "https://rpc.ankr.com/polygon_mumbai"});
      const pricePredictionInstance = getContract(
        pricePredictionAddress,
        pricePrediction.abi,
        provider,
        account!
      );
      const tx = await pricePredictionInstance.placeBet(isUp, betAmount);
      
      console.log("bet placed");
    } catch (error) {
      console.log("Error in finishGame", error)
    }
  }

  const handleBetAmount = (e:any) => {
    setBetAmount(e.target.value);
  }
  return (
    <div className="right-container">
    <div className="btn-container">
      <Button onClick={startGame} style={{ backgroundColor: "#ffb237" }} variant="contained">
        Start Game
      </Button>
      <Button onClick={finishGame} variant="contained">End Game</Button>
    </div>
    <div className="game-data-container">
      <div className="live-wrapper">
        <p>Id</p>
        <div className="live-content">
          <p>BTC/USDT</p>
          <p>This game round is live</p>
        </div>

        <p>Timer</p>
      </div>
    </div>
    <div className="input-container">
      <TextField
        id="outlined-basic"
        label="Bet Amount"
        variant="outlined"
        sx={{
          width: "100%",
          color: "#fff",
        }}
        value={betAmount}
        onChange={(e)=>handleBetAmount(e)}
      />
    </div>
    <div className="btn-container">
      <Button onClick={()=> placeBet(true)} variant="contained" style={{ backgroundColor: "#31d0aa" }}>
        Bet Up
      </Button>
      <Button onClick={()=>placeBet(false)}  variant="contained" style={{ backgroundColor: "#ed4b9e" }}>
        Bet Down
      </Button>
    </div>
  </div>
  )
}

export default GameCard