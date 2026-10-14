// Vuenia credit: prepaid, pays for any model/voice usage a user doesn't cover with their
// own API keys. Same amounts as admin's src/lib/billing.ts — keep the two in step.
export const CREDIT_OPTIONS = [3, 7, 10, 25, 50] as const;
export const DEFAULT_CREDIT = 7;

// Average token cost of a 5-minute, single-voice episode (audio or video — rendering the
// video adds no token cost), at the providers' own rates. Derived from The Morning Bell's
// recorded runs: a ~10-minute two-host episode averages $2.23 of ElevenLabs narration
// (~10,150 characters) + $1.02 of Claude (research, script, slides, metadata). Halving the
// narration and script for 5 minutes, with research roughly fixed, lands at ~$1.70.
export const FIVE_MIN_EPISODE_USD = 1.7;

export function episodesFor(amountUsd: number): number {
  return Math.floor(amountUsd / FIVE_MIN_EPISODE_USD);
}
