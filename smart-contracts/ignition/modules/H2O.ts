const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules')
import dotenv from 'dotenv'
import { ethers } from 'ethers'

dotenv.config()

const wallet = new ethers.Wallet(process.env.TUMBUH_PRIVATE_KEY!)
console.log(wallet.address)

export default buildModule('H2OModule', (m: any) => {
  const h2o = m.contract('H2OToken', [ wallet.address ])

  return { h2o }
})