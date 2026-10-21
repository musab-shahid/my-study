# Content drafts (Phase E)

AI or human **drafts** live here. Nothing in this folder is loaded by the app.

## Workflow

1. Export one source question as JSON.
2. `node scripts/generate-variant-drafts.mjs prompt --stdin < source.json`
3. Paste into your model (or `generate` if `OPENAI_API_KEY` is set).
4. Save draft JSON here.
5. `node scripts/generate-variant-drafts.mjs validate content-drafts/my-draft.json`
6. Human checklist → set `"status": "approved"` only when clean.
7. **Manually** paste into `questions-*.ts` and set `variantGroupId` on source + variants.

Never point the runtime bank at this folder.
