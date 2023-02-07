import React, { useEffect, useState } from "react";
import { CustomerHelper } from "../ether/customer";
import styles from "../css/homepage.module.css";
import { MerchantPage } from "./merchant";

function HomePage(): JSX.Element {
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerBalance, setCustomerBalance] = useState("");
  const [currentPage, setActiveTab] = useState("/customer")

  useEffect(() => {
    getCustomerProfile();
  }, []);

  const setActiveNav = (e) => {
    e.preventDefault();
    setActiveTab(e.target.href);
  }

  const getCustomerProfile = async () => {
    const ch = new CustomerHelper(
      "0xfd488ef26402e50b119645a17a67b2d579836897c2b75b02301b3ee53621fa69"
    );

    setCustomerAddress(await ch.getAddress());
    setCustomerBalance(await ch.getBalance());
  };

  const HomePageComponent = (): JSX.Element => {
    return (
      <div>
        <h1>GSGD UI</h1>
        <h2>Customer Address: {customerAddress}</h2>
        <h2>Customer Balance: {customerBalance}</h2>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className={styles.topnav}>
        <a className={styles.active} href="/customer" onClick={setActiveNav}>Customer</a>
        <a href="/merchant" onClick={setActiveNav}>Merchant</a>
        <a href="#superadmin" onClick={setActiveNav}>SuperAdmin</a>
        <a href="#about" onClick={setActiveNav}>About</a>
      </div>
      {currentPage.includes("/customer") && <HomePageComponent />}
      {currentPage.includes("/merchant") && <MerchantPage />}
    </React.Fragment>
  );
}

export default HomePage;

