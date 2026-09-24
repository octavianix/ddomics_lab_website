// Canonical URL + JSON-LD structured data for each page, mounted once in the root route.
import { useRouterState } from "@tanstack/react-router";
import { lab, pi, people, publications } from "@/lib/lab-data";

// Update if the site moves to a custom domain; also update sitemap.xml + robots.txt.
const SITE_URL = "https://suyash007-1.github.io/ddomics_lab_website";

function stripBasePath(pathname: string) {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length) || "/";
  }
  return pathname;
}

export function SEO() {
  const rawPathname = useRouterState({ select: (s) => s.location.pathname });
  const pathname = stripBasePath(rawPathname);
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname.replace(/\/$/, "")}`;

  const orgId = `${SITE_URL}/#organization`;

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "ResearchOrganization",
      "@id": orgId,
      name: lab.name,
      alternateName: ["DDOmics Laboratory", "Dhotre Lab"],
      url: SITE_URL,
      email: lab.email,
      parentOrganization: {
        "@type": "CollegeOrUniversity",
        name: "National Centre for Cell Science",
        sameAs: "https://www.nccs.res.in",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: lab.city,
        addressCountry: "IN",
      },
      founder: { "@type": "Person", name: pi.name },
      sameAs: [lab.twitter].filter(Boolean),
    },
  ];

  if (pathname === "/") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: SITE_URL,
      name: `${lab.name} — NCCS Pune`,
      publisher: { "@id": orgId },
    });
  }

  if (pathname.startsWith("/dhiraj-dhotre")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/dhiraj-dhotre#person`,
      name: pi.name,
      jobTitle: pi.title,
      description: pi.about,
      worksFor: { "@id": orgId },
      url: `${SITE_URL}/dhiraj-dhotre`,
      // sameAs: [
      //   "https://scholar.google.com/citations?user=XXXXXXX",
      //   "https://orcid.org/0000-0000-0000-0000",
      //   "https://www.linkedin.com/in/...",
      // ],
    });
  }

  if (pathname === "/people") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: people.map((person, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Person",
          name: person.name,
          jobTitle: person.role,
          url: `${SITE_URL}${person.link ?? `/people/${person.slug}`}`,
        },
      })),
    });
  }

  if (pathname === "/publications") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Publications — DDOmics Lab",
      about: { "@id": orgId },
      hasPart: publications.slice(0, 20).map((p) => ({
        "@type": "ScholarlyArticle",
        headline: p.title,
        datePublished: String(p.year),
      })),
    });
  }

  return (
    <>
      <link rel="canonical" href={canonical} />
      {schemas.map((schema, i) => (
        <script
          key={`${pathname}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
