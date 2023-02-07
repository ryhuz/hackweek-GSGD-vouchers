import { Contract, ethers, Wallet } from "ethers";
import { EtherHelper } from ".";

export class MerchantHelper {

  private wallet: Wallet;
  private etherHelper = new EtherHelper();

  // The ERC-20 Contract ABI, which is a common contract interface
  // for tokens (this is the Human-Readable ABI format)
  private abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "merchantExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "merchantAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        }
      ],
      "name": "onboardMerchant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  private sc: Contract;
  private signedSC: Contract;
  private merchantListContractAddress =  "FIXME" //TODO:

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
      this.signedSC = new ethers.Contract(this.merchantListContractAddress, this.abi, signer);
      const tx = await this.signedSC.onboardMerchant(address, name);
      await tx.wait();
    } catch (error){
      console.log('[ Error ]', error);
    }
  }

  public async merchantExists(address: string): Promise<string> {
    console.log(`[merchantExists] with params:  ${address}`);
    return await this.sc.merchantExists(address);
  }
}
