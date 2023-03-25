// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./PlonkVerifier.sol";

contract mpc {
  mapping(address => bool) public isOwner;
  event Addowner(address[] indexed guardianWallet);

  address[] public owners;

  PlonkVerifier public Verifier;

  constructor(address _verifier) {
    Verifier = PlonkVerifier(_verifier);
  }

  uint counter = 0;

  function checkVerifier(string[] memory input) public returns (bool) {
    counter++;
    if (counter == 3) {
      bool result = Verifier.verifyProof(input);
       return result;
      
    }
   
  }

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
