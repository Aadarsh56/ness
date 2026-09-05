import { Reveal } from './Reveal'
import { MonogramRule } from './Monogram'

/** Shared shell for the quieter text pages (policies, contact, FAQ). */
export function EditorialPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <>
      <section className="bg-ivory pt-36 md:pt-44">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-rosewood">{eyebrow}</p>
            <h1 className="display-lg mt-6 text-espresso">{title}</h1>
            <p className="lede mt-7 text-rosewood">{intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-24 pt-16 md:pb-32 md:pt-20">
        <div className="shell max-w-3xl">{children}</div>
      </section>

      <section className="rule border-t bg-ivory-deep py-16">
        <div className="shell">
          <MonogramRule />
        </div>
      </section>
    </>
  )
}

export function Entry({
  term,
  children,
}: {
  term: string
  children: React.ReactNode
}) {
  return (
    <div className="rule-soft border-b py-9 first:pt-0 last:border-0">
      <h2 className="display-sm text-espresso">{term}</h2>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-rosewood">
        {children}
      </div>
    </div>
  )
}

/** Flags copy that is deliberately not final yet. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <p className="rule mt-6 border-l-2 border-l-burgundy py-1 pl-5 text-sm leading-relaxed text-rosewood">
      {children}
    </p>
  )
}
