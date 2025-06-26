import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 md:gap-12">
      <h2 className="w-full h-14 md:h-16 p-[14px] md:p-4 bg-[#7A8588] text-white text-center text-xl md:text-2xl font-bold shadow-md">Page not found</h2>
      <p className="text-base md:text-base">Could not find requested resource.</p>
      <Image
        src="https://i.redd.it/zj7m5n0a2xx91.jpg" alt="wat the dog doin"
        width="500" height="500" priority />
    </div>
  )
}