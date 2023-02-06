# NDP Vouchers Smart Contracts

## Avaiable contracts

-   MerchantsList
-   GSGD
-   NdpVouchers
    -   requires the following parameters:
        -   address of deployed GSGD contract
        -   address of deployed MerchantsList contract
        -   uint limit of NFTs to be disbursed

## Intended Flow

1. Airdrop
    - User list will be retrieved from NDI (\*)
    - Users will be issued with NdpVouchers NFT
        - each NFT will have 5x$2, 5x$5, and 5x$10
2. Usage
    - Check performed to see if merchant is whitelisted
    - When using vouchers, voucher count will be decremented
    - Merchant will be issued with GSGD with the corresponding amount _(1xGSGD = SGD$1)_
3. Merchant Redemption
    - Merchant will exchange GSD to cash from authorised outlets (\*)
    - Merchant's full amount of GSGD will be burnt

## Start local Ganache network
- npm run ganache
- on remix, set environment to Ganache provider on port 8545
- ganache will start listening to events
