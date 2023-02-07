import React, { useEffect, useState } from "react";
import { CustomerHelper } from "../ether/customer";

function HomePage(): JSX.Element {
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerBalance, setCustomerBalance] = useState("");

  useEffect(() => {
    getCustomerProfile();
  }, []);

  const getCustomerProfile = async () => {
    const ch = new CustomerHelper(
      "0xfd488ef26402e50b119645a17a67b2d579836897c2b75b02301b3ee53621fa69"
    );

    setCustomerAddress(await ch.getAddress());
    setCustomerBalance(await ch.getBalance());
  };

  return (
    <React.Fragment>
      <h1>GSGD UI</h1>
      <h2>Customer Address: {customerAddress}</h2>
      <h2>Customer Balance: {customerBalance}</h2>
    </React.Fragment>
  );
}

export default HomePage;
