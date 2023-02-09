import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CustomerHelper } from "../ether/customer";

export interface CustomerProfile {
  walletAddress: string;
  ETHBalance: string;
  voucherBalance: string;
}

export const CustomerComponent = (): JSX.Element => {
  const [customer, setCustomer] = useState<CustomerProfile>(null);
  const [customerPK, setCustomerPK] = useState("");
  const [getProfile, setGetProfile] = useState(false);

  useEffect(() => {
    if (customerPK && getProfile) {
      getCustomerProfile();
      setGetProfile(false);
    }
  }, [getProfile]);

  const getCustomerProfile = async () => {
    //replace with your wallet pk
    const ch = new CustomerHelper(customerPK);
    await ch.getAllVoucher();
    const customer: CustomerProfile = {
      walletAddress: await ch.getAddress(),
      ETHBalance: await ch.getBalance(),
      voucherBalance: "",
    };
    setCustomer(customer);
  };

  const handleGetCustomerProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (customerPK) {
      setGetProfile(true);
    } else {
      alert("PK Value not set");
    }
  };

  function handlePKChange(evt: ChangeEvent<HTMLInputElement>) {
    console.log(evt.target.value);
    setCustomerPK(evt.target.value.trim());
  }

  function handleChangePKBtn() {
    setCustomer(null);
    setCustomerPK("");
    setGetProfile(false);
  }
  function refreshProfile() {
    setGetProfile(true);
  }
  return (
    <div>
      {customer ? (
        <div>
          <h2>Customer Address: {customer.walletAddress}</h2>
          <h2>ETH Balance: {customer.ETHBalance}</h2>
          <h2>Voucher Balance: {customer.voucherBalance?.toString()}</h2>
          <button onClick={handleChangePKBtn}>Change PK</button>
          <button onClick={refreshProfile}>Refresh Profile</button>
        </div>
      ) : (
        <form onSubmit={handleGetCustomerProfile}>
          <label>
            Wallet PK:
            <input
              type="text"
              value={customerPK}
              name="setCustomerPK"
              onChange={handlePKChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      )}
    </div>
  );
};
