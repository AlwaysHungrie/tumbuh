'use client'

import { useState } from "react";
import Section from "../section";

export default function CurrentPrice() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState(0)

  return (
    <Section title="H2O: Current Price">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">${currentPrice}</h1>
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </Section>
  )
}