import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import bgPublications from "@/assets/bg-publications.jpg";
import { publications, featuredPublications } from "@/lib/lab-data";

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

const sections = [
  {
    to: "/publications/featured" as const,
    title: "Featured Publications",
    body: "A selection of the lab's studies, presented with abstracts and cover imagery.",
    count: featuredPublications.length,
    countLabel: "featured studies",
  },
  {
    to: "/publications/all" as const,
    title: "All Publications",
    body: "The full, filterable list of peer-reviewed publications, grouped by research theme and year.",
    count: publications.length,
    countLabel: "publications",
  },
];

function PublicationsPage() {
  return (
    <>
      <PageHero
        image={bgPublications}
        height="short"
        title={
          <>
            Papers from <span className="silver-text">the lab</span>
          </>
        }
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {sections.map((s, i) => (
              <Reveal key={s.to} delay={Math.min(i * 90, 400)}>
                <Link
                  to={s.to}
                  className="lift-card sheen group flex h-full flex-col border border-border bg-card p-10"
                >
                  <h2 className="display-title text-2xl lg:text-3xl">
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
