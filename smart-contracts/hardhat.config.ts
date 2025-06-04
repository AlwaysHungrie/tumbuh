import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import dotenv from 'dotenv'

dotenv.config()

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  networks: {
    scrollMainnet: {
      url: process.env.SCROLL_MAINNET_RPC,
      accounts: process.env.TUMBUH_PRIVATE_KEY
        ? [process.env.TUMBUH_PRIVATE_KEY]
        : [],
    },
  },
  etherscan: {
    apiKey: {
      scrollMainnet: process.env.SCROLLSCAN_API_KEY || '',
    },
    customChains: [
      {
        network: 'scrollMainnet',
        chainId: 534352,
        urls: {
          apiURL: 'https://api.scrollscan.com/api',
          browserURL: 'https://scrollscan.com',
        },
      },
    ],
  },
}

export default config
