# Development dependency security

`@typescript-eslint/typescript-estree@8.72.1` requests minimatch 10, which is
affected by GHSA-g3hv-75wg-m249. The package.json override selects the patched
minimatch 11.0.1 only for this parser version. Other minimatch consumers retain
their own compatible versions.

The parser uses the named `minimatch(path, pattern, { dot: true })` function in
`useProgramFromProjectService`; it does not use the APIs removed in minimatch 11.
Node.js 24 is supported by the replacement. Validate lint, tests, formatting and
the production build after changing this override.

Remove the override when an upstream parser release depends on a patched
minimatch version. Do not downgrade eslint-config-next to Next.js 15 merely to
satisfy npm audit's automatic recommendation.

References:

- https://github.com/advisories/GHSA-g3hv-75wg-m249
- https://github.com/isaacs/minimatch/blob/v11.0.1/changelog.md
