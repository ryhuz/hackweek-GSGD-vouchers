import { Card, Form } from "@lifesg/react-design-system";
import { Button } from "@lifesg/react-design-system/button";
import { Masonry } from "@lifesg/react-design-system/masonry";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "../css/customer.module.css";
import { merchantHelper } from "../ether/merchant";
import { Voucher, voucherHelper } from "../ether/voucher";
import { CustomContainer } from "./common/common-styles";

export interface CustomerProfile {
  walletAddress: string;
  ETHBalance: string;
  vouchers: Voucher[];
}

export const CustomerComponent = (): JSX.Element => {
  const [customer, setCustomer] = useState<CustomerProfile>(null);
  const [merchantInput, setMerchantInput] = useState("");
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

    const vouchers = await vh.getAllVoucher();

    return Promise.all(
      vouchers.map(async (voucher) => {
        const merchant = await mh.getMerchantName(voucher.merchantAddress);
        return {
          ...voucher,
          merchantName: merchant,
        };
      })
    );
  };

  function handleSpendVoucher(tokenId: number, merchantAddress?: string) {
    const vh = voucherHelper;
    vh.spendVoucher(tokenId, merchantAddress);
    setCustomer({
      ...customer,
      vouchers: customer.vouchers.filter(
        (voucher) => voucher.tokenId != tokenId
      ),
    });
  }

  function handleMerchantChange(evt: ChangeEvent<HTMLInputElement>) {
    setMerchantInput(evt.target.value.trim());
  }

  const renderVoucher = () => {
    return (
      <>
        {customer.vouchers.length > 0 ? (
          customer.vouchers.map((voucher: Voucher, index: number) => {
            return (
              <li key={index}>
                <Card>
                  <div>Token ID:{voucher.tokenId.toString()}</div>
                  <div>
                    Merchant Address:
                    {vh.isEmptyHexAddress(voucher.merchantAddress.toString())
                      ? "No merchant address"
                      : voucher.merchantAddress.toString()}
                  </div>
                  <div>Voucher Value:{voucher.value.toString()}</div>
                </Card>
              </li>
            );
          })
        ) : (
          <h3>NO VOUCHERS </h3>
        )}
      </>
    );
  };

  const renderMerchants = () => {
    return (
      <Masonry.Grid
        numOfCols={{
          lg: 2,
        }}
      >
        {customer.vouchers.map((voucher: Voucher, index: number) => {
          return (
            <>
              <Masonry.Tile startSm={1} colsSm={2} style={{height: 300}}>
                <div className={styles.DemoContainer}>
                  {voucher.merchantName ? voucher.merchantName : "Any Merchant"}
                  {` - $${voucher.value}`}
                  <Button.Default
                    onClick={() =>
                      handleSpendVoucher(
                        voucher.tokenId,
                        !voucher.merchantName &&
                          merchantInput
                      )
                    }
                  >
                    Spend Voucher
                  </Button.Default>
                  {!voucher.merchantName && (
                     <Form.Input
                      placeholder="Merchant Address..."
                      onChange={handleMerchantChange}
                      />
                  )}
                </div>
              </Masonry.Tile>
            </>
          );
        })}
      </Masonry.Grid>
    );
  };

  return (
    <>
      <CustomContainer>
        {customer ? (
          <CustomContainer>
            <h3>Customer Address: {customer.walletAddress}</h3>
            <h3>ETH Balance: {customer.ETHBalance}</h3>
            <h3>Vouchers:</h3>
            <ul>{renderVoucher()}</ul>
            <br />
            <hr />
            <h3>Participating Merchants: </h3>
            {renderMerchants()}
          </CustomContainer>
        ) : (
          <></>
        )}
      </CustomContainer>
    </>
  );
};
