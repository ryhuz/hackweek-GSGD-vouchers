import { useEffect, useState } from "react";
import { MerchantWhitelist } from "../components/merchantWhitelist";
import { AirdropVouchers } from "../components/airdropVouchers";
import { merchantHelper } from "../ether/merchant";
import { voucherHelper } from "../ether/voucher";
import { Layout } from "@lifesg/react-design-system";
import { CustomContainer } from "../components/common/common-styles";

export const AdminPage = (): JSX.Element => {
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
        <Layout.Container>
          <h1>Not Admin</h1>
        </Layout.Container>
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
