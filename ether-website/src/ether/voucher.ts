import { Contract, ethers, Wallet } from "ethers";
import { EtherHelper } from ".";
import { currUser, _voucherContractAddress } from "../keys";
import { _abi } from "./abi/voucher";

class VoucherHelper {
	private wallet: Wallet;
	private etherHelper = new EtherHelper();

	// The ERC-20 Contract ABI, which is a common contract interface
	// for tokens (this is the Human-Readable ABI format)
	private abi = _abi;

	private sc: Contract;
	private signedSC: Contract;
	private voucherContractAddress = _voucherContractAddress;

	constructor(privateKey: string) {
		this.wallet = this.etherHelper.getWallet(privateKey);
		this.sc = this.etherHelper.getSmartContract(
			this.voucherContractAddress,
			this.abi
		);
	}

	public async mintVoucher(
		address: string,
		value: number,
		merchantAddress?: string
	) {
		console.log(
			`[mintVoucher] with params:  ${address} + ${value} + ${merchantAddress}`
		);
		// The provider also allows signing transactions to
		// send ether and pay to change state within the blockchain.
		// For this, we need the account signer...
		try {
			const signer = await this.etherHelper.getSigner();
			this.signedSC = new ethers.Contract(
				this.voucherContractAddress,
				this.abi,
				signer
			);
			const tx = merchantAddress
				? await this.signedSC["mintVoucher(address,uint256,address)"](
						address,
						value,
						merchantAddress
				  )
				: await this.signedSC["mintVoucher(address,uint256)"](
						address,
						value
				  );
			await tx.wait();
		} catch (error) {
			alert("error");
			console.log("[ Error ]", error);
		}
	}

	public async isOwner() {
		const address = await this.wallet.getAddress();
		console.log(`[check owner]`);
		return (await this.sc.owner()) === address;
	}
}

export const voucherHelper = new VoucherHelper(currUser);
