import { useEffect, useState } from "react";
import { Voucher, voucherHelper } from "../ether/voucher";

export interface CustomerProfile {
  walletAddress: string;
  ETHBalance: string;
  vouchers: Voucher[];
}

export const CustomerComponent = (): JSX.Element => {
  const [customer, setCustomer] = useState<CustomerProfile>(null);
  const vh = voucherHelper;

  useEffect(() => {
    getCustomerProfile();
  }, []);

  const getCustomerProfile = async () => {
    const customer: CustomerProfile = {
      walletAddress: await vh.getAddress(),
      ETHBalance: await vh.getBalance(),
      vouchers: await vh.getAllVoucher(),
    };

    setCustomer(customer);
  };

  // const handleGetCustomerProfile = async (e: FormEvent<HTMLFormElement>) => {
  // 	e.preventDefault();
  // 	if (customerPK) {
  // 		setGetProfile(true);
  // 	} else {
  // 		alert("PK Value not set");
  // 	}
  // };

  // function handlePKChange(evt: ChangeEvent<HTMLInputElement>) {
  // 	console.log(evt.target.value);
  // 	setCustomerPK(evt.target.value.trim());
  // }

  // function handleChangePKBtn() {
  // 	setCustomer(null);
  // 	setCustomerPK("");
  // 	setGetProfile(false);
  // }
  // function refreshProfile() {
  // 	setGetProfile(true);
  // }

  function handleSpendVoucher() {
    //TODO: form to select which voucher with state
    vh.spendVoucher(1);
  }

  const renderVoucher = () => {
    return (
      <>
        {customer.vouchers.map((voucher: Voucher, index: number) => {
          return (
            <li key={index}>
              <div>Token ID:{voucher.tokenId.toString()}</div>
              <div>
                Merchant Address:
                {vh.isEmptyHexAddress(voucher.merchantAddress.toString())
                  ? "No merchant address"
                  : voucher.merchantAddress.toString()}
              </div>
              <div>Voucher Value:{voucher.value.toString()}</div>
            </li>
          );
        })}
      </>
    );
  };
  return (
    <div>
      {customer ? (
        <div>
          <h2>Customer Address: {customer.walletAddress}</h2>
          <h2>ETH Balance: {customer.ETHBalance}</h2>
          <div>
            <h2>Vouchers:</h2>
            <ul>{renderVoucher()}</ul>
          </div>
          <br />
          {/* <button onClick={handleChangePKBtn}>Change PK</button>
					<button onClick={refreshProfile}>Refresh Profile</button> */}
          <button onClick={handleSpendVoucher}>Spend Voucher</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
