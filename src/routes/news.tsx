import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import heroBg from "@/assets/art-network.jpg";
import { newsItems } from "@/lib/lab-data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Newsroom — DDOmics Lab" },
      {
        name: "description",
        content:
          "Publication alerts, career notifications, announcements and media coverage from the DDOmics Lab microbiome group at NCCS Pune.",
      },
      { property: "og:title", content: "Newsroom — DDOmics Lab" },
      {
        property: "og:description",
        content:
          "Publication alerts, career notifications, announcements and media coverage from the DDOmics Lab at NCCS Pune.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

const sections = [
  {
    to: "/news/publications" as const,
    title: "Publications",
    body: "Alerts for new peer-reviewed papers as they come out of the lab.",
    category: "Publication" as const,
  },
  {
    to: "/news/career-notifications" as const,
    title: "Career Notifications",
    body: "Openings for positions and studentships in the lab.",
    category: "Career Notification" as const,
  },
  {
    to: "/news/announcements" as const,
    title: "Announcements",
    body: "Grants, awards, collaborations and other lab news.",
    category: "Announcements" as const,
  },
  {
    to: "/news/media" as const,
    title: "Media",
    body: "Press coverage and media mentions of the lab's work.",
    category: "Media" as const,
  },
];

function NewsPage() {
  return (
    <>
      <PageHero
        image={heroBg}
        title={
          <>
            <em>Latest</em> News <em>&amp;</em> Media
          </>
        }
      />

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {sections.map((s, i) => {
              const count = newsItems.filter(
                (n) => n.category === s.category,
              ).length;
              return (
                <Reveal key={s.to} delay={Math.min(i * 80, 400)}>
                  <Link
                    to={s.to}
                    className="lift-card sheen group flex h-full flex-col border border-border bg-card p-10"
                  >
                    <h2 className="display-title text-2xl">{s.title}</h2>
                    <p className="measure mt-4 flex-1 leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                    <p className="eyebrow mt-8 text-primary">
                      {count} {count === 1 ? "item" : "items"}
                    </p>
                    <span className="eyebrow mt-6 text-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      View {s.title} →
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
