import { Contract, ContractInterface, ethers, Wallet, Signer } from "ethers";
import { _blockChainUrl } from "../keys";

export class EtherHelper {
	private provider: ethers.providers.JsonRpcProvider =
		new ethers.providers.JsonRpcProvider(_blockChainUrl);

	public getProvider() {
		if (this.provider) {
			return this.provider;
		}
		console.log("Provider not provided, please set a provider");
		return null;
	}

	public overrideProvider(blockChainUrl: string) {
		this.provider = new ethers.providers.JsonRpcProvider(blockChainUrl);
	}

	public getWallet(privateKey: string) {
		return new Wallet(privateKey, this.provider);
	}

	public getSmartContract(
		address: string,
		abi: ContractInterface,
		signer?: Signer
	) {
		if (signer) {
			return new Contract(address, abi, signer);
		}
		return new Contract(address, abi, this.provider);
	}

	public getProviderConnection() {
		return this.provider.connection;
	}

	public async getSigner(address?: string) {
		return await this.provider.getSigner(address);
	}
}
