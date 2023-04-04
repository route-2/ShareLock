// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract mpc {
  mapping(address => bool) public isOwner;
  mapping(address => bool) public approved;
  mapping(address => bool) private hasApproved;
  mapping(address => uint256) private lastApprovedAt;
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
   function setApproval(address guardian) public {
     
       require(!hasApproved[guardian], "guardian already approved");
  require(block.timestamp >= lastApprovedAt[guardian] + 10 minutes, "guardian needs to wait before approving again");

  approved[guardian] = true;
  hasApproved[guardian] = true;
  lastApprovedAt[guardian] = block.timestamp;
  counter++;

    }
    function getApproval() public view returns (uint) {
        return counter;
    }
    function clearApproval() public {
      require(counter == 3, "Didn't get all approvals yet!" );
      counter = 0;
      // iterate through all guardians and clear their hasApproved mapping
    for (uint i = 0; i < owners.length; i++) {
      address guardian = owners[i];
      if (hasApproved[guardian] && block.timestamp >= lastApprovedAt[guardian] + 10 minutes) {
        hasApproved[guardian] = false;
      }
    }

    }
    


  function getOwners() public view returns (address[] memory) {
    return owners;
  }
   function clearOwners() public {
   

    for (uint i = 0; i < owners.length; i++) {
      address owner = owners[i];
      isOwner[owner] = false;

    }

    delete owners;
  }
}
