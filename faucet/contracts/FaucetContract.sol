// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";

contract Faucet is Owned, Logger, IFaucet {

    // Variables
    uint public numOfFunders;
    
    mapping(address => bool) private funders;
    mapping(uint => address) private lutFunders;

    modifier limitWithdraw(uint withdrawAmount)
    {
        require(
            withdrawAmount <= 100000000000000000,
            "Cannot withdraw more than 0.1 ether"
            );
        _;
    }

    // this is a special function
    // it's called when you make a tx that doesnt specify 
    // function name to call

    // External function are part of the contract interface
    // which means they can be called via contracts and other trx
    
    receive() external payable{}

    function emitLog() public override pure returns(bytes32){
        return "Hello World";
    }

    function addFunds() override external payable
    {
        address funder = msg.sender;

        if(!funders[funder]){
            uint index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }
    function withdraw(uint withdrawAmount) override external payable limitWithdraw(withdrawAmount)
    {
        payable(msg.sender).transfer(withdrawAmount);
    }


    function test1() external onlyOwner
    {
        // some managing stuff that only admin should have access to
    }

    function test2() external onlyOwner
    {
        // some managing stuff that only admin should have access to
    }

    function getAllFunders() public view returns (address[] memory)
    {
        address[] memory _funders = new address[](numOfFunders);

        for(uint i=0; i< numOfFunders; i++)
        {
            _funders[i] = lutFunders[i];
        }
        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns(address) 
    {
        return lutFunders[index];
    }
}

//----------- Helper -------------------
// pure, view - read-only call, no gas free 
// view - it indicates that the function will not be able to alter the storage state in any way
// pure - even more strict, indicating that it won't even read the storage state

// external, public - can be called from outside the smart contract
// external - cannot be called from other functions inside the smart contract
// public - can be called by other functions inside the smart contract

// private, internal - cannot be called from outside the smart contract
// private - can be accessible only within the smart contract
// internal - can be accessible within the smart contract and also derived smart contract (contract that extend)

// Transactions ( can generate state changes) and requires gas fees
// read-only call, no gas free 

// to talk to the node on the network you can make JSON-RPC http calls

// const instance = await Faucet.deployed()