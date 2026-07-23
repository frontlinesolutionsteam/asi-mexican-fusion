import { site, type HoursEntry } from "@/config/site";

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: site.ordering.currency,
  }).format(value);
}

/** "11:30" -> "11:30am" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12}${period}` : `${hour12}:${String(m).padStart(2, "0")}${period}`;
}

/** JS getDay() (0=Sun) mapped to our Monday-first config order. */
function todayEntry(now = new Date()): HoursEntry {
  // config order is Mon..Sun
  const jsDay = now.getDay(); // 0=Sun..6=Sat
  const index = jsDay === 0 ? 6 : jsDay - 1;
  return site.hours[index];
}

export type OpenState = {
  isOpen: boolean;
  label: string; // e.g. "Open now · closes 8pm" or "Closed · opens Tue 11:30am"
  today: HoursEntry;
};

export function getOpenState(now = new Date()): OpenState {
  const today = todayEntry(now);
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  const toMin = (s: string) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };

  if (!today.closed && today.open && today.close) {
    const openMin = toMin(today.open);
    const closeMin = toMin(today.close);
    if (minutesNow >= openMin && minutesNow < closeMin) {
      return {
        isOpen: true,
        label: `Open now · closes ${formatTime(today.close)}`,
        today,
      };
    }
    if (minutesNow < openMin) {
      return {
        isOpen: false,
        label: `Opens today at ${formatTime(today.open)}`,
        today,
      };
    }
  }

  // Find the next open day
  const jsDay = now.getDay();
  const startIndex = jsDay === 0 ? 6 : jsDay - 1;
  for (let i = 1; i <= 7; i++) {
    const entry = site.hours[(startIndex + i) % 7];
    if (!entry.closed && entry.open) {
      return {
        isOpen: false,
        label: `Closed · opens ${entry.short} ${formatTime(entry.open)}`,
        today,
      };
    }
  }
  return { isOpen: false, label: "Closed", today };
}

export function hoursLabel(entry: HoursEntry): string {
  if (entry.closed || !entry.open || !entry.close) return "Closed";
  return `${formatTime(entry.open)} – ${formatTime(entry.close)}`;
}
