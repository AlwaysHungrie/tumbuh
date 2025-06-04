'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

export default function FaqAccordian({
  title,
  text,
}: {
  title: string
  text: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-1">
      <div
        className="flex justify-between items-center cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-bold">{title}</h3>
        <Plus
          className={`w-4 h-4 transition-all duration-300 ease-in-out ${
            isOpen ? 'rotate-45 scale-110' : ''
          }`}
        />
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm mb-2">{text}</p>
        </div>
      </div>
    </div>
  )
}
