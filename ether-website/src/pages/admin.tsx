import React, { useEffect, useRef, useState } from "react";
import { MerchantHelper } from "../ether/merchant";
import { currUser } from "../keys";

export const AdminPage = (): JSX.Element => {
	const [isMerchantAdmin, setIsMerchantAdmin] = useState(true);
	const [merchantExists, setMerchantExists] = useState<boolean>();
	const [mh, setMh] = useState(null);

	const setMerchantRef = useRef<HTMLInputElement>();
	const checkMerchantRef = useRef<HTMLInputElement>();

	useEffect(() => {
		initMerchantHelper();
	}, []);

	useEffect(() => {
		if (mh) {
			checkIfAdmin();
		}
	}, [mh]);

	const initMerchantHelper = () => {
		setMh(new MerchantHelper(currUser));
	};

	const checkIfAdmin = async () => {
		const hasRole = await mh.hasRole(currUser);
		console.log("has default admin role", hasRole);
		setIsMerchantAdmin(hasRole);
	};

	const handleOnboardMerchant = async (e) => {
		e.preventDefault();

		console.log(`[ handleOnboardMerchant ]`, setMerchantRef.current.value);
		await mh.onboardMerchant(setMerchantRef.current.value, "test");
		console.log(`[ handleOnboardMerchant ] Done`);
	};

	const handleMerchantExists = async (e) => {
		e.preventDefault();

		console.log(`[ handleMerchantExists ]`, checkMerchantRef.current.value);
		const exists = await mh.merchantExists(checkMerchantRef.current.value);
		console.log(`[ handleMerchantExists ] Exists?  ${exists}`);
		setMerchantExists(exists);
	};

	return isMerchantAdmin ? (
		<React.Fragment>
			<h1>Onboard Merchant</h1>
			<form onSubmit={handleOnboardMerchant}>
				<label>
					New merchant address:
					<input
						type="text"
						ref={setMerchantRef}
						name="setMerchant"
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
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
				<h2>
					Does merchant exist? ({checkMerchantRef.current?.value})
				</h2>
				{merchantExists !== undefined && (
					<>{merchantExists ? "is onboarded" : "not onboarded"}</>
				)}
			</form>
		</React.Fragment>
	) : (
		<>Not Admin</>
	);
};
