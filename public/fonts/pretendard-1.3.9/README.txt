Pretendard 1.3.9 variable dynamic subsets, self-hosted.

Upstream: https://github.com/orioncactus/pretendard/tree/v1.3.9
Source: packages/pretendard/dist/web/variable/woff2-dynamic-subset/
License: SIL Open Font License 1.1 (see LICENSE.txt).

The upstream font binaries are unchanged. app/pretendard.css preserves the
upstream unicode ranges and weight axis. Only the family alias (Pretendard)
and font URLs have been changed to keep existing styles and self-host assets.
All 92 slices are included so newly entered admin content can load its glyphs.
Do not preload every slice: the browser chooses slices for characters in use.

The previous static WOFF2 files are retained for compatibility with cached CSS.
