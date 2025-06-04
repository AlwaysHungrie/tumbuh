export default function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`flex flex-col gap-2 flex-1 p-2
        bg-gradient-to-r from-white/30 to-transparent`}
    >
      <h2 className="font-bold text-sm">{title}</h2>
      <div className="flex flex-col gap-2 min-h-[64px]">{children}</div>
    </div>
  )
}
