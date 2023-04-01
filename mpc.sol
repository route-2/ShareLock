// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract mpc {
  mapping(address => bool) public isOwner;
  event Addowner(address[] indexed guardianWallet);

  address[] public owners;

  

  
  uint counter = 0;

  
  modifier onlyOwner() {
    require(isOwner[msg.sender], "not owner");
    _;
  }

  function ownerInput(address[] memory _owners) public {
    require(_owners.length > 0 && _owners.length <= 4, "owners required");

    for (uint i = 0; i < _owners.length; i++) {
      address owner = _owners[i];

      require(owner != address(0), "invalid owner");
      require(!isOwner[owner], "owner not unique");

      isOwner[owner] = true;
      owners.push(owner);
    }

    emit Addowner(_owners);
  }

  function getOwners() public view returns (address[] memory) {
    return owners;
  }
}
