import { PersonCard } from "@/components/PersonCard";
import { people, type Person } from "@/lib/lab-data";

// Fixed order for the homepage team strip (not the full People page order).
// Puja Ghosh currently has no `photo` on her lab-data.ts entry — restore her
// photo import there so her card isn't the initials fallback.
const STRIP_SLUGS = [
  "dhiraj-dhotre",
  "niraj-rane",
  "mitali-inamdar",
  "suyash-jadhav",
  "puja-ghosh",
] as const;

// Renders the exact same PersonCard used on the People page (identical
// photo size, font and hover states), in a 5-column grid with no max-width
// cap so the row fills the full browser width edge to edge, not just the
// site's usual reading-width container.
export function TeamMarquee() {
  const bySlug = new Map(people.map((p) => [p.slug, p]));
  const items = STRIP_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is Person => Boolean(p),
  );

  return (
    <div className="grid w-full grid-cols-2 gap-6 px-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8 lg:px-10">
      {items.map((p) => (
        <PersonCard key={p.slug} p={p} />
      ))}
    </div>
  );
}
