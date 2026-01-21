# Data Model

This document defines the static JSON structure used by the learning site.

## Conventions
- Bilingual fields use `_zh` / `_en` suffixes.
- IDs use kebab-case (e.g., `parsing-cleaning`).
- Lists should be arrays, even if only one item exists.

## data/modules.json
Array of module objects.

Required module fields:
- `id`
- `title_zh`, `title_en`
- `time_estimate`
- `concepts` (array)
- `exercises` (array)
- `projects` (array)

Concept object (recommended):
- `id`
- `title_zh`, `title_en`
- `summary_zh`, `summary_en`
- `pitfalls_zh`, `pitfalls_en`
- `use_cases_zh`, `use_cases_en`
- `terms`: array of `{ zh, en }`

Exercise object (recommended):
- `id`
- `title_zh`, `title_en`
- `prompt_zh`, `prompt_en`
- `input_example`, `output_example`
- `hints_zh`, `hints_en`

Project object (recommended):
- `id`
- `type`: `practical` or `technical`
- `title_zh`, `title_en`
- `requirements_zh`, `requirements_en` (arrays)
- `acceptance_zh`, `acceptance_en` (arrays)
- `challenges_zh`, `challenges_en` (arrays)
- `extensions_zh`, `extensions_en` (arrays)

## data/quizzes.json
Array of quiz objects.

Required quiz fields:
- `module_id` (must match a module `id`)
- `items` array

Quiz item (recommended):
- `id`
- `question_zh`, `question_en`
- `options_zh`, `options_en`
- `answer` (index)
- `explanation_zh`, `explanation_en`

## data/rubrics.json
Object with `dimensions` array.

Required dimensions:
- `completion`
- `structure`
- `robustness`
- `data_quality`
- `documentation`

Dimension object (recommended):
- `id`
- `title_zh`, `title_en`
- `levels`: array of `{ score, desc_zh, desc_en }`