// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "./node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "./node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./utils/enums.sol";

contract GSGD is ERC20, ERC20Burnable, Ownable, Enums {
    uint totalRedeemed = 0;
    mapping (Denominations => uint) valueMap;
    constructor() ERC20("GSGD", "GSGD") {
        valueMap[Denominations.TWO] = 2;
        valueMap[Denominations.FIVE] = 5;
        valueMap[Denominations.TEN] = 10;
    }

    function decimals() pure public override returns(uint8) {
        return 0;
    }

    function issueToMerchant(address merchantAddress, Denominations amount) public onlyOwner {
        _mint(merchantAddress, valueMap[amount]);
    }

    /* can only withdraw full amount */
    function withdrawToSGD(address merchantAddress) public onlyOwner {
        uint toBurn = balanceOf(merchantAddress);
        totalRedeemed += toBurn;
        _burn(merchantAddress, toBurn);
    }
}

/* 
0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 4

0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 152

0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
*/