import React, { useEffect, useState } from "react";
import { CustomerHelper } from "../ether/customer";
import styles from "../css/homepage.module.css";
import { AdminPage } from "./admin";

function HomePage(): JSX.Element {
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerBalance, setCustomerBalance] = useState("");
  const [voucherBalance, setVoucherBalance] = useState("");

  const [currentPage, setActiveTab] = useState("/customer")

  useEffect(() => {
    getCustomerProfile();
  }, []);

  const setActiveNav = (e) => {
    e.preventDefault();
    setActiveTab(e.target.href);
  }

  // const checkIfActive(href: string) => {
  // }

  const getCustomerProfile = async () => {
    const ch = new CustomerHelper(
      "0x5b3208286264f409e1873e3709d3138acf47f6cc733e74a6b47a040b50472fd8"
    );
    setVoucherBalance(await ch.voucherBalances());
    setCustomerAddress(await ch.getAddress());
    setCustomerBalance(await ch.getBalance());
  };

  const HomePageComponent = (): JSX.Element => {
    return (
      <div>
        <h1>GSGD UI</h1>
        <h2>Customer Address: {customerAddress}</h2>
        <h2>Customer Balance: {customerBalance}</h2>
        <h2>Voucher Balance: {voucherBalance.toString()}</h2>
        <h3>twos: </h3>
        <h3>fives: </h3>
        <h3>tens: </h3>

      </div>
    )
  }

  return (
    <React.Fragment>
      <div className={styles.topnav}>
        <a className={currentPage.includes("/customer") && styles.active} href="/customer" onClick={setActiveNav}>Customer</a>
        <a className={currentPage.includes("/admin") && styles.active} href="/admin" onClick={setActiveNav}>Admin</a>
        <a className={currentPage.includes("/merchant") && styles.active} href="/merchant" onClick={setActiveNav}>Merchant</a>
        <a href="#about" onClick={setActiveNav}>About</a>
      </div>
      {currentPage.includes("/customer") && <HomePageComponent />}
      {currentPage.includes("/admin") && <AdminPage />}
    </React.Fragment>
  );
}

export default HomePage;

