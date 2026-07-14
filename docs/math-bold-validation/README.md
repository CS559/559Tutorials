# Math-bold-in-Chromium: validation on this site's real content

**Status: confirmed present, not fixed here.** This is the validation
write-up for a known, deferred 559Theme issue — full investigation,
root-cause analysis, and the recommended fix live in the theme itself at
[`themes/559Theme/docs/math-bold-research/README.md`](../../themes/559Theme/docs/math-bold-research/README.md).
This document does not repeat that analysis. It records that the bug
reproduces on this site's actual math content (not just the theme's
synthetic test rigs), how that was confirmed, and where to find good
examples for a future fix-it session.

## The problem, in one paragraph

Math renders at build time via Hugo's `transform.ToMath` (KaTeX), output as
MathML. Structurally this renders correctly with no CSS/JS/fonts needed.
The one failure: `\mathbf{...}` / `\boldsymbol{...}` render at **normal**
weight in Chromium (and Chromium-family browsers), because Chromium's
MathML Core implementation ignores the `mathvariant="bold"` attribute KaTeX
emits. Firefox honors the attribute and renders correct bold. See the
theme doc above for why, what was tried, and the recommended fix (Unicode
Mathematical-Alphanumeric substitution at build time).

## Why this site

This site has the theme's best collection of real `\mathbf`/`\boldsymbol`
usage — the splines/curves tutorial content, written independently of this
bug, not as a test case for it:

- `content/splines/1/index.md`
- `content/splines/2/index.md`
- `content/splines/3/index.md`
- `content/splines/4/index.md`
- `content/splines/5/index.md`
- `content/splines/6-bez/index.md` (plus `new-bezier.tex`, a source doc, not
  rendered directly)
- `content/splines/6-bsp/index.md`

`content/splines/1/index.md`'s equation (2), `x, y = \mathbf{f}(t)`, was
used as the primary test subject below — it's simple (one bold glyph) and
easy to re-locate for future re-testing.

## Validation performed (2026-07-13/14)

Two independent methods, both against this site's actual rendered output
(not the theme's synthetic rigs), using a local `hugo server` and Playwright
(Chromium) / headless Firefox:

### Chromium: DOM measurement

Rather than screenshots (Playwright's screenshot tool reliably times out in
this environment — see "Tooling note" below), the check compared the bold
and plain renderings of the same glyph directly in the DOM:

```js
// on content/splines/1/, comparing the bold "f" in equation (2)
// against a plain (non-bold) "f" elsewhere on the page
{
  boldF:  { fontWeight: "400", fontFamily: "math" },  // <mi mathvariant="bold">f</mi>
  plainF: { fontWeight: "400", fontFamily: "math" },  // <mi>f</mi>
}
// getBoundingClientRect().width: both 10.15625px, byte-identical
```

Both the computed `font-weight` and the rendered glyph width are
**identical** between the bold and plain glyph. Chromium is not applying
any visual distinction for `mathvariant="bold"` — confirming the theme
doc's finding, now on this site's real content rather than a test rig.

### Firefox: screenshot

Headless Firefox (`firefox --headless --screenshot`, isolated profile so it
didn't disturb an already-open regular Firefox window) on the same page and
equation:

![Firefox correctly renders equation (2)'s bold f](img/firefox-splines1-eq2-bold.png)

The `f` in `x, y = **f**(t)` renders visibly bold, matching the weight of
the bold `(2)` equation-number label beside it — Firefox needs no fix.

### Conclusion

The bug is real and reproducible on this site's actual tutorial content, in
both directions (Chromium fails, Firefox is fine), matching the theme
research doc's findings exactly. This site is a good target for validating
whichever fix gets implemented (Path B: Unicode substitution, per the theme
doc's recommendation) — re-run both checks above against the same
equation after the fix lands, plus spot-check the other pages listed above
for glyph variety (the splines pages use bold Latin letters; check whether
any site content exercises bold Greek/script/other variants KaTeX supports,
since the fix's mapping-table completeness is the main risk called out in
the theme doc).

## Tooling note for whoever picks this up

Playwright's `browser_take_screenshot` (both full-page and per-element)
reliably hit a 5-second timeout at "waiting for fonts to load" / "waiting
for element to be stable" in this sandbox, seemingly regardless of server
state — retried after a dev-server restart with the same result. Likely an
outbound font-fetch (Google Fonts) that can't complete without network
access, blocking Playwright's internal font-ready wait. Two working
alternatives used here:

- DOM measurement via `browser_evaluate` (computed style + bounding-rect
  width) — no screenshot needed, and arguably more precise anyway.
- Headless Firefox's own `--screenshot` flag, run as a separate process
  (not through the Playwright MCP tool), which doesn't hit the same
  internal wait.

If a future session needs a Chromium *screenshot* specifically (not just
measurements), it may be worth pre-caching/self-hosting the Google Fonts
request the page makes, or testing in an environment with outbound network
access, before assuming the timeout is unfixable.
