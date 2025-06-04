import dotenv from 'dotenv'

dotenv.config()

const FRONTEND_HOST = process.env.FRONTEND_HOST || 'http://localhost:3000'

const API_SECRET = process.env.API_SECRET
if (!API_SECRET) {
  throw new Error('API_SECRET is not set')
}

const WALLET_GEN_SECRET = process.env.WALLET_GEN_SECRET
if (!WALLET_GEN_SECRET) {
  throw new Error('WALLET_GEN_SECRET is not set')
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set')
}

const TUMBUH_PRIVATE_KEY = process.env.TUMBUH_PRIVATE_KEY
const TUMBUH_ADDRESS = process.env.TUMBUH_ADDRESS
if (!TUMBUH_PRIVATE_KEY || !TUMBUH_ADDRESS) {
  throw new Error('TUMBUH_PRIVATE_KEY or TUMBUH_ADDRESS is not set')
}

const SCROLL_MAINNET_RPC = process.env.SCROLL_MAINNET_RPC || 'https://rpc.scroll.io'
const SCROLL_MAINNET_CHAIN_ID = process.env.SCROLL_MAINNET_CHAIN_ID || '534352'

const H2O_ADDRESS = process.env.H2O_ADDRESS
if (!H2O_ADDRESS) {
  throw new Error('H2O_ADDRESS is not set')
}

const USDC_ADDRESS = process.env.USDC_ADDRESS
if (!USDC_ADDRESS) {
  throw new Error('USDC_ADDRESS is not set')
}

const l1GasOracleAddress = '0x5300000000000000000000000000000000000002'
const l1GasOracleAbi = [{"type": "constructor","inputs": [{"name": "_owner","type": "address","internalType": "address"}],"stateMutability": "nonpayable"},{"type": "function","name": "blobScalar","inputs": [],"outputs": [{"name": "","type": "uint256","internalType": "uint256"}],"stateMutability": "view"},{"type": "function","name": "commitScalar","inputs": [],"outputs": [{"name": "","type": "uint256","internalType": "uint256"}],"stateMutability": "view"},{"type": "function","name": "enableCurie","inputs": [],"outputs": [],"stateMutability": "nonpayable"},{"type": "function","name": "getL1Fee","inputs": [{"name": "_data","type": "bytes","internalType": "bytes"}],"outputs": [{"name": "","type": "uint256","internalType": "uint256"}],"stateMutability": "view"},{"type": "function","name": "getL1GasUsed","inputs": [{"name": "_data","type": "bytes","internalType": "bytes"}],"outputs": [{"name": "","type": "uint256","internalType": "uint256"}],"stateMutability": "view"},{"type": "function","name": "isCurie","inputs": [],"outputs": [{"name": "","type": "bool","internalType": "bool"}],"stateMutability": "view"},{"type": "function","name": "l1BaseFee","inputs": [],"outputs": [{"name": "","type": "uint256","internalType": "uint256"}],"stateMutability": "view"},{"type": "function","name": "l1BlobBaseFee","inputs": [],"outputs": [{"name": "","type": "uint256","internalType": "uint256"}],"stateMutability": "view"},{"type": "function","name": "overhead","inputs": [],"outputs": [{"name": "","type": "uint256","internalType": "uint256"}],"stateMutability": "view"},{"type": "function","name": "owner","inputs": [],"outputs": [{"name": "","type": "address","internalType": "address"}],"stateMutability": "view"},{"type": "function","name": "renounceOwnership","inputs": [],"outputs": [],"stateMutability": "nonpayable"},{"type": "function","name": "scalar","inputs": [],"outputs": [{"name": "","type": "uint256","internalType": "uint256"}],"stateMutability": "view"},{"type": "function","name": "setBlobScalar","inputs": [{"name": "_scalar","type": "uint256","internalType": "uint256"}],"outputs": [],"stateMutability": "nonpayable"},{"type": "function","name": "setCommitScalar","inputs": [{"name": "_scalar","type": "uint256","internalType": "uint256"}],"outputs": [],"stateMutability": "nonpayable"},{"type": "function","name": "setL1BaseFee","inputs": [{"name": "_l1BaseFee","type": "uint256","internalType": "uint256"}],"outputs": [],"stateMutability": "nonpayable"},{"type": "function","name": "setL1BaseFeeAndBlobBaseFee","inputs": [{"name": "_l1BaseFee","type": "uint256","internalType": "uint256"},{"name": "_l1BlobBaseFee","type": "uint256","internalType": "uint256"}],"outputs": [],"stateMutability": "nonpayable"},{"type": "function","name": "setOverhead","inputs": [{"name": "_overhead","type": "uint256","internalType": "uint256"}],"outputs": [],"stateMutability": "nonpayable"},{"type": "function","name": "setScalar","inputs": [{"name": "_scalar","type": "uint256","internalType": "uint256"}],"outputs": [],"stateMutability": "nonpayable"},{"type": "function","name": "transferOwnership","inputs": [{"name": "_newOwner","type": "address","internalType": "address"}],"outputs": [],"stateMutability": "nonpayable"},{"type": "function","name": "updateWhitelist","inputs": [{"name": "_newWhitelist","type": "address","internalType": "address"}],"outputs": [],"stateMutability": "nonpayable"},{"type": "function","name": "whitelist","inputs": [],"outputs": [{"name": "","type": "address","internalType": "contract IWhitelist"}],"stateMutability": "view"},{"type": "event","name": "BlobScalarUpdated","inputs": [{"name": "scalar","type": "uint256","indexed": false,"internalType": "uint256"}],"anonymous": false},{"type": "event","name": "CommitScalarUpdated","inputs": [{"name": "scalar","type": "uint256","indexed": false,"internalType": "uint256"}],"anonymous": false},{"type": "event","name": "L1BaseFeeUpdated","inputs": [{"name": "l1BaseFee","type": "uint256","indexed": false,"internalType": "uint256"}],"anonymous": false},{"type": "event","name": "L1BlobBaseFeeUpdated","inputs": [{"name": "l1BlobBaseFee","type": "uint256","indexed": false,"internalType": "uint256"}],"anonymous": false},{"type": "event","name": "OverheadUpdated","inputs": [{"name": "overhead","type": "uint256","indexed": false,"internalType": "uint256"}],"anonymous": false},{"type": "event","name": "OwnershipTransferred","inputs": [{"name": "_oldOwner","type": "address","indexed": true,"internalType": "address"},{"name": "_newOwner","type": "address","indexed": true,"internalType": "address"}],"anonymous": false},{"type": "event","name": "ScalarUpdated","inputs": [{"name": "scalar","type": "uint256","indexed": false,"internalType": "uint256"}],"anonymous": false},{"type": "event","name": "UpdateWhitelist","inputs": [{"name": "_oldWhitelist","type": "address","indexed": false,"internalType": "address"},{"name": "_newWhitelist","type": "address","indexed": false,"internalType": "address"}],"anonymous": false},{"type": "error","name": "ErrAlreadyInCurieFork","inputs": []},{"type": "error","name": "ErrCallerNotWhitelisted","inputs": []},{"type": "error","name": "ErrExceedMaxBlobScalar","inputs": []},{"type": "error","name": "ErrExceedMaxCommitScalar","inputs": []},{"type": "error","name": "ErrExceedMaxOverhead","inputs": []},{"type": "error","name": "ErrExceedMaxScalar","inputs": []}]

export const config = {
  port: process.env.PORT || 3001,
  frontendHost: FRONTEND_HOST,
  apiSecret: API_SECRET,
  walletGenSecret: WALLET_GEN_SECRET,
  openaiApiKey: OPENAI_API_KEY,

  scrollMainnetRpc: SCROLL_MAINNET_RPC,
  scrollMainnetChainId: SCROLL_MAINNET_CHAIN_ID,
  h2oAddress: H2O_ADDRESS,
  tumbuhPrivateKey: TUMBUH_PRIVATE_KEY,
  tumbuhAddress: TUMBUH_ADDRESS,
  usdcAddress: USDC_ADDRESS,

  l1GasOracleAbi: l1GasOracleAbi,
  l1GasOracleAddress: l1GasOracleAddress,
}
