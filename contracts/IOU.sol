// solium-disable linebreak-style
pragma solidity >=0.4.2;

contract IOU {

    //string names;
    int tokens;

    /*
    function setThaValues(int _tokens) public {
        //names = _hood;
        tokens = _tokens;
    }
    */
    function set(int _t) public {
        tokens = _t;
    }
    /*
    struct IOUMotion {
        uint iouId;
        uint amount;
        address individualOwed;
        uint conditionId;
    }

    event iouEvent (
        uint indexed _iouCount
    );

    uint public iouCount;

    mapping(uint => IOUMotion) public ious;
    
    function addIOU(uint _amount, address _individualTo, uint _conditionId) public {
        iouCount++;
        ious[iouCount] = IOUMotion(iouCount, _amount, _individualTo, _conditionId);

        emit iouEvent(iouCount);
    }
    */

}
