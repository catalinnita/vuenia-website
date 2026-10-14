// The monthly platform price, put in everyday terms for the pricing page's rotating
// line. Rough on purpose — figures to round to, not quotes. Only for a monthly USD price.
const DAYS_PER_MONTH = 30.4;
const WEEKDAYS_PER_MONTH = 21.7;
// US average hourly earnings, all private employees (BLS Current Employment Statistics,
// ~$36/hour in 2025–26).
const AVERAGE_HOURLY_PAY_USD = 36;
const COFFEE_USD = 5;
// YouTube creator RPM — revenue per 1,000 views after YouTube's share. Typically ~$1–$5
// depending on niche and audience (finance/business sits higher); $3 is a middle figure.
const YOUTUBE_RPM_USD = 3;

function usd(n: number): string {
  return `$${n.toFixed(2)}`;
}

function hoursLabel(hours: number): string {
  // Round up to the nearest half hour, so "less than" always holds.
  const halves = Math.ceil(hours * 2);
  const whole = Math.floor(halves / 2);
  const half = halves % 2 === 1;
  if (whole === 0) return "half an hour";
  return `${whole}${half ? "½" : ""} hour${whole === 1 && !half ? "" : "s"}`;
}

// Rounded to the nearest thousand, "16k" style.
function youtubeViewsLabel(usd: number): string {
  const views = (usd / YOUTUBE_RPM_USD) * 1000;
  return `${Math.round(views / 1000)}k`;
}

export function priceInPerspective(monthlyUsd: number): string[] {
  return [
    `just ${usd(monthlyUsd / DAYS_PER_MONTH)} a day`,
    `less than ${hoursLabel(monthlyUsd / AVERAGE_HOURLY_PAY_USD)} of average pay`,
    `${usd(monthlyUsd / WEEKDAYS_PER_MONTH)} per weekday episode + tokens`,
    `about ${Math.round(monthlyUsd / COFFEE_USD)} coffees a month`,
    `the ad revenue of ~${youtubeViewsLabel(monthlyUsd)} YouTube views`,
  ];
}
