// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract MerchantsList is Ownable {
    struct Merchant {
        string name;
        bool onboarded;
    }
    mapping (address => Merchant) merchantMap;

    function onboardMerchant (address merchantAddress, string calldata name) public onlyOwner {
        merchantMap[merchantAddress] = Merchant(name, true);
    }

    function merchantExists (address _address) external view returns(bool) {
        return merchantMap[_address].onboarded;
    }
}
