import { Link } from "@tanstack/react-router";
import { ProtectedImage } from "@/components/ProtectedImage";
import { people, type Person } from "@/lib/lab-data";

// Fixed order for the homepage team strip (not the full People page order).
// Puja Ghosh currently has no `photo` on her lab-data.ts entry — restore her
// photo import there (see the note left in that file) so her card isn't blank.
const STRIP_SLUGS = [
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

// Static row of team cards — same round-photo + name/role concept as the
// People page's PersonCard, sized identically (w-36 circular photo). No
// animation: the row wraps on narrow screens instead of scrolling.
export function TeamMarquee() {
  const bySlug = new Map(people.map((p) => [p.slug, p]));
  const items = STRIP_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is Person => Boolean(p),
  );

  return (
    <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-6 px-6">
      {items.map((p) => {
        const card = (
          <>
            <div className="fluid-overlay relative flex aspect-square w-36 items-center justify-center overflow-hidden rounded-full bg-muted ring-1 ring-silver/30 transition-all duration-500 group-hover:ring-primary">
              {p.photo ? (
                <ProtectedImage
                  src={p.photo}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <span className="display-title text-3xl text-muted-foreground transition-transform duration-500 group-hover:scale-110">
                  {initials(p.name)}
                </span>
              )}
            </div>
            <div>
              <h3 className="display-title text-xl leading-tight">
                {p.name}
              </h3>
              <p className="mt-1 font-display text-base font-semibold text-primary">
                {p.role}
              </p>
            </div>
          </>
        );
        const cls =
          "lift-card sheen group flex w-44 flex-col items-center gap-5 border border-border bg-card p-6 text-center";

        return p.link ? (
          <Link key={p.slug} to="/dhiraj-dhotre" className={cls}>
            {card}
          </Link>
        ) : (
          <Link
            key={p.slug}
            to="/people/$personId"
            params={{ personId: p.slug }}
            className={cls}
          >
            {card}
          </Link>
        );
      })}
    </div>
  );
}
