'use client'

import { usePrivy } from '@privy-io/react-auth'
import Section from '../section'
import { Loader2, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const formatAddress = (address?: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

const formatBalance = (balance: number) => {
  return balance.toFixed(2)
}

export default function CurrentTokens() {
  const { ready, user, login, logout } = usePrivy()
  const isLoading = !ready
  const isConnected = !!user

  const [balance, setBalance] = useState(0)

  const getBalance = useCallback(async () => {
    if (!user) return
    try {
      const balance = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/water/${user.wallet?.address}`
      )
      setBalance(parseFloat(balance.data.waterBalance))
    } catch (error) {
      console.error(error)
    }
  }, [user])

  useEffect(() => {
    if (isConnected) {
      getBalance()
    }
  }, [getBalance, isConnected])

  return (
    <Section title="Your Wallet">
      {isConnected && (
        <div
          className="absolute top-2 right-2 cursor-pointer hover:opacity-50"
          onClick={() => logout()}
        >
          <LogOut className="w-4 h-4" />
        </div>
      )}

      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        {isLoading ? (
          <div className="h-8 w-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : isConnected ? (
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">
                {formatBalance(balance)} H2O
              </h1>
              <div className="text-sm text-gray-500">
                {formatAddress(user.wallet?.address)}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Button className="cursor-pointer" onClick={() => login()}>
              Connect Wallet
            </Button>
            <p className="text-sm text-gray-500 mt-1">
              Connect your wallet to view your current tokens
            </p>
          </>
        )}
      </div>
    </Section>
  )
}
