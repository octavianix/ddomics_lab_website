import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ProtectedImage } from "@/components/ProtectedImage";
import { lab, pi, publications } from "@/lib/lab-data";
import iconGmail from "@/assets/social/gmail.png";
import iconLinkedin from "@/assets/social/linkedin.png";
import iconGithub from "@/assets/social/github.png";
import iconOrcid from "@/assets/social/orcid.png";
import iconScholar from "@/assets/social/scholar.png";

const socialLabels: Record<string, string> = {
  linkedin: "LinkedIn",
  scholar: "Google Scholar",
  github: "GitHub",
  orcid: "ORCID",
};

const socialIcons: Record<string, string> = {
  linkedin: iconLinkedin,
  github: iconGithub,
  orcid: iconOrcid,
  scholar: iconScholar,
};

export const Route = createFileRoute("/dhiraj-dhotre")({
  head: () => ({
    meta: [
      { title: "Dr. Dhiraj Dhotre — Principal Investigator, DDOmics Lab" },
      {
        name: "description",
        content:
          "Dr. Dhiraj Dhotre, Scientist 'E' at NCCS Pune, is a bioinformatician studying the human microbiome in health and disease through genomics, metabolomics and culturomics.",
      },
      {
        property: "og:title",
        content: "Dr. Dhiraj Dhotre — Principal Investigator, DDOmics Lab",
      },
      {
        property: "og:description",
        content:
          "Bioinformatician and microbiome scientist at the National Centre for Cell Science, Pune.",
      },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: PIPage,
});

function PIPage() {
  const selected = publications.filter((p) => p.selected);
  const socialEntries = pi.socials
    ? (Object.entries(pi.socials).filter(([, v]) => !!v) as [
        string,
        string,
      ][])
    : [];

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
                <ProtectedImage
                  src={pi.photo}
                  alt={pi.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <h1 className="display-title text-2xl font-bold">{pi.name}</h1>
              <p className="mt-1 font-display text-base font-bold text-primary">
                {pi.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {pi.institute}
              </p>

              <a
                href={`mailto:${lab.email}`}
                className="eyebrow sheen mt-6 flex items-center justify-center gap-2 border border-primary px-4 py-2.5 text-center text-xs tracking-[0.1em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <img src={iconGmail} alt="" className="h-4 w-4 rounded-sm" />
                Email the PI
              </a>
              <Link
                to="/publications"
                className="eyebrow sheen mt-3 block border border-silver/50 px-4 py-2.5 text-center text-xs tracking-[0.1em] uppercase transition-colors hover:border-silver"
              >
                Publications
              </Link>

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
                {pi.about}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
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
                  {pi.experience.map((e, i) => (
                    <Reveal
                      as="li"
                      key={e.role + e.period}
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
                      <p className="eyebrow text-primary">{e.period}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {e.place}
                      </p>
                    </Reveal>
                  ))}
                </ol>
              </div>

              <div>
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
                  {pi.education.map((e, i) => (
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
                      <p className="eyebrow text-primary">{e.period}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {e.place}
                      </p>
                    </Reveal>
                  ))}
                </ol>

                <Reveal delay={120} className="mt-12">
                  <p className="eyebrow mb-3 text-primary opacity-90">
                    Recognition
                  </p>
                  <h2 className="display-title text-2xl lg:text-3xl">
                    Awards
                  </h2>
                  <hr className="silver-rule mt-5 mb-6" />
                  <ul className="space-y-4">
                    {pi.awards.map((a) => (
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
              </div>
            </div>

            <div className="border-t border-border pt-14">
              <Reveal className="mb-8">
                <h2 className="display-title text-2xl lg:text-3xl">
                  Books, Chapters &amp; Reports
                </h2>
              </Reveal>
              <ul className="divide-y divide-border border-t border-b border-border">
                {pi.bookChapters.map((b, i) => (
                  <Reveal
                    as="li"
                    key={b.title}
                    delay={Math.min(i * 60, 400)}
                    className="py-6"
                  >
                    <p className="font-display text-lg font-semibold leading-snug">
                      {b.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {b.authors}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {b.publisher}, {b.year}
                    </p>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-14">
              <Reveal className="mb-8">
                <h2 className="display-title text-2xl lg:text-3xl">
                  Selected publications
                </h2>
              </Reveal>
              <ul className="divide-y divide-border border-t border-b border-border">
                {selected.map((p, i) => (
                  <Reveal
                    as="li"
                    key={p.title}
                    delay={Math.min(i * 60, 400)}
                    className="py-6"
                  >
                    <a
                      href={p.doi ? `https://doi.org/${p.doi}` : undefined}
                      target="_blank"
                      rel="noreferrer"
                      className="group block"
                    >
                      <p className="font-display text-lg font-semibold transition-opacity group-hover:opacity-60">
                        {p.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {p.venue}, {p.year}
                      </p>
                    </a>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
