import { Contract, ethers, Wallet } from "ethers";
import { EtherHelper } from ".";

export class CustomerHelper {
  private wallet: Wallet;
  private etherHelper = new EtherHelper();

  private abi: string =
    '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"_requireMerchantExists","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"merchantAddress","type":"address"},{"internalType":"string","name":"name","type":"string"}],"name":"onboardMerchant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
  private sc: Contract;
  constructor(privateKey: string) {
    this.wallet = this.etherHelper.getWallet(privateKey);
    this.sc = this.etherHelper.getSmartContract(
      "0x331D7FA6902e74c9FAA5058A6F0735C8565100EB",
      this.abi
    );
  }

  public async getBalance() {
    try {
      const address = await this.wallet.getAddress();
      const etherBalance = await this.etherHelper
        .getProvider()
        .getBalance(address);
      return `${ethers.utils.formatEther(etherBalance)} ETH`;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async getAddress() {
    return await this.wallet.getAddress();
  }
}
