// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

abstract contract Counter {
    uint public count = 0;
    uint limit;

    constructor (uint _limit) {
        limit = _limit;
    }

   modifier whenStillAvailable {
        require(count < limit, "StillAvailable: No more vouchers to issue");
        _;
    }

    function _increment () internal virtual {
        count++;
    }
}