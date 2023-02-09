import { Contract, ethers, Wallet } from "ethers";
import { EtherHelper } from ".";
import { _voucherContractAddress } from "../keys";
import { _abi } from "./abi/voucher";

export class CustomerHelper {
  private wallet: Wallet;
  private etherHelper = new EtherHelper();

  private sc: Contract;
  constructor(privateKey: string) {
    this.wallet = this.etherHelper.getWallet(privateKey);
    this.sc = this.etherHelper.getSmartContract(_voucherContractAddress, _abi);
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

  public async getAllVoucher() {
    console.log("Getting all voucher ==========");
    const address = await this.wallet.getAddress();
    const result = await this.sc.getAllVouchersMetadata(address);

    const ids = await this.sc.getAllVouchersID(address);
    console.log("METADATA", result);
    console.log("IDS", ids);
    //this.sc['getVoucherMerchant()'](tokenId);
  }
}
