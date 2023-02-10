import { Button } from "@lifesg/react-design-system/button";
import { Form } from "@lifesg/react-design-system/form";
import { Layout } from "@lifesg/react-design-system/layout";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GSGDHelper } from "../ether/gsgd";
import { merchantHelper } from "../ether/merchant";
import { CustomContainer, FormSection } from "./common/common-styles";

export const MerchantComponent = (): JSX.Element => {
  const [merchant, setMerchant] = useState(null);
  const [merchantPK, setMerchantPK] = useState("");
  const [getProfile, setGetProfile] = useState(false);
  const mh = merchantHelper;

  useEffect(() => {
    if (merchantPK && getProfile) {
      getMerchantProfile();
      setGetProfile(false);
    }
  }, [getProfile]);

  const getMerchantProfile = async () => {
    //replace with your wallet pk
    const ch = new GSGDHelper(merchantPK);
    const walletAddress = await ch.getAddress();

    const merchant = {
      walletAddress,
      GSGDBalance: await ch.gsgdBalances(),
      merchantName: await mh.getMerchantName(walletAddress),
    };
    setMerchant(merchant);
  };

  const handleGetMerchantProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (merchantPK) {
      setGetProfile(true);
    } else {
      alert("PK Value not set");
    }
  };

  function handlePKChange(evt: ChangeEvent<HTMLInputElement>) {
    console.log(evt.target.value);
    setMerchantPK(evt.target.value.trim());
  }

  function handleChangePKBtn() {
    setMerchant(null);
    setMerchantPK("");
    setGetProfile(false);
  }
  function refreshProfile() {
    setGetProfile(true);
  }
  return (
    <CustomContainer>
      {merchant ? (
        <Layout.Section>
          <Layout.Container>
            <h2>Merchant Name: {merchant.merchantName}</h2>
            <h2>GSGD Balance: {merchant.GSGDBalance?.toString()}</h2>
          </Layout.Container>
          <Layout.Container>
            <Button.Default onClick={handleChangePKBtn}>Change PK</Button.Default>
            <Button.Default onClick={refreshProfile}>
              Refresh Profile
            </Button.Default>
          </Layout.Container>
        </Layout.Section>
      ) : (
        <FormSection>
          <form onSubmit={handleGetMerchantProfile}>
            <Form.Input
              label="Merchant Wallet PK"
              placeholder="Enter here..."
              value={merchantPK}
              onChange={handlePKChange}
            />
            <Button.Default type="submit" value="submit">
              Get Details
            </Button.Default>
          </form>
        </FormSection>
      )}
    </CustomContainer>
  );
};
