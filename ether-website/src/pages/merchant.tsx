import React, { useEffect, useState } from "react";
import { MerchantHelper } from "../ether/merchant";

export const MerchantPage = (): JSX.Element => {
  const [state, setState] = useState({
    setMerchant: "",
    checkMerchant: "",
    merchantExists: null,
    mh: null
  })

  useEffect(() => {
    initMerchantHelper()
  }, []);

  const initMerchantHelper = () => {
    setState({
      ...state,
      mh: new MerchantHelper("FIXME")
    })
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  const handleOnboardMerchant = async (e) => {
    e.preventDefault();

    console.log(`[ handleOnboardMerchant ]`, state.mh);
    await state.mh.onboardMerchant(state.setMerchant, "test")
    console.log(`[ handleOnboardMerchant ] Done`);
  }

  const handleMerchantExists = async (e) => {
    e.preventDefault();

    console.log(`[ handleMerchantExists ]`, state.mh);
    const exists = await state.mh.merchantExists(state.checkMerchant)
    console.log(`[ handleMerchantExists ] Exists?  ${exists}`);
    setState({
      ...state,
      merchantExists: exists
    });
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
        {state.merchantExists ? <>Yes</> : <></>}
      </form>
    </React.Fragment>
  );
}

