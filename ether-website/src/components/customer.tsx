import { useEffect, useState } from "react";
import { voucherHelper } from "../ether/voucher";

export interface CustomerProfile {
	walletAddress: string;
	ETHBalance: string;
	voucherBalance: string;
}

export const CustomerComponent = (): JSX.Element => {
	const [customer, setCustomer] = useState<CustomerProfile>(null);

	useEffect(() => {
		getCustomerProfile();
	}, []);

	const getCustomerProfile = async () => {
		//replace with your wallet pk
		const ch = voucherHelper;
		await ch.getAllVoucher();
		const customer: CustomerProfile = {
			walletAddress: await ch.getAddress(),
			ETHBalance: await ch.getBalance(),
			voucherBalance: "",
		};
		setCustomer(customer);
	};

	return (
		<div>
			{customer ? (
				<div>
					<h2>Customer Address: {customer.walletAddress}</h2>
					<h2>ETH Balance: {customer.ETHBalance}</h2>
					<h2>
						Voucher Balance: {customer.voucherBalance?.toString()}
					</h2>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};
