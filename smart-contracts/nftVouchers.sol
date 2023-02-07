// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "./merchantsList.sol";
import "./GSGD.sol";
import "./utils/counter.sol";
import "./utils/enums.sol";

contract NdpVouchers is Counter {
    struct Vouchers {
        uint twos;
        uint fives;
        uint tens;
    }
    mapping(address => Vouchers) public voucherBalances;
    GSGD voucherVault;
    MerchantsList merchantsList;

    constructor (address GSDAddress, address merchantsListAddress, uint _limit) Counter(_limit) {
        voucherVault = GSGD(GSDAddress);
        merchantsList = MerchantsList(merchantsListAddress);
    }

    modifier whenMerchantExists (address merchantAddress) {
        require(merchantsList.merchantExists(merchantAddress), "MerchantsList: Merchant does not exist");
        _;
    }

    // TODO: owneronly or get user to trigger?
    function issueVoucher() public whenStillAvailable {
        voucherBalances[msg.sender] = Vouchers(5,5,5);
        // voucherBalances[someaddress] = Vouchers(5,5,5);
        _increment();
    }

    function use2Voucher (address merchantAddress) public whenMerchantExists(merchantAddress) {
        require(voucherBalances[msg.sender].twos > 0);

        voucherVault.issueToMerchant(merchantAddress, Enums.Denominations.TWO);
        voucherBalances[msg.sender].twos--;
    }

    function use5Voucher (address merchantAddress) public whenMerchantExists(merchantAddress) {
        require(voucherBalances[msg.sender].fives > 0);

        voucherVault.issueToMerchant(merchantAddress, Enums.Denominations.FIVE);
        voucherBalances[msg.sender].fives--;
    }

    function use10Voucher (address merchantAddress) public whenMerchantExists(merchantAddress) {
        require(voucherBalances[msg.sender].tens > 0);
    
        voucherVault.issueToMerchant(merchantAddress, Enums.Denominations.TEN);
        voucherBalances[msg.sender].tens--;
    }
}