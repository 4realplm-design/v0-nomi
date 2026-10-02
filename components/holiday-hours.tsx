export default function HolidayHours() {
  return (
    <div className="border-y border-[#d8a65b]/20 bg-[#16090d] px-4 py-3 text-center text-sm text-white/80 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span className="font-bold uppercase tracking-[0.16em] text-[#d8a65b]">Oktober</span>
        <span>Man–fre 16:00–21:00</span><span className="text-[#A91D3A]">•</span><span>Lør 12:00–22:00</span><span className="text-[#A91D3A]">•</span><span>Søn 12:00–21:00</span>
        <span className="font-semibold text-[#d8a65b]">Efterårsferien: fra kl. 12:00 hver dag</span>
      </div>
    </div>
  )
}
