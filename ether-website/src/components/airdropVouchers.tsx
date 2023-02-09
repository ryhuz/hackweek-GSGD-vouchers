import { Button } from "@lifesg/react-design-system/button";
import { Form } from "@lifesg/react-design-system/form";
import { useRef } from "react";
import { FormSection } from "./common/common-styles";

export const AirdropVouchers = ({ helper }) => {
  const setRecipientAddRef = useRef<HTMLInputElement>();
  const setMerchantAddRef = useRef<HTMLInputElement>();
  const setValueRef = useRef<HTMLInputElement>();

  const handleAirdrop = async (e) => {
    e.preventDefault();

    console.log(
      `[ airdropping ] to: ${setRecipientAddRef.current.value}, value: ${setValueRef.current.value}, merchant: ${setMerchantAddRef.current.value}`
    );

    if (setMerchantAddRef.current.value) {
      helper.mintVoucher(
        setRecipientAddRef.current.value,
        setValueRef.current.value,
        setMerchantAddRef.current.value
      );
    } else {
      helper.mintVoucher(
        setRecipientAddRef.current.value,
        setValueRef.current.value
      );
    }
    alert("success");
  };

  return (
    <>
      <FormSection>
        <h1>Airdrop Vouchers</h1>
        <form onSubmit={handleAirdrop}>
          <Form.Input
            label="Recipient address"
            placeholder="Enter here..."
            ref={setRecipientAddRef}
          />
          <Form.Input
            label="Voucher value"
            placeholder="Enter here..."
            ref={setValueRef}
          />
          <Form.Input
            label="Merchant address"
            placeholder="Enter here..."
            ref={setMerchantAddRef}
          />
          <Button.Default type="submit" value="submit">
            Air Drop
          </Button.Default>
        </form>
      </FormSection>
    </>
  );
};
