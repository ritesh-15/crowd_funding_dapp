// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Campaign is Ownable {
    using Counters for Counters.Counter;

    // *********** Struct *************

    struct Request {
        string dataURI;
        address payable recipient;
        uint256 value;
        bool isCompleted;
        uint256 noOfVoters;
        mapping(address => bool) voters;
    }

    struct Contributor {
        address contributor;
        uint256 amount;
    }

    // ************** State Variables ************

    address public manager;
    uint256 startAt;
    uint256 endAt;
    uint256 target;
    uint256 raisedAmount;
    string dataURI;

    Counters.Counter noOfContributors;
    uint256 public minContribution = 0.002 ether;

    mapping(address => uint256) addressToAmount;
    address[] contributors;

    mapping(uint256 => Request) requests;
    Counters.Counter requestCount;

    constructor(
        uint256 _target,
        uint256 _startAt,
        uint256 _endAt,
        string memory _dataURI,
        address _manager
    ) {
        target = _target;
        startAt = _startAt;
        endAt = _endAt;
        manager = _manager;
        dataURI = _dataURI;
    }

    // *********** Modifiers **************

    modifier onlyManager() {
        require(msg.sender == manager, "You are not manager of this campaign!");
        _;
    }

    modifier hasDeadlinePassed() {
        require(endAt >= block.timestamp, "Deadline has passed!");
        _;
    }

    modifier hasDeadlineNotPassed() {
        require(endAt < block.timestamp, "Deadline has not passed!");
        _;
    }

    // *********** Events *****************

    event funded(address funder, uint256 amount, uint256 timestamp);

    event reFunded(address funder, uint256 amount, uint256 timestamp);

    event requested(
        bool isCompleted,
        uint256 value,
        address recipient,
        uint256 noOfVoters,
        uint256 index,
        string dataURI
    );

    event finalized(
        bool isCompleted,
        uint256 value,
        address recipient,
        uint256 noOfVoters
    );

    event voted(address voter, uint256 noOfVotes, uint256 timestamp);

    // ************ Functions *************

    /*
        @desc: Set the minimum contribution to be done default is 0.002 ether
     */
    function setMinContribution(uint256 _minContribution) public {
        require(
            _minContribution > 0 ether,
            "Min contribution must be greater than 0 ether!"
        );
        minContribution = _minContribution;
    }

    /*
        @desc: Check if contributor is already funded or not
        ! Can be optimized
     */
    function hasAlreadyContributed(address addr) private view returns (bool) {
        address[] memory temp = contributors;

        for (uint256 i = 0; i < temp.length; i++) {
            if (temp[i] == addr) return true;
        }

        return false;
    }

    /*
     * @desc: Fund the campaign
     */
    function fund() public payable hasDeadlinePassed {
        require(
            msg.value >= minContribution,
            "Must have value greater than or equal to minimum contribution!!"
        );

        if (!hasAlreadyContributed(msg.sender)) {
            contributors.push(msg.sender);
            noOfContributors.increment();
        }

        addressToAmount[msg.sender] += msg.value;
        raisedAmount += msg.value;

        emit funded(msg.sender, msg.value, block.timestamp);
    }

    /*
     * @desc: Get the current balance in contract
     */
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /*
        @desc: Refund the contributor if deadline is passed and target not reached
     */
    function refund() public hasDeadlineNotPassed {
        require(raisedAmount < target, "Raised amount has reached to target!");

        uint256 amount = addressToAmount[msg.sender];
        require(amount != 0, "You have not funded any amount!!");

        address payable user = payable(msg.sender);
        (bool sent, ) = user.call{value: amount}("");

        require(sent, "Failed to refund!");

        addressToAmount[msg.sender] = 0;

        raisedAmount -= amount;

        emit reFunded(msg.sender, amount, block.timestamp);
    }

    /*
        @desc: Create request for using the funds
     */
    function createRequest(
        address payable _recipient,
        uint256 _value,
        string memory _dataURI
    ) public payable onlyManager {
        uint256 index = requestCount.current();
        requestCount.increment();

        Request storage newRequest = requests[index];

        newRequest.recipient = _recipient;
        newRequest.value = _value;
        newRequest.isCompleted = false;
        newRequest.noOfVoters = 0;
        newRequest.dataURI = _dataURI;

        emit requested(false, _value, _recipient, 0, index, _dataURI);
    }

    /*
        @desc: Contributors can vote on the request
     */
    function vote(uint256 requestNo) public {
        require(
            requestNo < requestCount.current(),
            "Request number is not valid!!"
        );

        require(
            addressToAmount[msg.sender] > 0,
            "You are not contributor please contribute first!"
        );

        Request storage request = requests[requestNo];

        require(
            request.voters[msg.sender] == false,
            "You have already voted!!"
        );

        request.voters[msg.sender] = true;
        request.noOfVoters++;

        emit voted(msg.sender, request.noOfVoters, block.timestamp);
    }

    /*
        @desc: After voting completed then manager can use the fund
     */
    function finalizeRequest(uint256 requestNo) public onlyManager {
        require(
            raisedAmount >= target,
            "Target amount has not been reached yet!"
        );

        require(
            requestNo < requestCount.current(),
            "Request number is not valid!!"
        );

        Request storage request = requests[requestNo];

        uint256 amount = request.value;
        address payable recipient = request.recipient;
        uint256 noOfVoters = request.noOfVoters;

        require(request.isCompleted == false, "Request is already completed!");

        require(
            noOfVoters >= noOfContributors.current() / 2,
            "Majority votes has not been reached!"
        );

        (bool sent, ) = recipient.call{value: raisedAmount}("");

        require(sent, "Failed to transfer ether!!");

        request.isCompleted = true;

        emit finalized(true, amount, recipient, noOfVoters);
    }

    /*
        @desc: Get all the contributors
     */
    function getAllContributors() public view returns (Contributor[] memory) {
        Contributor[] memory temp = new Contributor[](
            noOfContributors.current()
        );

        address[] memory tempCotributors = contributors;

        for (uint256 i = 0; i < tempCotributors.length; i++) {
            address current = tempCotributors[i];
            uint256 amount = addressToAmount[current];
            temp[i] = Contributor(current, amount);
        }

        return temp;
    }

    /*
        @desc: Get the info about the campaign
     */
    function getInfo()
        public
        view
        returns (
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            string memory,
            uint256,
            uint256
        )
    {
        return (
            manager,
            startAt,
            endAt,
            target,
            raisedAmount,
            dataURI,
            noOfContributors.current(),
            minContribution
        );
    }

    /*
        @desc: Check if approver
     */
    function isAproover(address _contributor, uint256 index)
        public
        view
        returns (bool)
    {
        require(
            addressToAmount[_contributor] > 0,
            "You must need to be contributor or you contribution must be greater than 0 ether"
        );

        require(index < requestCount.current(), "Invalid request number!");

        Request storage request = requests[index];

        return request.voters[_contributor];
    }

    /*
        @desc: Check if contributor
     */
    function isContributor(address _contributor) public view returns (bool) {
        require(
            addressToAmount[_contributor] > 0,
            "Your contribution must be greater than 0 ether"
        );

        return addressToAmount[_contributor] > 0;
    }
}
