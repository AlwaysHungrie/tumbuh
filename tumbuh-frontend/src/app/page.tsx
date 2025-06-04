import CoinInfo from '@/components/coinInfo/coinInfo'
import Mint from '@/components/mint/mint'
import Sidebar from '@/components/sidebar'

export default function Home() {
  return (
    <div className="flex h-screen bg-tumbuh-background">
      <Sidebar />
      <div className="flex-1 flex flex-col max-w-screen-lg mx-auto my-8 px-4">
        <div className='h-10 block md:hidden' />
        <CoinInfo />
        <Mint />
      </div>
    </div>
  )
}
