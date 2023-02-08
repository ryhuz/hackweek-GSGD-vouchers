import { Contract, ethers, Wallet } from "ethers";
import { EtherHelper } from ".";

export class CustomerHelper {
  private wallet: Wallet;
  private etherHelper = new EtherHelper();

  private abi =
  [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "GSDAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "merchantsListAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_limit",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "issueVoucher",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "merchantAddress",
          "type": "address"
        }
      ],
      "name": "use10Voucher",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "merchantAddress",
          "type": "address"
        }
      ],
      "name": "use2Voucher",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "merchantAddress",
          "type": "address"
        }
      ],
      "name": "use5Voucher",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voucherBalances",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "twos",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "fives",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "tens",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  private sc: Contract;
  constructor(privateKey: string) {
    this.wallet = this.etherHelper.getWallet(privateKey);
    this.sc = this.etherHelper.getSmartContract(
      "0x331D7FA6902e74c9FAA5058A6F0735C8565100EB",
      this.abi
    );
  }

  public async voucherBalances() {
    try {
      const address = await this.wallet.getAddress();
      const vouchers = await this.sc.voucherBalances(address);
      vouchers.map( voucher => {
        const num = ethers.utils.formatUnits(voucher);
        console.log('num', num);
      })
      ethers.utils.formatEther(vouchers[0])
      return vouchers;
    } catch (error) {
      console.log(error);
      return null;
    }
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
