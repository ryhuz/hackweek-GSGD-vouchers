import { useEffect, useState } from "react";
import { Voucher, voucherHelper } from "../ether/voucher";

export interface CustomerProfile {
  walletAddress: string;
  ETHBalance: string;
  vouchers: Voucher[];
}

export const CustomerComponent = (): JSX.Element => {
  const [customer, setCustomer] = useState<CustomerProfile>(null);

  useEffect(() => {
    getCustomerProfile();
  }, []);

  const getCustomerProfile = async () => {
    //replace with your wallet pk
    const ch = voucherHelper;

    const customer: CustomerProfile = {
      walletAddress: await ch.getAddress(),
      ETHBalance: await ch.getBalance(),
      vouchers: await ch.getAllVoucher(),
    };
    console.log(customer);
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

  function handleSpendVoucher(tokenId) {
    const vh = voucherHelper;
    vh.spendVoucher(1);
  }

  const renderVoucher = () => {
    return (
      <>
        {customer.vouchers.map((voucher: Voucher, index: number) => {
          {
            console.log("ADDRESS", voucher.merchantAddress.toString());
          }
          <li key={index}>
            <div>1</div>
            <div>{voucher.merchantAddress.toString()}</div>
            <div>{voucher.tokenId.toString()}</div>
            <div>{voucher.value.toString()}</div>
          </li>;
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
