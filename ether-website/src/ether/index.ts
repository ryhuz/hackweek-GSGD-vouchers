import { ethers, Wallet } from "ethers";

class EtherHelper {
  //ganache account privat key
  private privateKey = "";
  private blockChainUrl = "http://0.0.0.0:8545";

  private wallet: Wallet;

  constructor() {
    //TODO: take in pk form different accounts
    const provider = new ethers.JsonRpcProvider(this.blockChainUrl);
    this.wallet = new ethers.Wallet(this.privateKey, provider);
  }

  public getWalletAddress(): string {
    return this.wallet.address;
  }
}

export const etherHelper = new EtherHelper();
