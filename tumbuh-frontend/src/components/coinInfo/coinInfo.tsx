import Section from "./section";
import CurrentPrice from "./sections/currentPrice";
import CurrentTokens from "./sections/currentTokens";

export default function CoinInfo() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-2">
      <CurrentPrice />
      <CurrentTokens />

      <Section title="Swap H2O">
        <div className="text-center text-sm text-gray-500 h-full flex items-center justify-center">
          (Liquidity pool coming soon)
        </div>
      </Section>
    </div>
  )
}