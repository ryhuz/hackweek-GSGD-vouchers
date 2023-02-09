import { Contract, ContractInterface, ethers, Wallet, Signer } from "ethers";

export class EtherHelper {
  private provider: ethers.providers.JsonRpcProvider;

  constructor(blockChainUrl?: string) {
    //currently set to this
    blockChainUrl = "http://0.0.0.0:8545";
    this.provider = new ethers.providers.JsonRpcProvider(blockChainUrl);
  }

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
