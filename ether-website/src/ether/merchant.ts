import { Contract, ethers, Wallet } from "ethers";
import { EtherHelper } from ".";
import { DEFAULT_ADMIN_ROLE, _merchantListContractAddress } from "../keys";
import { _abi } from "./abi/merchantList";

export class MerchantHelper {
	private wallet: Wallet;
	private etherHelper = new EtherHelper();

	// The ERC-20 Contract ABI, which is a common contract interface
	// for tokens (this is the Human-Readable ABI format)
	private abi = _abi;

	private sc: Contract;
	private signedSC: Contract;
	private merchantListContractAddress = _merchantListContractAddress;

	constructor(privateKey: string) {
		this.wallet = this.etherHelper.getWallet(privateKey);
		this.sc = this.etherHelper.getSmartContract(
			this.merchantListContractAddress,
			this.abi
		);
	}

	public async onboardMerchant(address: string, name: string) {
		console.log(`[onboardMerchant] with params:  ${address} + ${name}`);
		// The provider also allows signing transactions to
		// send ether and pay to change state within the blockchain.
		// For this, we need the account signer...
		try {
			const signer = await this.etherHelper.getSigner();
			this.signedSC = new ethers.Contract(
				this.merchantListContractAddress,
				this.abi,
				signer
			);
			const tx = await this.signedSC.onboard(address, name);
			await tx.wait();
		} catch (error) {
			console.log("[ Error ]", error);
		}
	}

	public async merchantExists(address: string): Promise<string> {
		console.log(`[merchantExists] with params:  ${address}`);
		return await this.sc.hasOnboarded(address);
	}

	public async hasRole() {
		const address = await this.wallet.getAddress();
		console.log(
			`[check has admin role] with params:  ${DEFAULT_ADMIN_ROLE}, ${address}`
		);
		return await this.sc.hasRole(DEFAULT_ADMIN_ROLE, address);
	}
}
