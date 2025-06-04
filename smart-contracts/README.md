# Smart Contracts

1. [H2O](./contracts/H2O.sol)

This is an ERC20 token that represents water given to the plant. 
Its price is completely controlled by an agent based on availability, demand and future prediction by an agent through a liquidity pool.

The agent has sole mint as well as burn rights to this token.

---

Hardhat Project

```
npx hardhat compile
npx hardhat ignition deploy ignition/modules/H2O.ts --network scrollMainnet
npx hardhat ignition verify chain-534352 --include-unrelated-contracts --show-stack-traces
```