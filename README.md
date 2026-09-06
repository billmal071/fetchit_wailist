This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Security

CI runs a **blocking** `Malware Scan` job (`scripts/ci/malware-scan.sh`) before
anything installs or builds. It scans this repo's own tracked source — not its
dependencies — for the obfuscated-loader malware that was committed to
`fetchit_fe` as `postcss.config.mjs` in April 2026 and executed at build time:

- the `global['!']` injector marker, in source, config **and** font files;
- `require` / `module` assigned into a global subscript, the trick used to keep
  a literal `require(` out of the obfuscated body;
- long runs of padding whitespace used to push a payload out of view;
- build/tool config files with an abnormally long line — the canonical shape
  here, a 20KB `postcss.config.mjs` that looks 94 bytes long.

Neither existing control can see this class of problem: `pnpm audit` (the
non-blocking `Security Audit` job) only knows about published dependencies, and
GitGuardian only looks for secrets. That is why this one is blocking and why
every job that installs or builds depends on it.

Run it locally with `./scripts/ci/malware-scan.sh`; pass file paths to scan
specific files, or `--self-test` to prove every rule still fires against a
synthetic fixture (CI runs that before the real scan, so a silently broken rule
fails the build instead of passing it).

On a pull request the job runs the **base branch's** copy of the scanner
against the PR's files, so a pull request cannot weaken the check that guards
it.

The script is byte-identical in `fetchit_be`, `fetchit_fe` and
`fetchit_wailist`, with `fetchit_be` holding the canonical copy. Change it
there, bump `SCANNER_VERSION`, then copy it verbatim to the other two. Every CI
run prints the version and the script's sha256, so drift between the three
repos shows up in any workflow log.

