import React from "react";

function HomePage(): JSX.Element {
  const walletAddress = "hello world";
  return (
    <React.Fragment>
      <h1>GSGD UI</h1>
      <h2>Wallet Address: {walletAddress}</h2>
    </React.Fragment>
  );
}

export default HomePage;
