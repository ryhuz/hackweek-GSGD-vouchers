import React, { useEffect, useState } from "react";
import { CustomerHelper } from "../ether/customer";

export interface CustomerProfile {
  walletAddress: string;
  ETHBalance: string;
  voucherBalance: string;
}

export const CustomerComponent = (): JSX.Element => {
  const [walletAddress, setWalletAddress] = useState("");
  const [ETHBalance, setETHBalance] = useState("");
  const [voucherBalance, setVoucherBalance] = useState("");

  useEffect(() => {
    getCustomerProfile();
  }, []);

  const getCustomerProfile = async () => {
    //replace with your wallet pk
    const ch = new CustomerHelper(
      "0x21c76e5b824c88972332907c7ce5afcd9a32375c9831fcc3c874a70e8b7dfaa7"
    );
    setVoucherBalance(await ch.voucherBalances());
    setWalletAddress(await ch.getAddress());
    setETHBalance(await ch.getBalance());
  };

  return (
    <div>
      <h1>GSGD UI</h1>
      <h2>Customer Address: {walletAddress}</h2>
      <h2>ETH Balance: {ETHBalance}</h2>
      <h2>Voucher Balance: {voucherBalance.toString()}</h2>
      <h3>twos: </h3>
      <h3>fives: </h3>
      <h3>tens: </h3>
    </div>
  );
};
