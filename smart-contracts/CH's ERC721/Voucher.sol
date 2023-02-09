// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "./GSGD.sol";
import "./MerchantsList.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Voucher is ERC721Enumerable, Ownable {

    struct VoucherMetadata{
      uint256 value;    // Same decimal as GSGD
      address merchant; // Optional
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    GSGD gsgdContract;
    MerchantsList merchantsListContract;

    // tokenID -> metadata
    mapping (uint256 => VoucherMetadata) _voucherMetadata;

    constructor() ERC721("Voucher", "VCH") {
      gsgdContract = new GSGD(msg.sender);
      merchantsListContract = new MerchantsList(msg.sender);
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

    // Value represented with GSGD decimal
    function getVoucherValue(uint256 tokenId) public view returns (uint256) {
      return _voucherMetadata[tokenId].value;
    }

    function getVoucherMerchant(uint256 tokenId) public view returns (address) {
      return _voucherMetadata[tokenId].merchant;
    }

    // ===========================================================================
    // Write
    // ===========================================================================

    function mintVoucher(address account, uint256 value) external returns (uint256) {
      return _mintVoucher(account, value, address(0));
    }
    function mintVoucher(address account, uint256 value, address merchant) external returns (uint256) {
      return _mintVoucher(account, value, merchant);
    }

    function spendVoucher(uint256 tokenId) external  {
      address voucherMerchant = getVoucherMerchant(tokenId);
      require(voucherMerchant != address(0), "Must have a target merchant");
      _spendVoucher(tokenId, voucherMerchant);
    }

    function spendVoucher(uint256 tokenId, address merchant) external  {
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

    // Value represented with GSGD decimal
    function _mintVoucher(address account, uint256 value, address merchant) internal onlyOwner returns (uint256) {
      _tokenIds.increment();

      uint256 newTokenId = _tokenIds.current();
      _mint(account, newTokenId);
      _voucherMetadata[newTokenId] = VoucherMetadata(value, merchant);

      return newTokenId;
    }

    function _spendVoucher(uint256 tokenId, address merchant) internal  {
      require(msg.sender == ownerOf(tokenId), "Only the voucher owner may redeem it");
      require(merchantsListContract.hasOnboarded(merchant), "May only be spent with an onboarded merchant"); 
      require(getVoucherMerchant(tokenId) == address(0) || merchant == getVoucherMerchant(tokenId), "May only be spent with an voucher specific merchant"); 

      uint256 gsgdValue = getVoucherValue(tokenId);
      _burn(tokenId);
      gsgdContract.mint(merchant, gsgdValue);
    }
}