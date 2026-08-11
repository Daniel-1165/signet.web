/**
 * The site's entire motion vocabulary.
 *
 * Before this existed, 55 animated blocks across the app used 12 different
 * durations and 5 different easing curves. No two sections moved the same
 * way, which is what made the page feel restless rather than composed.
 *
 * There is one gesture: content rises a short distance and fades in. Ten
 * pixels is deliberately small — long travel reads as a slideshow, short
 * travel reads as the page settling. Everything that animates on scroll uses
 * `rise`; anything in a sequence uses `riseAt(i)`.
 *
 * Keep these in step with the --ease / --dur-* tokens in globals.css, which
 * carry the same values for CSS-driven animation.
 */

/** Gentle decelerate: quick to start, long to settle. Matches --ease. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DUR = {
  fast: 0.16,
  base: 0.32,
  slow: 0.62,
} as const;

/** The one gesture. Spread onto any `motion.*` element. */
export const rise = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: DUR.slow, ease: EASE },
} as const;

/**
 * The same gesture, staggered. 70ms between steps is short enough that a
 * group still reads as one movement rather than a queue.
 */
export const riseAt = (index: number) => ({
  ...rise,
  transition: { ...rise.transition, delay: index * 0.07 },
});

/** For elements that animate on mount rather than on scroll. */
export const riseOnMount = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.slow, ease: EASE },
} as const;
