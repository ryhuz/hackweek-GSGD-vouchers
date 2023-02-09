import React, { useState } from "react";
import { CustomerComponent } from "../components/customer";
import { MerchantComponent } from "../components/merchant";
import styles from "../css/homepage.module.css";
import { AdminPage } from "./admin";

function HomePage(): JSX.Element {
  const [currentPage, setActiveTab] = useState("/customer");

  const setActiveNav = (e) => {
    e.preventDefault();
    setActiveTab(e.target.href);
  };

  // const checkIfActive(href: string) => {
  // }

  return (
    <React.Fragment>
      <div className={styles.topnav}>
        <a
          className={currentPage.includes("/customer") && styles.active}
          href="/customer"
          onClick={setActiveNav}
        >
          Customer
        </a>
        <a
          className={currentPage.includes("/admin") && styles.active}
          href="/admin"
          onClick={setActiveNav}
        >
          Admin
        </a>
        <a
          className={currentPage.includes("/merchant") && styles.active}
          href="/merchant"
          onClick={setActiveNav}
        >
          Merchant
        </a>
        <a href="#about" onClick={setActiveNav}>
          About
        </a>
      </div>
      {currentPage.includes("/customer") && <CustomerComponent />}
      {currentPage.includes("/admin") && <AdminPage />}
      {currentPage.includes("/merchant") && <MerchantComponent />}
    </React.Fragment>
  );
}

export default HomePage;
