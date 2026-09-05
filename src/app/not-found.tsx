import Link from 'next/link'
import { Monogram } from '@/components/Monogram'

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-ivory px-6 pt-24">
      <div className="flex max-w-md flex-col items-center text-center">
        <Monogram tone="espresso" width={72} className="opacity-25" />
        <p className="eyebrow mt-10 text-rosewood">404</p>
        <h1 className="display-lg mt-5 text-espresso">
          Nothing at this address
        </h1>
        <p className="lede mt-6 text-rosewood">
          The page you were looking for has moved, or never existed. The
          collection is this way.
        </p>
        <div className="mt-11 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="btn btn-solid">
            The collection
          </Link>
          <Link href="/" className="btn">
            Return home
          </Link>
        </div>
      </div>
    </section>
  )
}
