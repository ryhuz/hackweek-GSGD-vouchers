import { useEffect, useState } from "react";
import { Voucher, voucherHelper } from "../ether/voucher";
import { Masonry } from "@lifesg/react-design-system/masonry";
import styles from "../css/customer.module.css";
import { merchantHelper } from "../ether/merchant";

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
      vouchers: await getVouchers(),
    };

    setCustomer(customer);
  };

  const getVouchers = async () => {
    const mh = merchantHelper;

    const vouchers = await vh.getAllVoucher()

    return Promise.all(vouchers.map(async (voucher) => {
      const merchant = await mh.getMerchantName(voucher.merchantAddress);
      return {
        ...voucher,
        merchantName: merchant
      };
    }))

  }

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

  function handleSpendVoucher(tokenId: number, merchantAddress?: string) {
    const vh = voucherHelper;
    vh.spendVoucher(tokenId, merchantAddress);
    setCustomer(
      {
        ...customer,
        vouchers: customer.vouchers.filter(voucher => voucher.tokenId != tokenId)
      }
    )
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


  const renderMerchants = () => {
    return (
      <Masonry.Grid numOfCols={{
        lg: 2
      }}>
        {customer.vouchers.map((voucher: Voucher, index: number) => {
          return <>
            <Masonry.Tile startSm={1} colsSm={2}>
              <div className={styles.DemoContainer}>
                {voucher.merchantName ? voucher.merchantName : "Any Merchant"}
                <button onClick={() => handleSpendVoucher(voucher.tokenId, !voucher.merchantName && "0x4aAED7cA70d287F2a475aB66D12bc5c0F10ceCBf")}>Spend Voucher</button>
              </div>

            </Masonry.Tile>
          </>
        })}
      </Masonry.Grid>
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
          <>
            <h2>Participating Merchants: </h2>
            {renderMerchants()}
          </>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
