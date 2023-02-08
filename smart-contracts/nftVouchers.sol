// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "./node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./merchantsList.sol";
import "./GSGD.sol";
import "./utils/counter.sol";
import "./utils/enums.sol";

contract NFTVouchers is ERC721, Ownable, Counter {
    struct Vouchers {
        uint twos;
        uint fives;
        uint tens;
    }
    mapping(address => Vouchers) public voucherBalances;
    GSGD voucherVault;
    MerchantsList merchantsList;

    constructor (uint _limit) ERC721("NFT Voucher", "NFTV") Counter(_limit) {
        voucherVault = new GSGD();
        merchantsList = new MerchantsList();
    }

    // =============================================================================
    // Merchant
    // =============================================================================
    modifier whenMerchantExists (address merchantAddress) {
        require(merchantsList.merchantExists(merchantAddress), "MerchantsList: Merchant does not exist");
        _;
    }

    function onboardMerchant (address merchantAddress, string calldata name) public onlyOwner {
        merchantsList.onboardMerchant(merchantAddress, name);
    }

    function merchantWithdrawTokens (address merchantAddress) public onlyOwner {
        voucherVault.withdrawToSGD(merchantAddress);
    }

    // =========================================================================
    // Issuance
    // =========================================================================
    // TODO: owneronly or get user to trigger?
    function issueVoucher() public whenStillAvailable {
        voucherBalances[msg.sender] = Vouchers(5,5,5);
        // voucherBalances[someaddress] = Vouchers(5,5,5);
        _increment();
    }

    // =============================================================================
    // Usage
    // =============================================================================
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
