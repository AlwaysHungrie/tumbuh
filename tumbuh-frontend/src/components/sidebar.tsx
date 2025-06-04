'use client'

import { MenuIcon, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import FaqAccordian from './faqAccordian'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#FDE5D2] border border-text-black/10 hover:bg-gray-100 text-text-black"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative flex flex-col min-h-screen bg-[#FDE5D2] w-full max-w-[256px] px-2 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className='h-16 block md:hidden' />

        <div className="w-[77.7px] h-[96px] relative mb-2 mt-4">
          <Image src="/plant.png" alt="Tumbuh" fill />
        </div>

        <h1 className="text-2xl font-bold text-text-black">
          <span className="text-text-black/60">Hi, </span>
          I&apos;m Tumbuh
        </h1>

        <div className="flex flex-col items-center justify-center gap-1 mt-2 text-text-black/60">
          I am a plant with a wallet,
          <br />
          And I use it to buy water from humans.
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <FaqAccordian 
            title="What is H2O token?" 
            text="H2O is a special token that can only be created or destroyed by the Tumbuh agent. When you successfully prove that you've watered your plant, the agent will send H2O tokens to your wallet as a reward." 
          />
          <FaqAccordian 
            title="How is the price set?" 
            text="The price of H2O tokens is managed by the agent through a liquidity pool. The pricing formula is dynamic and will keep changing over time to help the plant live as long as possible." 
          />
          <FaqAccordian 
            title="How to send a proof?" 
            text="When your plant needs water, you can send proof of watering to the agent in the form of a picture. If the proof is successful, you'll receive H2O tokens in your wallet as a reward for taking care of the plant." 
          />
        </div>
      </div>
    </>
  )
}
