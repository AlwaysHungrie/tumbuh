'use client'

import { useCallback, useEffect, useState } from 'react'
import Section from '../section'
import { Loader2 } from 'lucide-react'
import { useGlobalStore } from '@/stores/globalStore'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CurrentPrice() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [newPrice, setNewPrice] = useState('')
  const { isLoading, price, setPrice, setIsAcceptingWater, setIsLoading } =
    useGlobalStore()

  const getMetadata = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/price`
      )
      setPrice(response.data.price)
      setNewPrice(response.data.price.toString())
      setIsAcceptingWater(response.data.isAcceptingWater)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }, [setPrice, setIsAcceptingWater, setIsLoading])

  useEffect(() => {
    getMetadata()
    const apiKey = localStorage.getItem('TUMBUH_API_KEY')
    if (apiKey) {
      setIsAdmin(true)
    }
  }, [getMetadata])

  const updatePrice = useCallback(async () => {
    const apiKey = localStorage.getItem('TUMBUH_API_KEY')
    if (!apiKey) return
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/price`, {
        price: parseFloat(newPrice),
      }, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      if (response.data.success) {
        setPrice(response.data.currentPrice)
      }
    } catch (error) {
      console.error(error)
    }
  }, [newPrice, setPrice])

  return (
    <Section title="H2O: Current Price">
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        {isLoading ? (
          <div className="h-8 w-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold">${price}</h1>
            {isAdmin && (
              <div className="flex items-center justify-center mt-1">
                <Input
                  className="bg-white w-[64px] mr-2"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
                <Button className='cursor-pointer' onClick={() => updatePrice()}>Update Price</Button>
              </div>
            )}
          </>
        )}
      </div>
    </Section>
  )
}
