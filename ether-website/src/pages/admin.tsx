import React, { useEffect, useRef, useState } from "react";
import { MerchantWhitelist } from "../components/merchantWhitelist";
import { MerchantHelper } from "../ether/merchant";
import { currUser } from "../keys";

export const AdminPage = (): JSX.Element => {
	const [isMerchantAdmin, setIsMerchantAdmin] = useState(true);
	const [mh, setMh] = useState(null);

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

	return isMerchantAdmin ? (
		<>
			<MerchantWhitelist helper={mh} />
		</>
	) : (
		<>Not Admin</>
	);
};
