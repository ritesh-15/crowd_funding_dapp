import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      accounts: [
        "e622bd88625e09db054d34b14ca484453689ec6214b6f4905c382bdeca37ab18",
      ],
      url: "http://127.0.0.1:7545",
    },
  },
};

export default config;
