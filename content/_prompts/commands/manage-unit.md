# Prompt - Manage Content Unit

Use this prompt for unit management operations on content units.

It supports:

```text
ACTION: create
ACTION: rename
ACTION: metadata-only
ACTION: delete
ACTION: split
ACTION: merge
ACTION: reorder
ACTION: move
```

It works for:

- official curriculum units;
- unofficial topics.

Both are content units. The difference is authority, metadata, folder location,
catalog placement, and mutation safety rules.

For official curriculum units, `content/programs/<TARGET_PROGRAM>/_curriculum-map.md`
is the canonical structure file. It owns official unit list, order, code,
folder, slug, title, domain, and official curriculum presence. Program
`_index.md` official-unit tables and unit `_index.md` identity fields are
derived copies.

For unofficial topics, do not edit `_curriculum-map.md`. The canonical
registration is the topic unit `_index.md`; `topics/_index.md` and any
program-index topic table are derived navigation views.

Do not leave duplicate entries, stale links, old names, alternate schemas, or
compatibility aliases behind.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_prompts/_shared/prompt-contract.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/core/content-validation.md`
- `content/_guides/exercises/exercise-structure.md` when the operation affects exercise workflow/dashboard references
- `content/_templates/unit-index-stub.template.md`
- `content/_templates/unit-index.template.md`

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Read `TARGET_CURRICULUM_MAP`.
- If the target is an official curriculum unit, treat the curriculum-map row as canonical and verify the unit `_index.md` repeated identity fields against it.
- If the target is an unofficial topic, treat the topic unit `_index.md` as canonical registration and verify derived catalog rows against it.
- Stop if the target is missing or ambiguous.

## Official Unit Identity Contract

Official unit identity is map-first.

The canonical official identity fields are:

- `TARGET_PROGRAM`, the owning program directory and program frontmatter `program`;
- the curriculum-map row in `content/programs/<TARGET_PROGRAM>/_curriculum-map.md`;
- `unit_order`;
- `unit_code`;
- `unit_slug`;
- `unit_folder`;
- `title`;
- `domain`;
- `official: true`;
- `content_scope: official-curriculum`;
- `unit_kind: official-curriculum-unit`.

Derived copies must match the map:

- unit `_index.md` frontmatter repeats the identity fields for local validation;
- content-object frontmatter repeats the parent unit identity fields;
- program `_index.md` official-unit rows are navigation only;
- guide and prompt examples are examples only.

Do not treat program `_index.md` as official curriculum authority.

`unit_code` is the ID component for unit and artifact IDs. Use lowercase ASCII
letters and digits only, starting with a letter. Do not use hyphens in
`unit_code`.

`unit_slug` is the slug component for the folder. Use lowercase ASCII slug
segments separated by hyphens.

For official units:

```text
unit_folder = <two-digit unit_order>-<unit_slug>
```

Example:

```text
unit_order: 7
unit_slug: fonction-exponentielle
unit_folder: 07-fonction-exponentielle
unit_code: fe
```

## Official Unit Ordering Contract

Official `unit_order` values must be contiguous positive integers starting at
`1`.

The row order in `_curriculum-map.md` must match `unit_order` exactly. Row 1 has
`Order` 1, row 2 has `Order` 2, and so on.

The numeric prefix of every official `unit_folder` must match `unit_order`.

Creating or moving an official unit into an occupied order is not auto-shifted.
Stop and require an explicit `ACTION: reorder`, `ACTION: split`, or
`ACTION: merge` plan that lists the final contiguous official order for the
affected block. The operator must not guess hidden shifts.

Deleting an official unit closes the order gap. All later official rows move
down by one order, and their numeric folder prefixes must be moved with them.

## Published ID Stability

For mutation safety, treat content as published when any affected unit index has
`planning_state: published` or `status: published`, or any affected lesson,
exercise, quiz, or set has `status: published`.

Before publication, destructive propagation is allowed when the requested
mutation requires it:

- unit-code changes may rewrite unpublished unit and artifact IDs;
- artifact filenames may be renamed to the new `unit_code`;
- planned IDs in unit design cards may be rewritten;
- folder paths and frontmatter may be rewritten.

After publication, stable public IDs must not be rewritten automatically.

Allowed after publication when explicitly requested:

- title-only rename;
- display-order reorder;
- folder slug/path move if `unit_code` and all frontmatter IDs remain stable and every link/path reference is updated.

Stop and escalate before doing any mutation that would rewrite, delete, or
retire a published ID. The operator must choose an explicit publication
migration plan. If an ID is retired, record it in
`content/_references/deleted-ids.md` before removing the file or old ID.

Initialized but unpublished content may still be destructively renamed.

## Deleted ID Registry

Do not reuse IDs after deletion.

This rule is enforced through `content/_references/deleted-ids.md`. Before
deleting or retiring any frontmatter `id`, add it to that registry with the
date, reason, and replacement if one exists.

The validator rejects any active frontmatter ID that appears in the deleted-ID
registry. It does not infer missing tombstones; mutation operators must record
them during delete, merge, split, and code-change operations.

## Reference Update Checklist

For every unit mutation, search and update references to old folders, codes,
IDs, slugs, titles, and paths as applicable.

Use targeted searches such as:

```bash
rg -n "old-folder|old-code|old-id|Old Title" AGENTS.md README.md content scripts
```

Check at least:

- curriculum-map rows;
- unit index frontmatter;
- unit index body and production dashboard;
- program `_index.md`;
- `topics/_index.md` when topics are involved;
- `related_units`;
- Markdown links;
- Obsidian wikilinks;
- lesson, exercise, quiz, and set frontmatter IDs and unit fields;
- lesson, exercise, quiz, and set filenames;
- exercise-set `exercise_ids`;
- planned IDs in unit design cards;
- prompt or guide references to specific unit paths, codes, or examples;
- `_workflow/current-unit.md` if it exists locally.

Validator-enforced references:

- curriculum-map order, row order, folders, slugs, titles, domains, and codes;
- official unit index identity against the curriculum map;
- official folder numeric prefixes and slug agreement;
- unit and artifact frontmatter against the containing unit;
- program and topic catalog rows against canonical sources;
- known `related_units` folders;
- exercise-set `exercise_ids` shape and matching exercise file presence;
- active IDs against the deleted-ID registry.

Manual-search references:

- prose mentions of old titles or codes;
- arbitrary Markdown links and wikilinks;
- design-card planned IDs inside unit-index body prose;
- guide and prompt examples that mention specific unit folders.

Do not claim the validator checks the manual-search items.

## Current-Unit Cache Handling

`content/_prompts/commands/set-current-unit.md` is the only normal producer and
rewriter of `_workflow/current-unit.md`.

For rename, metadata-only state changes, delete, split, merge, reorder, or move
operations:

- If `_workflow/current-unit.md` points to an affected unit, treat it as stale after the operation.
- Remove `_workflow/current-unit.md` only when it is visible and safe to remove.
- If it is not safe to remove, report that the user/operator must rerun `content/_prompts/commands/set-current-unit.md`.
- Do not synthesize a new canonical current-unit entry from the changed unit identity, path, order, or state.

## ACTION: create

Require or infer:

```text
TARGET_PROGRAM
UNIT_KIND
UNIT_TITLE
UNIT_SLUG
UNIT_CODE
UNIT_ORDER
DOMAIN
RELATED_UNITS
```

For official units:

1. Confirm `UNIT_KIND: official-curriculum-unit`, `OFFICIAL: true`, and `CONTENT_SCOPE: official-curriculum`.
2. Derive `UNIT_FOLDER` as `<two-digit UNIT_ORDER>-<UNIT_SLUG>`. Stop if the user supplied a conflicting folder.
3. Verify `UNIT_ORDER` is the next open contiguous order. If it is occupied or creates a gap, stop and require an explicit reorder plan.
4. Add the row to `content/programs/<TARGET_PROGRAM>/_curriculum-map.md` first, in row order.
5. Create `content/programs/<TARGET_PROGRAM>/<UNIT_FOLDER>/`.
6. Create the official stub from `content/_templates/unit-index-stub.template.md`.
7. Create artifact folders immediately, even for stubs:
   - `lessons/.gitkeep`;
   - `exercises/.gitkeep`;
   - `quizzes/.gitkeep`;
   - `sets/.gitkeep`.
8. Copy program metadata and curriculum-map identity fields into the unit `_index.md`.
9. Use current ISO dates for new real files. Keep `YYYY-MM-DD` only inside reusable templates or when deliberately matching an existing placeholder-only scaffold in the same program.
10. Regenerate the official-unit table in `content/programs/<TARGET_PROGRAM>/_index.md` from the curriculum map.
11. Update only examples that explicitly list affected unit codes or folders.
12. Run validation.

For unofficial topics:

1. Create the topic folder under `content/programs/<TARGET_PROGRAM>/topics/`.
2. Do not edit `_curriculum-map.md`.
3. Make the topic unit `_index.md` the canonical registration record.
4. Create the same four artifact folders with `.gitkeep`.
5. Regenerate `topics/_index.md` and any program-index topic rows.
6. Run validation.

Validation should catch duplicate or non-contiguous official order, wrong row
order, missing unit index, missing artifact folders, folder/frontmatter
mismatch, catalog mismatch, and invalid related-unit references.

## ACTION: rename

Resolve the existing unit by folder, code, title, or path.

Classify the rename before editing:

- title-only rename;
- slug/folder rename;
- code rename;
- mixed rename.

For official title-only rename:

1. Update only the `Title` cell in the curriculum-map row.
2. Update the unit `_index.md` `title` and H1.
3. Update program `_index.md` display text.
4. Update prose references to the old visible title when they are clearly references to this unit.
5. Do not rename folders, unit codes, filenames, or IDs.
6. Invalidate stale current-unit cache if it points to the renamed unit.
7. Run validation.

For official slug/folder rename:

1. Keep `unit_code` unchanged unless the user explicitly asked for a code rename.
2. Update `unit_slug` in the curriculum map.
3. Derive the new `unit_folder` from the unchanged `unit_order` and new slug.
4. Move the folder with `git mv`.
5. Update unit `_index.md` frontmatter and H1/body references.
6. Update artifact frontmatter `unit_slug` and `unit_folder`.
7. Update program `_index.md` and every path/link reference found by search.
8. Do not rewrite IDs merely because the folder path changed.
9. Invalidate stale current-unit cache if it points to the renamed unit.
10. Run validation.

For official code rename:

1. Check publication state first.
2. If any affected unit or artifact is published, stop. Do not automatically rewrite IDs.
3. If all affected content is unpublished, update the curriculum-map `Unit code`.
4. Update unit `_index.md` `unit_code` and `id`.
5. Rename artifact files to the new code prefix.
6. Rewrite unpublished artifact frontmatter IDs and `unit_code`.
7. Rewrite exercise-set `exercise_ids` and planned IDs in design cards.
8. Add retired IDs to `content/_references/deleted-ids.md` only when an old ID is no longer active.
9. Update all code and ID references found by search.
10. Invalidate stale current-unit cache if it points to the renamed unit.
11. Run validation.

For unofficial topics, apply the same title/slug/code split, but use the topic
unit `_index.md` as canonical registration and regenerate `topics/_index.md`
instead of editing `_curriculum-map.md`.

## ACTION: metadata-only

1. Resolve the unit.
2. Classify the requested metadata as official structure, topic registration, or unit-local planning/content state.
3. For official structure fields (`unit_order`, `unit_code`, `unit_folder`, `unit_slug`, `title`, `domain`, or official curriculum presence), update `_curriculum-map.md` first, then derived copies.
4. For official unit-local fields (`planning_state`, `status`, `sync_status`, `skills`, `related_units`, dashboard rows, journal notes, or author notes), update the unit `_index.md` and affected artifacts only; do not change `_curriculum-map.md`.
5. For unofficial topic identity fields, update the topic unit `_index.md` first, then derived topic catalogs.
6. Apply the published-ID stability rule before changing `unit_code` or any ID.
7. Search for stale references if the modified field affects links, IDs, folders, titles, ordering, or codes.
8. Invalidate stale current-unit cache when identity, path, order, or `planning_state` changed.
9. Run validation.

## ACTION: reorder

Use this action when official units stay official but their display/order changes.

Rules:

- Reorder changes `unit_order`, curriculum-map row order, and numeric folder prefixes.
- Reorder must not change `unit_code`, `unit_slug`, `title`, `domain`, or IDs.
- Reorder requires an explicit final contiguous order for the affected block or the full official-unit table.
- Do not infer hidden shifts from a single occupied target order.

For official units:

1. Resolve all units in the affected reorder block.
2. Confirm the final order is contiguous and has no duplicate `unit_order`.
3. Update `_curriculum-map.md` first so row order matches the final order.
4. Derive every affected `unit_folder` as `<two-digit order>-<existing slug>`.
5. Move folders with `git mv`. Use temporary folder names when direct swaps would collide.
6. Update unit `_index.md` `unit_order` and `unit_folder`.
7. Update artifact frontmatter `unit_order` and `unit_folder`.
8. Update program `_index.md` derived navigation.
9. Update markdown links, wikilinks, design-card path references, and prompt/guide examples that mention old folder paths.
10. Do not rewrite artifact IDs merely because display order changed.
11. Invalidate stale current-unit cache for affected units.
12. Run validation.

For unofficial topics, reorder only the topic section. Update topic unit
`unit_order`, `unit_folder` if the topic folder changes, `topics/_index.md`,
and program-index topic rows.

## ACTION: split

Use split only when one content unit should become multiple units.

Required inputs for official split:

```text
TARGET_UNIT
NEW_UNITS:
  - UNIT_TITLE
    UNIT_SLUG
    UNIT_CODE
    UNIT_ORDER
    DOMAIN
    ARTIFACT_ASSIGNMENT
FINAL_OFFICIAL_ORDER
```

Preconditions:

1. Resolve the source unit.
2. Inspect source publication state and authored artifact folders.
3. Stop if the source or any affected artifact is published and the split would rewrite, delete, or retire published IDs.
4. Require explicit final official rows for the new units and all shifted units in the affected block.
5. Require an artifact assignment plan when the source contains authored lessons, exercises, quizzes, or sets.

Official split behavior:

1. Replace the old curriculum-map row with the new official unit rows.
2. Keep one old `unit_code` only if the operator explicitly says which resulting unit is the semantic continuation.
3. Choose new unique codes for every other resulting unit.
4. Derive all folders from final order and slugs.
5. Create new unit folders and stub or initialized indexes as appropriate.
6. Move artifacts only when their destination is explicit or mechanically obvious from the assignment plan.
7. If assignment is unclear, stop with a human-decision list. Do not guess.
8. Rewrite IDs only for unpublished artifacts whose unit code changes.
9. Add retired unit and artifact IDs to `content/_references/deleted-ids.md`.
10. Update references from old folder, code, ID, title, and planned IDs.
11. Delete the old folder only after it is empty or after the user explicitly discards remaining content.
12. Invalidate stale current-unit cache if it points to the source or any resulting unit path.
13. Run validation.

For unofficial topic splits, do not edit `_curriculum-map.md`. Create new topic
registrations in their unit `_index.md` files and regenerate topic catalogs.

## ACTION: merge

Use merge only when multiple units should become one unit.

Required inputs:

```text
SOURCE_UNITS
SURVIVING_UNIT
SURVIVING_UNIT_TITLE
SURVIVING_UNIT_CODE
SURVIVING_UNIT_ORDER
SURVIVING_UNIT_SLUG
FINAL_OFFICIAL_ORDER
ARTIFACT_ASSIGNMENT
```

Preconditions:

1. Resolve all source units.
2. Require all source units to be in the same program.
3. For official merges, require all source units to be official.
4. Check publication state before moving or rewriting anything.
5. Stop if merge would rewrite, delete, or retire published IDs without an explicit publication migration plan.
6. Require explicit operator choice for the surviving code, title, slug, folder, and order.

Official merge behavior:

1. Update `_curriculum-map.md` first so it contains exactly the surviving official row and no stale source rows.
2. Close order gaps in the final official order.
3. Move or keep the surviving folder according to the derived final folder.
4. Move artifacts from retired source units into the surviving unit only when assignment is explicit.
5. Resolve filename and ID collisions before moving files.
6. For unpublished moved artifacts, rewrite filenames, IDs, `unit_code`, `unit_folder`, `unit_slug`, and `unit_order` to the survivor.
7. Add retired unit and artifact IDs to `content/_references/deleted-ids.md`.
8. Update `related_units`, markdown links, wikilinks, exercise-set `exercise_ids`, planned IDs in design cards, derived catalogs, guides, and prompt examples.
9. Delete retired source folders only after content is moved or explicitly discarded.
10. Invalidate stale current-unit cache for every source and survivor path.
11. Run validation.

For unofficial topic merges, update the destination topic unit `_index.md` as
canonical registration and regenerate topic catalogs; do not use
`_curriculum-map.md`.

## ACTION: delete

Resolve the unit first.

Deletion preconditions:

1. Inspect `_index.md` and all four artifact folders.
2. Classify the unit as empty/stub or authored.
3. List every frontmatter `id` that will disappear.
4. Check publication state.
5. Stop if deletion would retire published IDs without an explicit publication removal plan.

Empty/stub unit deletion:

1. Add the unit `_index.md` ID to `content/_references/deleted-ids.md`.
2. If official, remove its curriculum-map row.
3. If official, close the order gap by decrementing later official units and moving folder prefixes.
4. Delete the unit folder.
5. Regenerate program `_index.md` and topic catalogs if relevant.
6. Remove `related_units`, links, wikilinks, and examples that reference the deleted unit.
7. Invalidate stale current-unit cache if it points to the deleted unit.
8. Run validation.

Authored unit deletion:

1. Require explicit user instruction to delete the unit and its authored contents.
2. Add every deleted unit, lesson, exercise, quiz, and set ID to `content/_references/deleted-ids.md`.
3. Remove or update exercise-set `exercise_ids` and other references before deleting files.
4. If official, remove the curriculum-map row and close the order gap.
5. Delete the unit folder only after the reference cleanup and tombstones are in place.
6. Regenerate derived catalogs.
7. Invalidate stale current-unit cache if it points to the deleted unit.
8. Run validation.

Do not leave dead Obsidian links or old derived catalog rows.

## ACTION: move

Use this action when a unit changes section, for example from an unofficial topic
to an official curriculum unit, or from official curriculum to `topics/` after
the user confirms that it should no longer be official.

Required inputs:

```text
DESTINATION_UNIT_KIND
DESTINATION_OFFICIAL
DESTINATION_CONTENT_SCOPE
DESTINATION_UNIT_ORDER
DESTINATION_UNIT_SLUG
DESTINATION_UNIT_CODE
DESTINATION_DOMAIN
```

Rules:

1. Resolve the source unit.
2. Check publication state before changing `unit_code` or IDs.
3. If moving into official curriculum, add the canonical row to `_curriculum-map.md` first.
4. If moving out of official curriculum, remove the canonical row from `_curriculum-map.md` first and close the official order gap.
5. Reject occupied official destination orders unless the request includes an explicit final reorder plan.
6. Move the folder with `git mv`.
7. Update unit frontmatter, artifact frontmatter, derived catalogs, links, dashboards, guides, prompts, and examples.
8. Rewrite IDs only for unpublished content when the move changes `unit_code`.
9. Add retired IDs to `content/_references/deleted-ids.md`.
10. Invalidate stale current-unit cache for the old and new paths.
11. Do not keep the old section entry, alias, or duplicate unit folder.
12. Run validation.

## Examples

Example 1:

```text
ACTION: create
UNIT_KIND: unofficial-topic
OFFICIAL: false
UNIT_TITLE: "Methodes de calcul"
UNIT_SLUG: methodes-de-calcul
UNIT_CODE: mdc
UNIT_ORDER: 4
CONTENT_SCOPE: cross-chapter-method
DOMAIN: transversal
RELATED_UNITS:
- 01-limites-continuite
- 02-derivabilite-etude-fonctions
```

Example 2:

```text
ACTION: create
UNIT_KIND: official-curriculum-unit
OFFICIAL: true
UNIT_TITLE: "Limites"
UNIT_SLUG: limites
UNIT_CODE: lim
UNIT_ORDER: 13
CONTENT_SCOPE: official-curriculum
DOMAIN: analyse
RELATED_UNITS: []
```

Example 3:

```text
ACTION: rename
TARGET_UNIT: topics/methodes-de-calcul
NEW_UNIT_TITLE: "Techniques de calcul"
```

Example 4:

```text
ACTION: rename
TARGET_UNIT: 07-fonction-exponentielle
NEW_UNIT_SLUG: exponentielle
```

Example 5:

```text
ACTION: delete
TARGET_UNIT: topics/methodes-de-calcul
DELETE_CONTENT: yes
```

Example 6:

```text
ACTION: split
TARGET_UNIT: 01-limites-continuite
NEW_UNITS:
  - UNIT_TITLE: "Limites"
    UNIT_SLUG: limites
    UNIT_CODE: lim
    UNIT_ORDER: 1
    DOMAIN: analyse
    ARTIFACT_ASSIGNMENT: keep source artifacts that teach limits
  - UNIT_TITLE: "Continuite"
    UNIT_SLUG: continuite
    UNIT_CODE: cont
    UNIT_ORDER: 2
    DOMAIN: analyse
    ARTIFACT_ASSIGNMENT: move artifacts that teach continuity
FINAL_OFFICIAL_ORDER: explicit full affected block required
```

Example 7:

```text
ACTION: reorder
TARGET_PROGRAM: ma-2bac-pc-svt
FINAL_OFFICIAL_ORDER:
  1: 01-limites-continuite
  2: 02-derivabilite-etude-fonctions
  3: 07-fonction-exponentielle
  4: 03-suites-numeriques
```

## Final Response

Summarize:

- action performed;
- official-unit identity/order changes;
- files created;
- files deleted;
- IDs added to `content/_references/deleted-ids.md`;
- files renamed or moved;
- files modified;
- current-unit cache action or rerun requirement;
- validation result;
- unresolved human decisions.
