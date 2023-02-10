// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "./GSGD.sol";
import "./MerchantsList.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Voucher is ERC721Enumerable, Ownable {

    struct VoucherMetadata {
      uint256 value;    // Value represented in GSGD decimals
      address merchantAddress; // Optional whitelisted merchant
    }

    struct VoucherInfo {
      uint256 tokenId;
      uint256 value;            // Value represented in GSGD decimals
      address merchantAddress;  // Optional whitelisted merchant
      string merchantName;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint limit;

    GSGD gsgdContract;
    MerchantsList merchantsListContract;

    // tokenID -> metadata
    mapping (uint256 => VoucherMetadata) _voucherMetadata;

    constructor(uint _limit) ERC721("Voucher", "VCH") {
      gsgdContract = new GSGD(msg.sender);
      merchantsListContract = new MerchantsList(msg.sender);
      limit = _limit;
    }

    // =========================================================================
    // Read
    // =========================================================================

    function getGSGDContractAddress() public view returns (address) {
      return address(gsgdContract);
    }

    function getMerchantsListAddress() public view returns (address) {
      return address(merchantsListContract);
    }

    // Value represented in GSGD decimals
    function getVoucherValue(uint256 tokenId) public view returns (uint256) {
      return _voucherMetadata[tokenId].value;
    }

    function getVoucherMerchantAddress(uint256 tokenId) public view returns (address) {
      return _voucherMetadata[tokenId].merchantAddress;
    }

    function getAllVouchers() external view returns (VoucherInfo[] memory) {
      uint256 balance = balanceOf(msg.sender);
      VoucherInfo[] memory ownedVouchers = new VoucherInfo[](balance);

      for(uint256 i = 0; i < balance; i++) {
        uint256 tokenId = tokenOfOwnerByIndex(msg.sender, i);
        VoucherMetadata memory merchantMetadata = _voucherMetadata[tokenId];
        string memory merchantName = merchantsListContract.getMerchantName(merchantMetadata.merchantAddress);
        ownedVouchers[i] = VoucherInfo(tokenId, merchantMetadata.value, merchantMetadata.merchantAddress, merchantName);
      }
      
      return ownedVouchers;
    }

    // ===========================================================================
    // Write
    // ===========================================================================

    function mintVoucher(address account, uint256 value) external returns (uint256) {
      // Only the contract owner may access this
      return _mintVoucher(account, value, address(0));
    }
    function mintVoucher(address account, uint256 value, address merchant) external returns (uint256) {
      // Only the contract owner may access this
      return _mintVoucher(account, value, merchant);
    }

    function spendVoucher(uint256 tokenId) external  {
      // Only the voucher owner may access this
      address merchantAddress = getVoucherMerchantAddress(tokenId);
      require(merchantAddress != address(0), "Must have a target merchant");
      _spendVoucher(tokenId, merchantAddress);
    }

    function spendVoucher(uint256 tokenId, address merchant) external  {
      // Only the voucher owner may access this
      _spendVoucher(tokenId, merchant);
    }

    // =========================================================================
    // Hooks
    // =========================================================================
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
      if (msg.sender != owner()) {
        require(to == address(0), "Users may only burn the voucher");
      }

      super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // =========================================================================
    // Internal
    // =========================================================================

    function _mintVoucher(address account, uint256 value, address merchant) internal onlyOwner returns (uint256) {
      require(_tokenIds.current() < limit, "Voucher limit reached");
      _tokenIds.increment();

      uint256 newTokenId = _tokenIds.current();
      _mint(account, newTokenId);
      _voucherMetadata[newTokenId] = VoucherMetadata(value, merchant);

      return newTokenId;
    }

    function _spendVoucher(uint256 tokenId, address merchant) internal  {
      // Permissions also guarded by _beforeTokenTransfer
      require(msg.sender == ownerOf(tokenId), "Only the voucher owner may redeem it");
      require(merchantsListContract.hasOnboarded(merchant), "May only be spent with an onboarded merchant"); 

      address whiteListedMerchant = getVoucherMerchantAddress(tokenId);
      require(whiteListedMerchant == address(0) || merchant == whiteListedMerchant, "May only be spent with an voucher specific merchant"); 

      uint256 gsgdValue = getVoucherValue(tokenId);
      _burn(tokenId);
      gsgdContract.mint(merchant, gsgdValue);
    }
}