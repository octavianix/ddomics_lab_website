import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ProtectedImage } from "@/components/ProtectedImage";
import {
  alumni,
  people,
  type PersonExperience,
  type PersonEducation,
  type PersonPublication,
} from "@/lib/lab-data";
import iconInstagram from "@/assets/social/instagram.png";
import iconLinkedin from "@/assets/social/linkedin.png";
import iconOrcid from "@/assets/social/orcid.png";
import iconX from "@/assets/social/x.png";
import iconGithub from "@/assets/social/github.png";
import iconScholar from "@/assets/social/scholar.png";

export const Route = createFileRoute("/people/$personId")({
  loader: ({ params }) => {
    const person = [...people, ...alumni].find(
      (p) => p.slug === params.personId,
    );
    if (!person) throw notFound();
    return person;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.name} — DDOmics Lab, NCCS Pune`
          : "Profile — DDOmics Lab",
      },
      {
        name: "description",
        content:
          loaderData?.bio ??
          `${loaderData?.name ?? "Lab member"} at DDOmics Lab, NCCS Pune.`,
      },
    ],
  }),
  component: PersonProfilePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="eyebrow mb-4 text-muted-foreground">Not found</p>
      <h1 className="display-title text-3xl">This person isn't listed</h1>
      <Link
        to="/people"
        className="eyebrow sheen mt-8 inline-block border border-primary px-6 py-3 tracking-[0.12em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Back to People
      </Link>
    </div>
  ),
});

function initials(name: string) {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const socialLabels: Record<string, string> = {
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  scholar: "Google Scholar",
  orcid: "ORCID",
  github: "GitHub",
  website: "Website",
  instagram: "Instagram",
};

const socialIcons: Record<string, string> = {
  twitter: iconX,
  linkedin: iconLinkedin,
  orcid: iconOrcid,
  github: iconGithub,
  instagram: iconInstagram,
  scholar: iconScholar,
};

function PersonProfilePage() {
  const person = Route.useLoaderData();
  const socialEntries = person.socials
    ? (Object.entries(person.socials).filter(([, v]) => !!v) as [
        string,
        string,
      ][])
    : [];
  const hasTimeline =
    (person.experience && person.experience.length > 0) ||
    (person.education && person.education.length > 0);

  return (
    <>
      {/* Slim veil so the transparent site header stays legible, and a way back. */}
      <section className="hero-veil relative -mt-24 overflow-hidden pt-32 pb-8 text-deep-foreground lg:pt-36 lg:pb-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <Reveal>
            <Link
              to="/people"
              className="eyebrow sheen inline-flex items-center gap-2 border border-silver/40 px-4 py-2 text-xs tracking-[0.1em] uppercase opacity-80 transition-colors hover:border-silver hover:opacity-100"
            >
              ← Back to People
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Sticky-sidebar profile — identity stays pinned while the rest scrolls. */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-6 py-16 lg:grid-cols-[320px_1fr] lg:gap-14 lg:px-10 lg:py-20">
          {/* Sidebar */}
          <Reveal>
            <aside className="silver-frame sheen bg-card p-8 lg:sticky lg:top-28">
              <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden bg-muted">
                {person.photo ? (
                  <ProtectedImage
                    src={person.photo}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="display-title absolute inset-0 flex items-center justify-center text-4xl text-muted-foreground">
                    {initials(person.name)}
                  </span>
                )}
              </div>

              <h1 className="display-title text-2xl font-bold">
                {person.name}
              </h1>
              <p className="mt-1 font-display text-base font-bold text-primary">
                {person.group === "pi" ? "Principal Investigator" : person.role}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                DDOmics Lab, NCCS Pune
                {person.joinedYear ? ` · Joined ${person.joinedYear}` : ""}
              </p>

              {person.quote && (
                <blockquote className="mt-6 border-l-2 border-primary pl-4 font-display text-sm leading-relaxed text-muted-foreground italic">
                  “{person.quote}”
                </blockquote>
              )}

              {person.cvUrl && (
                <a
                  href={person.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow sheen mt-6 block border border-primary px-4 py-2.5 text-center text-xs tracking-[0.1em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Download CV
                </a>
              )}

              {socialEntries.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-6">
                  {socialEntries.map(([key, url]) =>
                    socialIcons[key] ? (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        title={socialLabels[key] ?? key}
                        aria-label={socialLabels[key] ?? key}
                        className="sheen h-10 w-10 shrink-0 overflow-hidden rounded-full border border-silver/50 transition-transform hover:scale-105 hover:border-silver"
                      >
                        <img
                          src={socialIcons[key]}
                          alt={socialLabels[key] ?? key}
                          className="h-full w-full object-cover"
                        />
                      </a>
                    ) : (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="eyebrow sheen border border-silver/50 px-4 py-2 text-xs tracking-[0.1em] uppercase transition-colors hover:border-silver"
                      >
                        {socialLabels[key] ?? key}
                      </a>
                    ),
                  )}
                </div>
              )}
            </aside>
          </Reveal>

          {/* Main content */}
          <div className="min-w-0 space-y-14 lg:space-y-16">
            <Reveal>
              <p className="eyebrow mb-3 text-primary opacity-90">About</p>
              <h2 className="display-title text-2xl lg:text-3xl">
                Biography
              </h2>
              <hr className="silver-rule mt-5 mb-6" />
              <p className="measure leading-relaxed text-muted-foreground">
                {person.bio ??
                  "This lab member hasn't shared a bio yet — check back soon."}
              </p>
            </Reveal>

            {person.researchFocus && (
              <Reveal>
                <p className="eyebrow mb-3 text-primary opacity-90">Focus</p>
                <h2 className="display-title text-2xl lg:text-3xl">
                  Research Focus
                </h2>
                <hr className="silver-rule mt-5 mb-6" />
                <p className="measure leading-relaxed text-muted-foreground">
                  {person.researchFocus}
                </p>
              </Reveal>
            )}

            {hasTimeline && (
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
                {person.experience && person.experience.length > 0 && (
                  <div>
                    <Reveal>
                      <p className="eyebrow mb-3 text-primary opacity-90">
                        Timeline
                      </p>
                      <h2 className="display-title text-2xl lg:text-3xl">
                        Experience
                      </h2>
                      <hr className="silver-rule mt-5 mb-8" />
                    </Reveal>
                    <ol className="relative border-l border-border pl-6">
                      {person.experience.map(
                        (e: PersonExperience, i: number) => (
                          <Reveal
                            as="li"
                            key={e.role + e.place}
                            delay={Math.min(i * 70, 400)}
                            className="group relative pb-8 last:pb-0"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute -left-[27px] top-2 h-2.5 w-2.5 rounded-full bg-silver transition-colors duration-300 group-hover:bg-primary"
                            />
                            <p className="font-display text-lg font-semibold">
                              {e.role}
                            </p>
                            {e.period && (
                              <p className="eyebrow text-primary">
                                {e.period}
                              </p>
                            )}
                            <p className="mt-1 text-sm text-muted-foreground">
                              {e.place}
                            </p>
                          </Reveal>
                        ),
                      )}
                    </ol>
                  </div>
                )}

                {(person.education?.length || person.awards?.length) && (
                  <div>
                    {person.education && person.education.length > 0 && (
                      <>
                        <Reveal>
                          <p className="eyebrow mb-3 text-primary opacity-90">
                            Background
                          </p>
                          <h2 className="display-title text-2xl lg:text-3xl">
                            Education
                          </h2>
                          <hr className="silver-rule mt-5 mb-8" />
                        </Reveal>
                        <ol className="relative border-l border-border pl-6">
                          {person.education.map(
                            (e: PersonEducation, i: number) => (
                              <Reveal
                                as="li"
                                key={e.degree}
                                delay={Math.min(i * 70, 400)}
                                className="group relative pb-8 last:pb-0"
                              >
                                <span
                                  aria-hidden="true"
                                  className="absolute -left-[27px] top-2 h-2.5 w-2.5 rounded-full bg-silver transition-colors duration-300 group-hover:bg-primary"
                                />
                                <p className="font-display text-lg font-semibold">
                                  {e.degree}
                                </p>
                                {e.period && (
                                  <p className="eyebrow text-primary">
                                    {e.period}
                                  </p>
                                )}
                                {e.place && (
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    {e.place}
                                  </p>
                                )}
                              </Reveal>
                            ),
                          )}
                        </ol>
                      </>
                    )}

                    {person.awards && person.awards.length > 0 && (
                      <Reveal
                        delay={120}
                        className={person.education?.length ? "mt-12" : ""}
                      >
                        <p className="eyebrow mb-3 text-primary opacity-90">
                          Recognition
                        </p>
                        <h2 className="display-title text-2xl lg:text-3xl">
                          Awards &amp; Fellowships
                        </h2>
                        <hr className="silver-rule mt-5 mb-6" />
                        <ul className="space-y-4">
                          {person.awards.map((a: string) => (
                            <li
                              key={a}
                              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 h-px w-5 shrink-0 bg-silver"
                              />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    )}
                  </div>
                )}
              </div>
            )}

            {person.publications && person.publications.length > 0 && (
              <div className="border-t border-border pt-14">
                <Reveal className="mb-8">
                  <h2 className="display-title text-2xl lg:text-3xl">
                    Selected Publications
                  </h2>
                </Reveal>
                <ul className="divide-y divide-border border-t border-b border-border">
                  {person.publications.map(
                    (p: PersonPublication, i: number) => (
                      <Reveal
                        as="li"
                        key={p.title}
                        delay={Math.min(i * 60, 400)}
                        className="py-6"
                      >
                        <a
                          href={p.doi ? `https://doi.org/${p.doi}` : undefined}
                          target={p.doi ? "_blank" : undefined}
                          rel={p.doi ? "noreferrer" : undefined}
                          className="group block"
                        >
                          <p className="font-display text-lg font-semibold leading-snug transition-opacity group-hover:opacity-60">
                            {p.title}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {[p.venue, p.year].filter(Boolean).join(", ")}
                          </p>
                        </a>
                      </Reveal>
                    ),
                  )}
                </ul>
              </div>
            )}

            {person.outsideLab && (
              <Reveal className="border-t border-border pt-14">
                <p className="eyebrow mb-3 text-primary opacity-90">
                  Beyond the Lab
                </p>
                <h2 className="display-title text-2xl lg:text-3xl">
                  Outside the Lab
                </h2>
                <hr className="silver-rule mt-5 mb-6" />
                <p className="measure leading-relaxed text-muted-foreground">
                  {person.outsideLab}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
