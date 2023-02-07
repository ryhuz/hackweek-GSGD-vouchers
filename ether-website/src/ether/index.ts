import { Contract, ethers, JsonRpcProvider, Wallet } from "ethers";

export class EtherHelper {
  private provider: JsonRpcProvider;

  constructor(blockChainUrl?: string) {
    //currently set to this
    blockChainUrl = "http://0.0.0.0:8545";
    this.provider = new ethers.JsonRpcProvider(blockChainUrl);
  }

  public getProvider() {
    if (this.provider) {
      return this.provider;
    }
    console.log("Provider not provided, please set a provider");
    return null;
  }

  public overrideProvider(blockChainUrl: string) {
    this.provider = new ethers.JsonRpcProvider(blockChainUrl);
  }

  public getWallet(address: string) {
    return new Wallet(address, this.provider);
  }

  public getSmartContract(address: string, abi: ethers.InterfaceAbi) {
    return new Contract(address, abi);
  }
}
