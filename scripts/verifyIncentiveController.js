const { ethers, run } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

    let args = ["0xd67B4b05E3777C86b5BddF5Cf845FEB055Ec8230", "0x5c118ca1547DAC7019d0A177A8f20761A06A4700"];

    // Deploy LendingPoolAddressProvider contract
    let AaveIncentiveController = await ethers.getContractFactory("AaveIncentivesController");
    const aaveIncentiveController = await AaveIncentiveController.deploy(...args);

    const transaction = await aaveIncentiveController.deployed();
    console.log("AaveIncentiveController deployed to:", aaveIncentiveController.address);

    // Wait for 5 confirmations
    await ethers.provider.waitForTransaction(transaction.deployTransaction.hash, 5);

    // Verify the contract after deploying
    await run("verify", {
        address: aaveIncentiveController.address,
        constructorArgument: args,
    });
}

// Call the main function and catch if there is any error
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
