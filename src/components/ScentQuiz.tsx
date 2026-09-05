'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { getFragrances, type Product } from '@/data/products'
import { Flacon } from './Flacon'
import { Monogram } from './Monogram'

/* ---------------------------------------------------------------------------
 * A transparent recommender, not a personality test. Each answer adds weight
 * to fragrance slugs; the result shows the reasoning so it can be argued with.
 * Weights live here so they can be retuned without touching the UI.
 * ------------------------------------------------------------------------- */

interface Choice {
  id: string
  label: string
  caption: string
  /** slug → weight */
  weights: Record<string, number>
}

interface Question {
  id: string
  prompt: string
  helper: string
  choices: Choice[]
}

const QUESTIONS: Question[] = [
  {
    id: 'temperature',
    prompt: 'Do you want to smell warm, or clean?',
    helper: 'The single biggest fork in the house.',
    choices: [
      {
        id: 'warm',
        label: 'Warm',
        caption: 'Sweet, resinous, closer to skin heat',
        weights: { n03: 3, n04: 3, n05: 3, n07: 2 },
      },
      {
        id: 'clean',
        label: 'Clean',
        caption: 'Airy, laundered, transparent',
        weights: { n01: 3, n08: 3, n02: 2, n06: 1 },
      },
      {
        id: 'either',
        label: 'Depends on the day',
        caption: 'You want something that moves between the two',
        weights: { n02: 3, n05: 1, n08: 2, n06: 1 },
      },
    ],
  },
  {
    id: 'proximity',
    prompt: 'How far should it travel?',
    helper: 'Projection is a preference, not a measure of quality.',
    choices: [
      {
        id: 'skin',
        label: 'Stays on me',
        caption: 'Noticed only by people who are close',
        weights: { n01: 3, n08: 3, n02: 2 },
      },
      {
        id: 'arms',
        label: 'Arm’s length',
        caption: 'Present in a conversation, not in a room',
        weights: { n02: 3, n05: 2, n06: 2, n08: 1 },
      },
      {
        id: 'room',
        label: 'Enters before I do',
        caption: 'You want it to be the thing people remember',
        weights: { n04: 3, n07: 3, n03: 2, n06: 2 },
      },
    ],
  },
  {
    id: 'time',
    prompt: 'When will you actually wear it?',
    helper: 'Be honest — most people buy for the evening and wear in the day.',
    choices: [
      {
        id: 'day',
        label: 'Daylight',
        caption: 'Work, errands, most of your life',
        weights: { n01: 3, n08: 3, n02: 2 },
      },
      {
        id: 'evening',
        label: 'After dark',
        caption: 'Dinners, occasions, going out',
        weights: { n04: 3, n07: 3, n03: 2, n06: 2 },
      },
      {
        id: 'both',
        label: 'One bottle for everything',
        caption: 'You do not want to think about it',
        weights: { n02: 3, n05: 2, n08: 2 },
      },
    ],
  },
  {
    id: 'sweetness',
    prompt: 'How do you feel about sweetness?',
    helper: 'Gourmand is a spectrum, not a verdict.',
    choices: [
      {
        id: 'none',
        label: 'Keep it dry',
        caption: 'Woods, tea, green things',
        weights: { n08: 3, n02: 3, n06: 1 },
      },
      {
        id: 'some',
        label: 'A little',
        caption: 'Sweet edges, not a dessert',
        weights: { n05: 2, n01: 2, n04: 2, n03: 1 },
      },
      {
        id: 'lots',
        label: 'Bring it on',
        caption: 'Vanilla, caramel, tonka',
        weights: { n03: 3, n05: 3, n04: 1 },
      },
    ],
  },
  {
    id: 'flowers',
    prompt: 'And flowers?',
    helper: 'Florals range from a whisper to a full white bouquet.',
    choices: [
      {
        id: 'no',
        label: 'Rather not',
        caption: 'Nothing that reads as a bouquet',
        weights: { n03: 2, n05: 2, n08: 3, n02: 2 },
      },
      {
        id: 'soft',
        label: 'Soft ones',
        caption: 'Peony, freesia, something quiet',
        weights: { n01: 3, n02: 1 },
      },
      {
        id: 'full',
        label: 'The loud ones',
        caption: 'Tuberose, jasmine, rose at volume',
        weights: { n06: 3, n04: 2, n07: 2 },
      },
    ],
  },
  {
    id: 'intent',
    prompt: 'What is this fragrance for?',
    helper: 'The last question, and the one that decides ties.',
    choices: [
      {
        id: 'signature',
        label: 'Becoming my signature',
        caption: 'One scent, worn until it is yours',
        weights: { n02: 3, n08: 2, n05: 1 },
      },
      {
        id: 'seduction',
        label: 'Being remembered',
        caption: 'You want it to do some of the work',
        weights: { n04: 3, n07: 2, n03: 2 },
      },
      {
        id: 'collection',
        label: 'Building a wardrobe',
        caption: 'You intend to layer and rotate',
        weights: { n01: 2, n05: 2, n06: 2, n08: 1 },
      },
    ],
  },
]

type Answers = Record<string, string>

function score(answers: Answers): { product: Product; points: number }[] {
  const totals = new Map<string, number>()

  for (const q of QUESTIONS) {
    const chosen = q.choices.find((c) => c.id === answers[q.id])
    if (!chosen) continue
    for (const [slug, weight] of Object.entries(chosen.weights)) {
      totals.set(slug, (totals.get(slug) ?? 0) + weight)
    }
  }

  return getFragrances()
    .map((product) => ({ product, points: totals.get(product.slug) ?? 0 }))
    .sort((a, b) => b.points - a.points || a.product.slug.localeCompare(b.product.slug))
}

export function ScentQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  const total = QUESTIONS.length
  const done = step >= total
  const results = useMemo(() => (done ? score(answers).slice(0, 3) : []), [done, answers])
  const question = QUESTIONS[step]

  function choose(choiceId: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: choiceId }))
    // Small delay so the selection is visible before the panel advances.
    window.setTimeout(() => setStep((s) => s + 1), 220)
  }

  function restart() {
    setAnswers({})
    setStep(0)
  }

  if (done) {
    const [first, ...rest] = results
    const top = first?.product
    if (!top) return null

    const reasons = QUESTIONS.flatMap((q) => {
      const chosen = q.choices.find((c) => c.id === answers[q.id])
      if (!chosen || !chosen.weights[top.slug]) return []
      return [chosen.label]
    })

    return (
      <div>
        <div className="text-center">
          <Monogram tone="espresso" width={54} className="mx-auto opacity-35" />
          <p className="eyebrow mt-7 text-rosewood">Your result</p>
          <h2 className="display-lg mt-5 text-espresso">{top.title}</h2>
          <p className="lede mx-auto mt-6 max-w-lg text-rosewood">
            {top.description}
          </p>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:items-center">
          <div
            className="aspect-4/5 w-full"
            style={{ backgroundColor: top.art.panel }}
          >
            <Flacon product={top} className="h-full w-full p-12" />
          </div>

          <div>
            <h3 className="eyebrow text-rosewood">Why this one</h3>
            <ul className="mt-6 space-y-3">
              {reasons.map((r, i) => (
                <li
                  key={`${r}-${i}`}
                  className="rule-soft flex items-baseline gap-4 border-b pb-3 text-sm text-espresso"
                >
                  <span className="eyebrow text-rosewood" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`/product/${top.slug}`} className="btn btn-solid">
                View {top.reference}
              </Link>
              <Link href="/shop?format=discovery" className="btn">
                Try it in a set
              </Link>
            </div>
          </div>
        </div>

        {rest.length > 0 && (
          <div className="rule mt-20 border-t pt-12">
            <h3 className="eyebrow text-rosewood">Also worth your time</h3>
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {rest.map(({ product }) => (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group flex items-center gap-6"
                >
                  <div
                    className="h-28 w-24 shrink-0"
                    style={{ backgroundColor: product.art.panel }}
                  >
                    <Flacon
                      product={product}
                      className="h-full w-full p-3 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="eyebrow text-rosewood">{product.reference}</p>
                    <p className="display-sm mt-2 text-espresso">{product.title}</p>
                    <p className="mt-1 text-sm text-rosewood">{product.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-14 text-center">
          <button type="button" onClick={restart} className="eyebrow link-quiet link-drawn text-rosewood">
            Start again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-4">
        <span className="eyebrow shrink-0 text-rosewood">
          {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <div
          className="h-px flex-1 bg-espresso/12"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label="Question progress"
        >
          <div
            className="h-px bg-espresso transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="eyebrow link-quiet shrink-0 text-rosewood"
          >
            Back
          </button>
        )}
      </div>

      <fieldset className="mt-12">
        <legend className="display-md max-w-[18ch] text-espresso">
          {question.prompt}
        </legend>
        <p className="mt-5 text-sm text-rosewood">{question.helper}</p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {question.choices.map((choice) => {
            const active = answers[question.id] === choice.id
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => choose(choice.id)}
                aria-pressed={active}
                className={`group flex h-full flex-col items-start border p-7 text-left transition-colors duration-500 ${
                  active
                    ? 'border-espresso bg-espresso text-ivory'
                    : 'rule bg-transparent text-espresso hover:border-espresso/45'
                }`}
              >
                <span className="display-sm">{choice.label}</span>
                <span
                  className={`mt-3 text-sm leading-relaxed ${
                    active ? 'text-ivory/65' : 'text-rosewood'
                  }`}
                >
                  {choice.caption}
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>
    </div>
  )
}
