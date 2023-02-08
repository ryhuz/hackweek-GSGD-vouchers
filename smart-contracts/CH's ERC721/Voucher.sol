// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

import "./GSGD.sol";
import "./merchantsList.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Voucher is ERC721Enumerable, Ownable {

    struct VoucherMetadata{
      uint256 value;    // In integer dollars, need to change redeemForGSGD if your want fractional
      address merchant;
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

      // Initial distribution
      // mint(address(0xB35b89eE8AAc5C3ea6cd5C9080E8c66Cb17ca2CC), 2);
    }

    // =========================================================================
    // Read
    // =========================================================================

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

    // Value represented with GSGD decimal
    function mint(address account, uint256 value, address merchant) external onlyOwner returns (uint256) {
      _tokenIds.increment();

      uint256 newTokenId = _tokenIds.current();
      _safeMint(account, newTokenId);
      _voucherMetadata[newTokenId] = VoucherMetadata(value, merchant);

      return newTokenId;
    }

    function redeemForGSGD(uint256 tokenId) external returns (uint256) {
      // Permissions are guarded by the _beforeTokenTransfer hook
      uint256 gsgdValue = getVoucherValue(tokenId) * (10 ** gsgdContract.decimals());
      
      transferFrom(msg.sender, address(0), tokenId);
      gsgdContract.mint(msg.sender, gsgdValue);
      
      return gsgdValue;
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
        require(merchantsListContract.hasOnboarded(to), "May only be spent with an onboarded merchant"); 
        require(getVoucherMerchant(tokenId) == address(0) || to == getVoucherMerchant(tokenId), "May only be spent with an voucher specific merchant"); 
        require(!(merchantsListContract.hasOnboarded(from) && to != address(0)), "Merchants may not spend the voucher"); 
      }

      super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}