import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { ImageMarquee } from "@/components/ImageMarquee";
import { PersonCard } from "@/components/PersonCard";
import { alumni, groupBlurbs, people, labGroupPhoto } from "@/lib/lab-data";
import type { Person } from "@/lib/lab-data";

export const Route = createFileRoute("/people")({
  head: () => ({
    meta: [
      { title: "People — DDOmics Lab, NCCS Pune" },
      {
        name: "description",
        content:
          "Meet the DDOmics Lab team: principal investigator Dr. Dhiraj Dhotre, project scientists, Ph.D. students and technical staff at NCCS Pune.",
      },
      { property: "og:title", content: "People — DDOmics Lab, NCCS Pune" },
      {
        property: "og:description",
        content: "The scientists and students behind the DDOmics Lab.",
      },
    ],
  }),
  component: PeoplePage,
});

const groups = [
  { key: "pi", label: "Principal Investigator" },
  { key: "scientist", label: "Scientists" },
  { key: "student", label: "Ph.D. Students & Postdoctoral Fellow" },
  { key: "staff", label: "Technical & Project Staff" },
] as const;

// Alumni grid, collapsed to one row by default (measures rendered row
// height client-side so it adapts to the current column count).
function AlumniGrid({ alumni }: { alumni: Person[] }) {
  const [expanded, setExpanded] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const el = gridRef.current;
      if (!el) return;
      const items = Array.from(
        el.querySelectorAll<HTMLElement>("[data-alumni-card]"),
      );
      const firstItem = items[0];
      if (!firstItem) return;
      const firstTop = firstItem.offsetTop;
      let rowHeight = 0;
      let itemsInFirstRow = 0;
      for (const item of items) {
        if (item.offsetTop !== firstTop) break;
        rowHeight = Math.max(rowHeight, item.offsetHeight);
        itemsInFirstRow += 1;
      }
      setCollapsedHeight(rowHeight);
      setHasOverflow(itemsInFirstRow < items.length);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [alumni.length]);

  return (
    <div>
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-8 overflow-hidden transition-[max-height] duration-500 ease-out sm:grid-cols-2 lg:grid-cols-4"
        style={
          !expanded && collapsedHeight
            ? { maxHeight: `${collapsedHeight}px` }
            : undefined
        }
      >
        {alumni.map((a, i) => (
          <div data-alumni-card key={a.slug}>
            <Reveal delay={(i % 4) * 80}>
              <PersonCard p={a} />
            </Reveal>
          </div>
        ))}
      </div>
      {hasOverflow && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="eyebrow sheen inline-flex items-center gap-2 border border-silver/50 px-6 py-3 tracking-[0.12em] uppercase transition-colors hover:border-silver"
          >
            {expanded ? "Show less" : "Show all alumni"}
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className={`h-3.5 w-3.5 fill-current transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <path d="M5 7l5 5 5-5H5z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

function PeoplePage() {
  return (
    <>
      <section className="hero-veil relative -mt-24 min-h-[64vh] overflow-hidden text-deep-foreground">
        {/* Full-bleed lab group photo as the header background, in place of
            the smaller framed image this hero used to show alongside the text. */}
        <img
          src={labGroupPhoto}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--deep)_8%,color-mix(in_oklch,var(--deep)_60%,transparent)_55%,color-mix(in_oklch,var(--deep)_78%,transparent)_100%)]"
        />
        <div className="relative mx-auto flex min-h-[64vh] max-w-7xl flex-col justify-end px-6 pt-44 pb-16 lg:px-10 lg:pt-52 lg:pb-24" />
      </section>

      <section id="current-members" className="scroll-mt-24 bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          {groups.map((g) => {
            const members = people.filter((p) => p.group === g.key);
            if (members.length === 0) return null;
            const blurb = groupBlurbs[g.key];
            const soleMember = members.length === 1 ? members[0] : undefined;
            const showBlurb = !!soleMember && !!blurb;
            return (
              <div key={g.key} className="mb-20 last:mb-0">
                <Reveal>
                  <h2 className="display-title text-2xl">{g.label}</h2>
                  <hr className="silver-rule mt-5 mb-10" />
                </Reveal>
                {showBlurb && soleMember ? (
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <Reveal>
                      <PersonCard p={soleMember} />
                    </Reveal>
                    <Reveal
                      delay={80}
                      className="flex items-center sm:col-span-1 lg:col-span-3"
                    >
                      <p className="measure leading-relaxed text-muted-foreground">
                        {blurb}
                      </p>
                    </Reveal>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {members.map((p, i) => (
                      <Reveal key={p.slug} delay={(i % 4) * 80}>
                        <PersonCard p={p} />
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section id="alumni" className="scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <h2 className="display-title text-2xl sm:text-3xl">Alumni</h2>
            <hr className="silver-rule mt-5 mb-10" />
          </Reveal>
          <AlumniGrid alumni={alumni} />
        </div>
      </section>

      {/* People and profiles come first; the lab-life photo motion now runs
          at the very bottom of the page instead of at the top. */}
      <Reveal>
        <ImageMarquee />
      </Reveal>
    </>
  );
}
