import React, { useEffect, useRef, useState } from "react";
// import { MerchantHelper } from "../ether/merchant";
// import { currUser } from "../keys";

export const MerchantWhitelist = ({ helper }) => {
	const setMerchantAddRef = useRef<HTMLInputElement>();
	const setMerchantNameRef = useRef<HTMLInputElement>();
	const checkMerchantRef = useRef<HTMLInputElement>();

	const [merchantExists, setMerchantExists] = useState<{
		isOnboarded: boolean;
		merchantName: string;
	}>();

	const handleOnboardMerchant = async (e) => {
		e.preventDefault();

		console.log(
			`[ handleOnboardMerchant ]`,
			setMerchantAddRef.current.value
		);
		await helper.onboardMerchant(
			setMerchantAddRef.current.value,
			setMerchantNameRef.current.value
		);
		console.log(`[ handleOnboardMerchant ] Done`);
	};

	const handleMerchantExists = async (e) => {
		e.preventDefault();

		console.log(`[ handleMerchantExists ]`, checkMerchantRef.current.value);
		const exists = await helper.merchantExists(
			checkMerchantRef.current.value
		);
		console.log(`[ handleMerchantExists ] Exists?`, exists);
		setMerchantExists(exists);
	};

	return (
		<>
			<h1>Onboard Merchant</h1>
			<form onSubmit={handleOnboardMerchant}>
				<label>
					New merchant address: <br />
					<input
						type="text"
						ref={setMerchantAddRef}
						name="setMerchantAdd"
					/>
				</label>
				<br />
				<label>
					merchant name: <br />
					<input
						type="text"
						ref={setMerchantNameRef}
						name="setMerchantName"
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
			<p />
			<form onSubmit={handleMerchantExists}>
				<label>
					Check merchant address:
					<input
						type="text"
						ref={checkMerchantRef}
						name="checkMerchant"
					/>
					<input type="submit" value="Check" />
				</label>
				<h2>Does merchant exist?</h2>
				{merchantExists !== undefined && (
					<>
						{merchantExists.isOnboarded ? (
							<>
								is onboarded:
								<br />
								<b>address</b> -{" "}
								{checkMerchantRef.current?.value}
								<br />
								<b>name</b> - {merchantExists.merchantName}
							</>
						) : (
							"not onboarded"
						)}
					</>
				)}
			</form>
		</>
	);
};
