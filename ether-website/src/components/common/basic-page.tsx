import { MediaQuery } from "@lifesg/react-design-system/media";
import { Navbar } from "@lifesg/react-design-system/navbar";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import HomePage, { PageEnum } from "../../pages";
import { AdminComponent } from "../admin";
import { CustomerComponent } from "../customer";
import { MerchantComponent } from "../merchant";

export interface PageProps {
  children: JSX.Element | JSX.Element[];
}

export const BasicPage = ({ children }: PageProps): JSX.Element => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("customer");

  const handleOnNavItemClick = (item) => {
    if (item.href) {
      setSelectedId(item.id);
      router.push(item.href);
    }
  };
  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <React.Fragment>
      <Page>
        <Navbar
          items={{
            desktop: [
              {
                id: "customer",
                children: "Customer",
                href: `/?page=${PageEnum.CUSTOMER}`,
              },
              {
                id: "admin",
                children: "Admin",
                href: `/?page=${PageEnum.ADMIN}`,
              },
              {
                id: "merchant",
                children: "Merchant",
                href: `/?page=${PageEnum.MERCHANT}`,
              },
            ],
          }}
          selectedId={selectedId}
          onItemClick={handleOnNavItemClick}
        />
        <ContentWrapper>{children}</ContentWrapper>
      </Page>
    </React.Fragment>
  );
};

// =============================================================================
// STYLING
// =============================================================================
const Page = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 113.8px;

  ${MediaQuery.MaxWidth.tablet} {
    padding-top: 85px;
  }
`;
