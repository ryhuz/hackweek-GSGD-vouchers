import { ethers, Wallet } from "ethers";

class EtherHelper {
  //ganache account privat key
  private privateKey =
    "0xb2cd0b01727fa85ac21360bd578ead13d5f5eebd88d6aa2bb80931eaeabd73e3";
  private blockChainUrl = "http://0.0.0.0:8545";

  private wallet: Wallet;

  constructor() {
    const provider = new ethers.JsonRpcProvider(this.blockChainUrl);
    this.wallet = new ethers.Wallet(this.privateKey, provider);
  }

  public getWalletAddress(): string {
    return this.wallet.address;
  }
}

export const etherHelper = new EtherHelper();
