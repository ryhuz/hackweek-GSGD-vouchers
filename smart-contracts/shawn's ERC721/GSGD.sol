// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "../utils/enums.sol";

contract GSGD is ERC20, ERC20Burnable, Ownable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    uint totalRedeemed = 0;
    mapping (Enums.Denominations => uint) valueMap;
    constructor() ERC20("SGD Tokens", "GSGD") {
        valueMap[Enums.Denominations.TWO] = 2;
        valueMap[Enums.Denominations.FIVE] = 5;
        valueMap[Enums.Denominations.TEN] = 10;
    }

    function decimals() pure public override returns(uint8) {
        return 0;
    }

    function issueToMerchant(address merchantAddress, Enums.Denominations amount) external onlyOwner {
        _mint(merchantAddress, valueMap[amount]);
    }

    /* can only withdraw full amount */
    function withdrawToSGD(address merchantAddress) public onlyOwner {
        uint toBurn = balanceOf(merchantAddress);
        totalRedeemed += toBurn;
        _burn(merchantAddress, toBurn);
    }
}
