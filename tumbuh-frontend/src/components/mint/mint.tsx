'use client'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { usePrivy } from '@privy-io/react-auth'
import { useGlobalStore } from '@/stores/globalStore'
import { Loader2 } from 'lucide-react'

export default function Mint() {
  const { user } = usePrivy()
  const { isAcceptingWater, setIsAcceptingWater } = useGlobalStore()

  const address = user?.wallet?.address

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const isValid = imageFile && address && isAcceptingWater

  const handleMint = useCallback(async () => {
    if (!imageFile) return
    if (!address) return
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('imageFile', imageFile)
      formData.append('address', address)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/water`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      const { success, amount: mintedAmount, txnHash } = response.data

      if (!success) {
        toast.custom(
          (id) => {
            return (
              <div className="bg-white text-black p-2 text-sm rounded-sm flex flex-col gap-2 min-w-[300px]">
                <p>Could not mint H2O token to your wallet.</p>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.dismiss(id)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )
          },
          {
            dismissible: true,
            duration: Infinity,
          }
        )
      }

      const explorerLink = `https://scrollscan.com/tx/${txnHash}`
      toast.custom(
        (id) => {
          return (
            <div className="bg-white text-black p-2 text-sm rounded-sm flex flex-col gap-2 min-w-[300px]">
              <p>
                Successfully minted {mintedAmount} H2O token to your
                wallet.&nbsp;
                <a
                  href={explorerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View Transaction
                </a>
              </p>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.dismiss(id)}
                >
                  Close
                </Button>
              </div>
            </div>
          )
        },
        {
          dismissible: true,
          duration: Infinity,
        }
      )
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [imageFile, address])

  const toggleAcceptingWater = useCallback(async () => {
    const apiKey = localStorage.getItem('TUMBUH_API_KEY')
    if (!apiKey) return
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/price`,
        {
          isAcceptingWater: !isAcceptingWater,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      )
      if (response.data.success) {
        setIsAcceptingWater(response.data.isAcceptingWater)
      }
    } catch (error) {
      console.error(error)
    }
  }, [isAcceptingWater, setIsAcceptingWater])

  useEffect(() => {
    const apiKey = localStorage.getItem('TUMBUH_API_KEY')
    if (apiKey) {
      setIsAdmin(true)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex gap-2">
        <div className="w-32 h-32">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => {
              setImageFile(e.target.files?.[0] || null)
            }}
            hidden
          />

          <div
            className="border-2 border-gray-300 rounded-sm h-full w-full relative aspect-square bg-gray-100 hover:opacity-80 cursor-pointer overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {imageFile ? (
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="image"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <p className="text-sm text-gray-500 text-center">
                  No image <br /> selected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        disabled={isLoading || !isValid}
        className="w-full max-w-md mt-2 bg-pink-800 hover:bg-pink-900 disabled:opacity-50 cursor-pointer"
        onClick={handleMint}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : isAcceptingWater ? (
          'Send Proof'
        ) : (
          'Not Accepting Water'
        )}
      </Button>
      {isAdmin && (
        <Button className="cursor-pointer mt-2" onClick={toggleAcceptingWater}>
          Toggle Accepting Water
        </Button>
      )}
    </div>
  )
}
