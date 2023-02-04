import React from "react";
import { etherHelper } from "../ether";

function HomePage(): JSX.Element {
  const walletAddress = etherHelper.getWalletAddress();
  return (
    <React.Fragment>
      <h1>GSGD UI</h1>
      <h2>Wallet Address: {walletAddress}</h2>
    </React.Fragment>
  );
}

export default HomePage;
