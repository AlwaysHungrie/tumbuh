'use client'

import { PrivyProvider } from '@privy-io/react-auth'
import { Chain } from 'viem'

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID
if (!PRIVY_APP_ID) {
  throw new Error('NEXT_PUBLIC_PRIVY_APP_ID is not set')
}

const SCROLL_RPC = 'https://rpc.scroll.io'
const SCROLL_CHAIN_ID = 534352

const scroll: Chain = {
  id: SCROLL_CHAIN_ID,
  name: 'Scroll',
  nativeCurrency: {
    decimals: 18,
    name: 'Scroll Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [SCROLL_RPC],
    },
  },
  blockExplorers: {
    default: {
      name: 'ScrollScan',
      url: 'https://scrollscan.com',
    },
  },
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={PRIVY_APP_ID!}
      config={{
        defaultChain: scroll,
        supportedChains: [scroll],
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}
