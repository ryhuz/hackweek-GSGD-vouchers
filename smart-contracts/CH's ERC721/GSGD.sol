// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";

contract GSGD is ERC20, ERC20Burnable, Ownable, AccessControl {

    constructor(address admin) ERC20("SGD Tokens", "GSGD") {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    // =========================================================================
    // Read
    // =========================================================================

    function decimals() pure public override returns(uint8) {
        return 6;   // Same as USDC
    }

    // =========================================================================
    // Write
    // =========================================================================

    function mint(address account, uint256 amount) public onlyOwner {
        // Permissions also guarded by _beforeTokenTransfer
        // Only the voucher smart contract may access this
        _mint(account, amount);
    }

    function redeemForCash(address account) external returns(uint256) {
        // Permissions also guarded by _beforeTokenTransfer
        // Both the admin and voucher smart contract may access this
        uint256 balance = balanceOf(account);
        _burn(account, balance);
        return balance;
    }

    // =========================================================================
    // Hooks
    // =========================================================================

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        require((hasRole(DEFAULT_ADMIN_ROLE, msg.sender) || msg.sender == owner()), "Only the admin or the voucher smart contract may make any transfers");
        super._beforeTokenTransfer(from, to, amount);
    }
}
