import Section from "./section";
import CurrentPrice from "./sections/currentPrice";

export default function CoinInfo() {
  return (
    <div className="w-full flex">
      <CurrentPrice />
      <Section title="My Wallet">
        <div></div>
      </Section>

      <Section title="Swap H2O">
        <div></div>
      </Section>
    </div>
  )
}