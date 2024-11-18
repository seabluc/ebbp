import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h2 className="mt-8">Page not found</h2>
      <p>Could not find requested resource</p>
      <Image className="mt-4"
        src="https://i.redd.it/zj7m5n0a2xx91.jpg" alt="wat the dog doin"
        width="500" height="500" priority />
    </div>
  )
}