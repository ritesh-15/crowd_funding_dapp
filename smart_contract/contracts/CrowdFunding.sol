// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Campaign.sol";

contract CrowdFunding {
    address[] campagins;

    event campaignCreated(
        uint256 target,
        uint256 startAt,
        uint256 endAt,
        string dataURI,
        address campaign
    );

    function createCampaign(
        uint256 target,
        uint256 startAt,
        uint256 endAt,
        string memory dataURI
    ) public {
        require(endAt > startAt, "endAt should be greater than start at!");

        address newCampgain = address(
            new Campaign(target, startAt, endAt, dataURI, msg.sender)
        );

        campagins.push(newCampgain);

        emit campaignCreated(target, startAt, endAt, dataURI, newCampgain);
    }

    function getCampaigns() public view returns (address[] memory) {
        return campagins;
    }
}
