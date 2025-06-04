import Image from 'next/image'

// 207*96/256 = 77.7

export default function Sidebar() {
  return (
    <div className="flex flex-col min-h-screen bg-white/15 w-full max-w-[256px] px-2">
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
    </div>
  )
}
