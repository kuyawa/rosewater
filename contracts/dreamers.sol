// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// DREAMERS v1.0
contract Dreamers {

//- LOGS

  event logInit(address indexed self, address indexed admin, address indexed owner, uint date);
  event logDonate(address indexed donor, uint amount, uint date);

//- VARS

  address internal admin;
  address payable internal owner;
  address payable internal treasury;
  uint    internal uri;
  uint    internal funds = 0;
  uint8   internal fees  = 2;

//- MODS

  bool private mutex; // reentry check

  modifier isAdmin() {
    require(msg.sender==admin, 'ERR_UNAUTHORIZED');
    _;
  }

  modifier isOwner() {
    require(msg.sender==owner, 'ERR_UNAUTHORIZED');
    _;
  }

  modifier lock() {
    require(!mutex, "ERR_INVALIDREENTRYLOCK");
    mutex = true;
    _;
    mutex = false;
  }

  modifier vlock() {
    require(!mutex, "ERR_INVALIDREENTRYVIEW");
    _;
  }

//- MAIN

  constructor(address payable _owner, uint _uri) {
    admin = msg.sender;
    treasury = payable(msg.sender);
    owner = _owner;
    uri = _uri;
    emit logInit(address(this), admin, owner, block.timestamp);
  }

  receive() external payable {
    require(msg.value>0, 'ERR_INVALIDAMOUNT');
    uint amount = msg.value;
    uint diff = amount;
    address donor = msg.sender;
    funds += amount;
    if(fees>0){
      uint split = amount * fees / 100;
      if(split>0){
        treasury.transfer(split);
        diff = amount - split;
      }
    }
    if(diff>0){
      owner.transfer(diff);
    }
    emit logDonate(donor, amount, block.timestamp);
  }

//- VIEWS

  function getAdmin() public view returns (address) {
    return admin;
  }

  function getBalance() public view returns (uint) {
    address self = address(this);
    return self.balance;
  }

  function getFees() public view returns (uint8) {
    return fees;
  }

  function getMetadata() public view returns (uint) {
    return uri;
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function getTreasury() public view returns (address) {
    return treasury;
  }

  function totalFunds() public view returns (uint) {
    return funds;
  }

//- ADMIN

  function setAdmin(address any) public lock isAdmin {
    admin = any;
  }

  function setOwner(address payable any) public lock isAdmin {
    owner = any;
  }

  function setTreasury(address payable any) public lock isAdmin {
    treasury = any;
  }

  function setMetadata(uint any) public lock isAdmin {
    uri = any;
  }

  function setFees(uint8 any) public lock isAdmin {
    fees = any;
  }

  function gulp() public lock isAdmin {
    address self = address(this);
    if(self.balance > 0) {
      treasury.transfer(self.balance);
    }
  }

}