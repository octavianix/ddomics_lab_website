import { Link } from "@tanstack/react-router";
import { ProtectedImage } from "@/components/ProtectedImage";
import { people, type Person } from "@/lib/lab-data";

// Fixed order for the homepage team ribbon (not the full People page order).
// Puja Ghosh currently has no `photo` on her lab-data.ts entry — restore her
// photo import there (see the note left in that file) so her card isn't blank.
const RIBBON_SLUGS = [
  "dhiraj-dhotre",
  "niraj-rane",
  "mitali-inamdar",
  "suyash-jadhav",
  "puja-ghosh",
] as const;

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Infinite sliding ribbon of team photo cards, same card size as DomainsMarquee.
export function TeamMarquee() {
  const bySlug = new Map(people.map((p) => [p.slug, p]));
  const ordered = RIBBON_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is Person => Boolean(p),
  );
  const items = [...ordered, ...ordered];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="domains-marquee-track gap-[20px]">
        {items.map((p, i) => {
          const inner = (
            <>
              <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-muted">
                {p.photo ? (
                  <ProtectedImage
                    src={p.photo}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="display-title flex h-full w-full items-center justify-center text-4xl text-muted-foreground">
                    {initials(p.name)}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center p-7">
                <h3 className="display-title text-xl leading-snug transition-colors group-hover:text-primary">
                  {p.name}
                </h3>
                <p className="mt-2 font-display text-sm font-semibold text-primary">
                  {p.role}
                </p>
              </div>
            </>
          );
          const cls =
            "lift-card sheen group flex h-[647.219px] w-[377.828px] shrink-0 flex-col overflow-hidden border border-border bg-card";

          return p.link ? (
            <Link key={`${p.slug}-${i}`} to="/dhiraj-dhotre" className={cls}>
              {inner}
            </Link>
          ) : (
            <Link
              key={`${p.slug}-${i}`}
              to="/people/$personId"
              params={{ personId: p.slug }}
              className={cls}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
