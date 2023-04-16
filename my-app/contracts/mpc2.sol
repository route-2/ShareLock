// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract mpc {
    mapping(address => bool) public isOwner;
    mapping(address => bool) public approved;
    mapping(address => mapping(address => bool)) private hasApproved;

    mapping(address => uint256) private lastApprovedAt;
    mapping(address => address[]) public ownerToGuardians;
    event Addowner(address[] indexed guardianWallet);

    address[] public owners;

    uint256 counter = 0;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    function ownerInput(address[] memory _owners) public {
        require(_owners.length > 0 && _owners.length <= 4, "owners required");
        ownerToGuardians[msg.sender] = _owners;
        owners = _owners;
        emit Addowner(_owners);
    }

    function setApproval(address owner, address guardian) public {
        // check if the given guardian is mapped to the caller
        require(
            ownerToGuardians[owner][0] == guardian ||
                ownerToGuardians[owner][1] == guardian ||
                ownerToGuardians[owner][2] == guardian ||
                ownerToGuardians[owner][3] == guardian,
            "guardian not authorized"
        );

        require(!hasApproved[owner][guardian], "guardian already approved");
        require(
            block.timestamp >= lastApprovedAt[guardian] + 10 minutes,
            "guardian needs to wait before approving again"
        );

        approved[guardian] = true;
        hasApproved[owner][guardian] = true;
        lastApprovedAt[guardian] = block.timestamp;
        counter++;
    }

    function getApproval() public view returns (uint256) {
        return counter;
    }

    function clearApproval() public {
        counter = 0;
        // iterate through all guardians and clear their hasApproved mapping
        for (uint256 i = 0; i < owners.length; i++) {
            address guardian = owners[i];
            if (
                hasApproved[msg.sender][guardian] &&
                block.timestamp >= lastApprovedAt[guardian] + 10 minutes
            ) {
                hasApproved[msg.sender][guardian] = false;
            }
        }
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function clearOwners() public {
        for (uint256 i = 0; i < owners.length; i++) {
            address owner = owners[i];
            isOwner[owner] = false;
        }

        delete owners;
    }
}