# map-stories

Scroll-driven map story (Mapbox Storytelling style) built on MapLibre GL, Vite and TypeScript.
No API key required: default basemap is OpenFreeMap Liberty.

## Run

```sh
pnpm install
pnpm dev
```

pnpm comes from corepack (`corepack pnpm`). A shim at `~/.local/bin/pnpm` forwards to it, and
`pnpm-workspace.yaml` holds the pnpm 11 settings (`allowBuilds`, `verifyDepsBeforeRun`).

## Edit the story

Everything lives in `src/story.ts`. Each chapter has:

| Field                              | Purpose                                         |
| ---------------------------------- | ----------------------------------------------- |
| `id`                               | unique, used as DOM id                          |
| `title`, `description`, `image`    | card content                                    |
| `alignment`                        | `left`, `right`, `center`, `full`               |
| `location`                         | `center [lng, lat]`, `zoom`, `pitch`, `bearing` |
| `mapAnimation`                     | `flyTo` (default), `easeTo`, `jumpTo`           |
| `rotateAnimation`                  | slow 180 degree rotation after arriving         |
| `onChapterEnter` / `onChapterExit` | `[{ layer, opacity, duration? }]`               |
| `hidden`                           | step still drives the map but card is invisible |

Site points live in `src/data/sites.json` and render as layers `sites` and `sites-label`.

## Basemap

Copy `.env.example` to `.env` and set `VITE_MAP_STYLE_URL` to any MapLibre-compatible style URL
(MapTiler, Stadia, Protomaps, self-hosted). Leave empty for OpenFreeMap.

## Scripts

`dev`, `build`, `preview`, `lint`, `format`, `typecheck`, `test`.
