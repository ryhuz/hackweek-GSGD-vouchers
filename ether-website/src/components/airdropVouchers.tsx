import { useRef } from "react";

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
			<h1>Airdrop Vouchers</h1>
			<form onSubmit={handleAirdrop}>
				<label>
					Recipient address: <br />
					<input
						type="text"
						ref={setRecipientAddRef}
						name="setRecipientAdd"
					/>
				</label>
				<br />
				<label>
					Voucher value: <br />
					<input
						type="text"
						ref={setValueRef}
						name="setVoucherValue"
					/>
				</label>
				<br />
				<label>
					Merchant address (optional): <br />
					<input
						type="text"
						ref={setMerchantAddRef}
						name="setMerchantAdd"
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
		</>
	);
};
