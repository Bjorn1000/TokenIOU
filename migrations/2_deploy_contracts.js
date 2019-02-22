var IOU = artifacts.require("./IOU.sol");

module.exports = function(deployer) {
  deployer.deploy(IOU);
};
