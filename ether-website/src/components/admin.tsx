import { useEffect, useState } from "react";
import { merchantHelper } from "../ether/merchant";
import { voucherHelper } from "../ether/voucher";
import { AirdropVouchers } from "./airdropVouchers";
import { CustomContainer } from "./common/common-styles";
import { MerchantWhitelist } from "./merchantWhitelist";

export const AdminComponent = (): JSX.Element => {
  const [isMerchantAdmin, setIsMerchantAdmin] = useState<boolean>();
  const [isVoucherOwner, setIsVoucherOwner] = useState<boolean>();
  const mh = merchantHelper;
  const vh = voucherHelper;

  useEffect(() => {
    checkIfMerchantContractAdmin();
    checkIfVoucherContractOwner();
  }, []);

  const checkIfMerchantContractAdmin = async () => {
    const hasRole = await mh.hasRole();
    console.log("has default admin role", hasRole);
    setIsMerchantAdmin(hasRole);
  };

  const checkIfVoucherContractOwner = async () => {
    const isOwner = await vh.isOwner();

    console.log("is voucher owner", isOwner);
    setIsVoucherOwner(isOwner);
  };

  if (isMerchantAdmin === undefined || isVoucherOwner === undefined) {
    return null;
  }

  if (isMerchantAdmin === false || isVoucherOwner === false) {
    return (
      <>
        <CustomContainer>
          <h1>Not Admin</h1>
        </CustomContainer>
      </>
    );
  }

  return (
    <>
      <CustomContainer>
        <MerchantWhitelist helper={mh} />
        <hr />
        <AirdropVouchers helper={vh} />
      </CustomContainer>
    </>
  );
};
