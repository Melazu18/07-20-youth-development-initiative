# ESLint guardrail: prevent untranslated UI strings

Because ESLint config lives at the project root, these are **drop-in snippets** to add to your repo.

## Recommended plugins
```bash
npm i -D eslint-plugin-i18next eslint-plugin-react
```

## .eslintrc.cjs (snippet)
Add or merge:
```js
module.exports = {
  plugins: ["i18next"],
  rules: {
    // Forbid literal strings in JSX (except allowed attributes)
    "i18next/no-literal-string": [
      "error",
      {
        markupOnly: true,
        ignoreAttribute: [
          "data-testid",
          "data-test",
          "to",
          "href",
          "target",
          "rel",
          "id",
          "className",
          "type",
          "name",
          "value",
          "role",
        ],
        // allow small technical strings if needed
        ignoreCallee: ["cn"],
      },
    ],
  },
};
```

## Notes
- Keep **native language names** out of i18n (they are not translated).
- Console logs can remain literal strings.
- If you must add a literal for UX reasons, wrap it in `t(...)` and add keys to all locale files.

