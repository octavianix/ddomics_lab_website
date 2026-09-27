import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import bgPublications from "@/assets/bg-publications.jpg";
import {
  publications,
  featuredPublications,
  publicationTopics,
} from "@/lib/lab-data";

const profileLinks = [
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?hl=en&user=wURU1tQAAAAJ",
  },
  {
    label: "Scopus",
    href: "https://www.scopus.com/results/authorNamesList.uri?query=Dhiraj%20Dhotre",
  },
  {
    label: "ORCID",
    href: "https://orcid.org/0000-0002-5000-7396",
  },
] as const;

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — DDOmics Lab, NCCS Pune" },
      {
        name: "description",
        content:
          "Featured studies and the full list of peer-reviewed publications from the DDOmics Lab on gut, oral and skin microbiomes, gluten disorders and Indian population cohorts.",
      },
      {
        property: "og:title",
        content: "Publications — DDOmics Lab, NCCS Pune",
      },
      {
        property: "og:description",
        content:
          "Featured studies and complete publication list from the DDOmics Lab at NCCS Pune.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublicationsPage,
});

function PublicationsPage() {
  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [],
  );
  const [year, setYear] = useState<"all" | number>("all");

  const filtered = useMemo(
    () =>
      year === "all"
        ? publications
        : publications.filter((p) => p.year === year),
    [year],
  );

  return (
    <>
      <PageHero
        image={bgPublications}
        eyebrow="Publications"
        height="short"
        title={
          <>
            Papers from <span className="silver-text">the lab</span>
          </>
        }
        lede="Featured studies, followed by the complete list. Each entry links out to the publisher via DOI."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          {/* Featured Publications */}
          <Reveal>
            <h2 className="display-title text-2xl lg:text-3xl">
              Featured Publications
            </h2>
          </Reveal>

          <Reveal delay={60} className="mt-8 text-center">
            <a
              href="https://scholar.google.com/citations?hl=en&user=wURU1tQAAAAJ"
              target="_blank"
              rel="noreferrer"
              className="sheen inline-block bg-primary px-[50px] py-[16px] text-[20px] font-bold tracking-[0.08em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              For a complete list, find us on Google Scholar
            </a>
          </Reveal>

          <Reveal
            delay={100}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm"
          >
            {profileLinks.map((link, i) => (
              <span key={link.label} className="flex items-center gap-x-4">
                {i > 0 && (
                  <span aria-hidden="true" className="text-muted-foreground">
                    ·
                  </span>
                )}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </Reveal>

          <div className="mt-14 flex flex-wrap justify-center gap-[20px]">
            {featuredPublications.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 80, 400)}>
                <article className="group flex h-[647.219px] w-[377.828px] flex-col overflow-hidden border border-border bg-card">
                  <div className="art-tile fluid-overlay aspect-[3/2] w-full shrink-0 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="line-clamp-6 text-[21.6752px] leading-snug transition-colors group-hover:text-primary">
                      {p.title}
                    </p>
                    <p className="mt-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
                      {p.authors} · <em>{p.venue}</em> ({p.year})
                    </p>
                    {p.doi && (
                      <a
                        href={`https://doi.org/${p.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="eyebrow sheen mt-6 inline-block w-fit bg-ink px-[45px] py-[14.4px] text-[18px] font-bold tracking-[0.08em] text-ink-foreground uppercase transition-opacity hover:opacity-90"
                      >
                        Read it
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* All Publications */}
          <div className="mt-28 border-t border-border pt-20 lg:mt-36 lg:pt-28">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <h2 className="display-title text-2xl lg:text-3xl">
                  All Publications
                </h2>
              </Reveal>
              <Reveal delay={60}>
                <label className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">Year</span>
                  <select
                    value={String(year)}
                    onChange={(e) =>
                      setYear(
                        e.target.value === "all"
                          ? "all"
                          : Number(e.target.value),
                      )
                    }
                    className="border border-border bg-background px-4 py-2 text-sm transition-colors hover:border-primary focus:border-primary focus:outline-none"
                  >
                    <option value="all">All years</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </label>
              </Reveal>
            </div>

            {publicationTopics.map((topic) => {
              const items = filtered.filter((p) => p.topic === topic);
              if (items.length === 0) return null;
              return (
                <section key={topic} className="mb-16">
                  <Reveal>
                    <h3 className="display-title text-2xl text-primary">
                      {topic}
                    </h3>
                  </Reveal>
                  <ul className="mt-6 divide-y divide-border border-t border-border">
                    {items.map((p, i) => (
                      <Reveal
                        as="li"
                        key={p.title}
                        delay={Math.min(i * 50, 400)}
                        className="py-6"
                      >
                        <p className="leading-relaxed">
                          <span className="text-muted-foreground">
                            {p.authors}
                          </span>{" "}
                          ({p.year}).{" "}
                          <span className="font-medium">{p.title}</span>{" "}
                          <em className="text-muted-foreground">{p.venue}</em>.
                        </p>
                        {p.doi && (
                          <a
                            href={`https://doi.org/${p.doi}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block font-mono text-xs text-primary underline-offset-4 hover:underline"
                          >
                            https://doi.org/{p.doi}
                          </a>
                        )}
                      </Reveal>
                    ))}
                  </ul>
                </section>
              );
            })}

            {filtered.length === 0 && (
              <p className="text-muted-foreground">
                No publications listed for {String(year)}.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
