// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../merchantsList.sol";
import "../GSGD.sol";
import "../utils/enums.sol";

contract NFTVouchers is ERC721Enumerable {
    struct Vouchers {
        uint twos;
        uint fives;
        uint tens;
    }
    address public owner;

    // Keep track of how many voucher has been issued and also use the `count` as voucherID
    using Counters for Counters.Counter;
    Counters.Counter public count;
    uint public limit;

    // Mapping from voucherID to merchantAddress (so that the voucher can only be used at specific merchant)
    mapping(uint256 => address) public voucherMerchant;

    Vouchers[] public issuedVouchers;
    MerchantsList merchantsList;
    GSGD voucherVault;

    constructor (address GSDAddress, address merchantsListAddress, uint _limit) ERC721("NFT Voucher", "NFTV") {
        owner = msg.sender;
        voucherVault = GSGD(GSDAddress);
        merchantsList = MerchantsList(merchantsListAddress);
        limit = _limit;
    }

    /*****************************************************************************************************************************
                                                        MODIFIERS
    ******************************************************************************************************************************/

    modifier ownerOnly {
        require(owner == msg.sender, "NFT Voucher: Only owner can call this function!");
        _;
    }

    modifier whenStillAvailable {
        require(count.current() < limit, "StillAvailable: No more vouchers to issue");
        _;
    }

    modifier whenMerchantExists (address merchantAddress) {
        require(merchantsList.merchantExists(merchantAddress), "MerchantsList: Merchant does not exist");
        _;
    }

    modifier whenOwnerHasVouchers {
        uint256 balance = balanceOf(msg.sender);
        require(balance > 0, "NFT Voucher: You do not own any vouchers!");
        _;
    }

    modifier whenAmountIsValid(uint8 amount) {
        require(amount == 2 || amount == 5 || amount == 10, "NFT Voucher: Please enter a valid amount! (eg. 2 / 5 / 10)");
        _;
    }

    /*****************************************************************************************************************************
                                                        FUNCTIONS
    ******************************************************************************************************************************/

    function issueVoucher(address recipient, address merchantAddress) public ownerOnly whenStillAvailable whenMerchantExists(merchantAddress) {
        uint256 voucherID = count.current();
        _mint(recipient, voucherID);

        voucherMerchant[voucherID] = merchantAddress;
        issuedVouchers.push(Vouchers(5,5,5));
        count.increment();
    }

    function use2Voucher (address merchantAddress) public {
        _useVoucher(merchantAddress, 2);
    }

    function use5Voucher (address merchantAddress) public {
        _useVoucher(merchantAddress, 5);
    }

    function use10Voucher (address merchantAddress) public {
        _useVoucher(merchantAddress, 10);
    }

    function _useVoucher (address merchantAddress, uint8 amount) internal whenOwnerHasVouchers whenMerchantExists(merchantAddress) whenAmountIsValid(amount) {
        bool matchesMerchant = false;
        for(uint256 i = 0; i < balanceOf(msg.sender); i++) {
            uint256 voucherID = tokenOfOwnerByIndex(msg.sender, i);
            Vouchers memory ownedVoucher = issuedVouchers[voucherID];
            if (voucherMerchant[voucherID] == merchantAddress) {
                matchesMerchant = true;

                // solidity no switch :(
                if (amount == 2) {
                    require(ownedVoucher.twos > 0, "NFT Voucher: You do not have any $2 vouchers left!");
                    voucherVault.issueToMerchant(merchantAddress, Enums.Denominations.TWO);
                    ownedVoucher.twos--;
                } else if (amount == 5) {
                    require(ownedVoucher.fives > 0, "NFT Voucher: You do not have any $5vouchers left!");
                    voucherVault.issueToMerchant(merchantAddress, Enums.Denominations.FIVE);
                    ownedVoucher.fives--;
                } else if (amount == 10) {
                    require(ownedVoucher.tens > 0, "NFT Voucher: You do not have any $10 vouchers left!");
                    voucherVault.issueToMerchant(merchantAddress, Enums.Denominations.TEN);
                    ownedVoucher.tens--;
                }

                break;
            }
        }
        require(matchesMerchant, "NFT Voucher: You do not have any voucher that can be used for this merchant!");
    }
}