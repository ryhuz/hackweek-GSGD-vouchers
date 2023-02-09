import { Button, Layout } from "@lifesg/react-design-system";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "@lifesg/react-design-system/form";
import { FormSection } from "./common/common-styles";
// import { MerchantHelper } from "../ether/merchant";
// import { currUser } from "../keys";

export const MerchantWhitelist = ({ helper }) => {
  const setMerchantAddRef = useRef<HTMLInputElement>();
  const setMerchantNameRef = useRef<HTMLInputElement>();
  const checkMerchantRef = useRef<HTMLInputElement>();

  const [merchantExists, setMerchantExists] = useState<{
    isOnboarded: boolean;
    merchantName: string;
  }>();

  const handleOnboardMerchant = async (e) => {
    e.preventDefault();

    console.log(`[ handleOnboardMerchant ]`, setMerchantAddRef.current.value);
    await helper.onboardMerchant(
      setMerchantAddRef.current.value,
      setMerchantNameRef.current.value
    );
    console.log(`[ handleOnboardMerchant ] Done`);
  };

  const handleMerchantExists = async (e) => {
    e.preventDefault();

    console.log(`[ handleMerchantExists ]`, checkMerchantRef.current.value);
    const exists = await helper.merchantExists(checkMerchantRef.current.value);
    console.log(`[ handleMerchantExists ] Exists?`, exists);
    setMerchantExists(exists);
  };

  return (
    <>
      <FormSection>
        <h1>Onboard Merchant</h1>
        <form onSubmit={handleOnboardMerchant}>
          <Form.Input
            label="New merchant address"
            placeholder="Enter here..."
            ref={setMerchantAddRef}
          />
          <Form.Input
            label="Merchant Name"
            placeholder="Enter here..."
            ref={setMerchantNameRef}
          />
          <Button.Default type="submit" value="submit">
            Onboard
          </Button.Default>
        </form>
        <form onSubmit={handleMerchantExists}>
          <Form.Input
            label="Check merchant address"
            placeholder="Enter here..."
            ref={checkMerchantRef}
          />
          <Button.Default type="submit" value="check">
            Check
          </Button.Default>
          <h2>Does merchant exist?</h2>
          {merchantExists !== undefined && (
            <>
              {merchantExists.isOnboarded ? (
                <>
                  <Layout.Container>
                    <h3>{merchantExists.merchantName} is onboarded</h3>
                    <br />
                    <h3>Merchant address:{checkMerchantRef.current?.value}</h3>
                  </Layout.Container>
                </>
              ) : (
                <Layout.Container>
                  <h3>Not Onboarded</h3>
                </Layout.Container>
              )}
            </>
          )}
        </form>
      </FormSection>
    </>
  );
};
