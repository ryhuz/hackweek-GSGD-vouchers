import { Layout } from "@lifesg/react-design-system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BasicPage } from "../components/common/basic-page";
import { CustomerComponent } from "../components/customer";
import { MerchantComponent } from "../components/merchant";
import styles from "../css/homepage.module.css";
import { AdminComponent } from "../components/admin";

export enum PageEnum {
  ADMIN = "admin",
  MERCHANT = "merchant",
  CUSTOMER = "customer",
}

const HomePage = () => {
  const router = useRouter();

  const renderComponent = () => {
    switch (router.query.page as PageEnum) {
      case PageEnum.ADMIN:
        return <AdminComponent />;
      case PageEnum.CUSTOMER:
        return <CustomerComponent />;
      case PageEnum.MERCHANT:
        return <MerchantComponent />;
      default:
        return <div />;
    }
  };
  return (
    <BasicPage>
      <Layout.Content>{renderComponent()}</Layout.Content>
    </BasicPage>
  );
};

export default HomePage;
