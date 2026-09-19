import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import bgResearch from "@/assets/bg-research.jpg";
import { facilities, researchTracks } from "@/lib/lab-data";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — DDOmics Lab, NCCS Pune" },
      {
        name: "description",
        content:
          "Research at the DDOmics Lab: five active microbiome research tracks and the facilities that support them, at NCCS Pune.",
      },
      { property: "og:title", content: "Research — DDOmics Lab, NCCS Pune" },
      {
        property: "og:description",
        content:
          "Microbiome research tracks and facilities at the DDOmics Lab, NCCS Pune.",
      },
    ],
  }),
  component: ResearchPage,
});

const sections = [
  {
    to: "/research/domains" as const,
    eyebrow: "01 / Domains",
    title: "Research Domains",
    body: "Five active tracks spanning population cohorts, early life, viral surveillance and disease — from the Indian Human Microbiome Initiative to the gut–brain axis.",
    count: researchTracks.length,
    countLabel: "active tracks",
  },
  {
    to: "/research/facilities" as const,
    eyebrow: "02 / Facilities",
    title: "Facilities",
    body: "The instruments and workflows behind the work: anaerobic culture and isolation, sequencing and genomics, and the in-house bioinformatics compute cluster.",
    count: facilities.length,
    countLabel: "core facilities",
  },
];

function ResearchPage() {
  return (
    <>
      <PageHero
        image={bgResearch}
        focal="left"
        eyebrow="Research"
        title={
          <>
            Mapping <span className="silver-text">microbial communities</span>{" "}
            across populations, life stages and disease
          </>
        }
        lede="Our work moves between the bench and the cluster: anaerobic culture and isolation on one side, metagenomic and metabolomic analysis on the other."
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {sections.map((s, i) => (
              <Reveal key={s.to} delay={i * 90}>
                <Link
                  to={s.to}
                  className="lift-card sheen group flex h-full flex-col border border-border bg-card p-10"
                >
                  <span className="eyebrow text-muted-foreground">
                    {s.eyebrow}
                  </span>
                  <h2 className="display-title mt-4 text-2xl lg:text-3xl">
                    {s.title}
                  </h2>
                  <p className="measure mt-4 flex-1 leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                  <p className="eyebrow mt-8 text-primary">
                    {s.count} {s.countLabel}
                  </p>
                  <span className="eyebrow mt-6 text-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    View {s.title} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
