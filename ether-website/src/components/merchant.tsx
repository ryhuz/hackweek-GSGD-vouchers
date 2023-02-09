import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { GSGDHelper } from "../ether/gsgd";
import { merchantHelper } from "../ether/merchant";

export const MerchantComponent = (): JSX.Element => {
  const [merchant, setMerchant] = useState(null);
  const [merchantPK, setMerchantPK] = useState("");
  const [getProfile, setGetProfile] = useState(false);
  const mh = merchantHelper

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
      merchantName: await mh.getMerchantName(walletAddress)
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
    <div>
      {merchant ? (
        <div>
          <h2>Merchant Name: {merchant.merchantName}</h2>
          <h2>GSGD Balance: {merchant.GSGDBalance?.toString()}</h2>
          <button onClick={handleChangePKBtn}>Change PK</button>
          <button onClick={refreshProfile}>Refresh Profile</button>
        </div>
      ) : (
        <form onSubmit={handleGetMerchantProfile}>
          <label>
            Merchant Wallet PK:
            <input
              type="text"
              value={merchantPK}
              name="setMerchantPK"
              onChange={handlePKChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      )}
    </div>
  );
};
