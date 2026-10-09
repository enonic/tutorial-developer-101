# Drafts

Pages kept outside the `docs/` build. The documentation generator only publishes `docs/`, so nothing here reaches the developer portal.

- `deployment/` — the "Deployment and next steps" chapter and its images, written against the XP 7 era Enonic Cloud console. It is parked until the self-service cloud for XP 8 is live, at which point it should be rewritten against the new flow and moved back into `docs/`.
- `iam/` — an unfinished XP 7 era chapter on identity providers, users, roles and permissions, with its images. It was never published. XP 8 changed authentication to resolve per virtual host, so it needs a rewrite before it is useful, and it belongs in the Developer 201 tutorial rather than here.

Pages in this folder still start with `include::.variables.adoc[]`; that include and their attribute references resolve only once they are back in `docs/`.
