import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import bgResearch from "@/assets/bg-research.jpg";
import { researchTracks } from "@/lib/lab-data";

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

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {researchTracks.map((t, i) => (
          <Reveal
            as="section"
            key={t.code}
            className="grid grid-cols-1 gap-8 border-b border-border py-10 lg:grid-cols-12 lg:items-center lg:py-14"
          >
            <div className="lg:col-span-4">
              <div className="art-tile aspect-[4/3] w-full overflow-hidden border border-border">
                <img
                  src={t.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <span className="eyebrow text-muted-foreground">
                {String(i + 1).padStart(2, "0")} / {t.code}
              </span>
              <h2 className="display-title mt-4 text-2xl lg:text-3xl">
                {t.title}
              </h2>
              <p className="measure mt-4 leading-relaxed text-muted-foreground">
                {t.summary}
              </p>
              <Link
                to="/research/$trackSlug"
                params={{ trackSlug: t.slug }}
                className="eyebrow mt-6 inline-block text-primary"
              >
                Explore this work →
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
