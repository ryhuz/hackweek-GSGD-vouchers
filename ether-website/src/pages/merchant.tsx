import React, { useEffect, useState } from "react";
import { MerchantHelper } from "../ether/merchant";

export const MerchantPage = (): JSX.Element => {
  const [state, setState] = useState({
    setMerchant: "",
    checkMerchant: ""
  })
  let merchantHelper;

  useEffect(() => {
    merchantHelper = new MerchantHelper("FIXME") //TODO:
  }, []);


  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  const handleOnboardMerchant = async (e) => {
    e.preventDefault();

    console.log(`[ handleOnboardMerchant ]`);
    await merchantHelper.onboardMerchant(state.setMerchant, "test")
    console.log(`[ handleOnboardMerchant ] Done`);
  }

  const handleMerchantExists = async (e) => {
    e.preventDefault();

    console.log(`[ handleMerchantExists ]`);
    const exists = await merchantHelper.merchantExists(state.checkMerchant)
    console.log(`[ handleMerchantExists ] Exists?  ${exists}`);
    return exists;
  }

  return (
    <React.Fragment>
      <h1>Onboard Merchant</h1>
      <form onSubmit={handleOnboardMerchant}>
        <label>New merchant address:
          <input type="text" value={state.setMerchant} name="setMerchant" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={handleMerchantExists}>
        <label>Check merchant address:
          <input type="text" value={state.checkMerchant} name="checkMerchant" onChange={handleChange} />
          <input type="submit" value="Check" />
        </label>
        <h2> Does merchant exist?</h2>
      </form>
    </React.Fragment>
  );
}

