// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";

contract MerchantsList is Ownable, AccessControl {

    struct Merchant {
        string name;
        bool onboarded;
    }

    mapping (address => Merchant) merchantMap;

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    // =========================================================================
    // Read
    // =========================================================================

    function hasOnboarded(address merchantAddress) external view returns(bool) {
        return merchantMap[merchantAddress].onboarded;
    }

    // =========================================================================
    // Write
    // =========================================================================

    function onboard(address merchantAddress, string calldata name) external {
        require((hasRole(DEFAULT_ADMIN_ROLE, msg.sender) || msg.sender == owner()), "Only the admin or the voucher smart contract may make any changes");
        merchantMap[merchantAddress] = Merchant(name, true);
    }

    function offboard(address merchantAddress) external {
        require((hasRole(DEFAULT_ADMIN_ROLE, msg.sender) || msg.sender == owner()), "Only the admin or the voucher smart contract may make any changes");
        merchantMap[merchantAddress] = Merchant(merchantMap[merchantAddress].name, false);
    }
}
