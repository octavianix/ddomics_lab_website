import { createFileRoute, redirect } from "@tanstack/react-router";

// The bare "/research" hub is retired — the top-level nav link and any old
// bookmarks to this path now go straight to Research Domains.
export const Route = createFileRoute("/research")({
  beforeLoad: () => {
    throw redirect({ to: "/research/domains" });
  },
});
