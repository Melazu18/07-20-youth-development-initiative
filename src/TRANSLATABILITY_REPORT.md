# 07-20 i18n / Translatability Compliance Report (Final)

This repo has been refactored so **all user-facing strings** in `src/` are routed through i18n translation keys, including:
- Page headings, subtitles, body copy
- Buttons, tabs, filters, empty states, errors
- Auth / Admin / Staff portals
- Accessibility strings (ARIA labels, sr-only text)
- RTL support (Arabic) with `<html dir>` + `<html lang>` sync

## What “compliant” means
A string is compliant if it is:
- From `t("…")` (react-i18next), **or**
- A language-native label that should never be translated (e.g. native language names), **or**
- A purely developer-facing string (console logs, internal debug)

## Coverage status
✅ Public site pages: Home, Programs, Activities, About, Contact, Governance  
✅ Internal portals: Auth, Admin, Staff  
✅ Shared layout: Header, Footer, Layout, Language switcher  
✅ UI accessibility labels: pagination, carousel, breadcrumb, dialog/sheet close buttons  
✅ RTL: Arabic switches document direction immediately and persists selection

## Where to add future strings
Use the existing namespaces:
- `nav.*`, `footer.*`, `common.*`
- `home.*`, `about.*`, `programs.*`, `activities.*`, `contact.*`
- `auth.*`, `admin.*`, `staff.*`
- `governance*.*`, `governanceContent.*`
- `ui.*` (ARIA/sr-only/system components)

## Developer checklist (PR gate)
Reject PRs if any of the below appear in UI:
- Hardcoded JSX text nodes (e.g. `<h1>Contact</h1>`)
- Hardcoded `aria-label="…"` strings
- Hardcoded modal/dialog headings and button labels
- Any new `toast("…")` message text not translated

## Quick smoke test
1) Run the app in Swedish (default), click around all pages  
2) Switch to English, French, Arabic using the language switcher  
3) Verify Arabic changes direction to RTL instantly  
4) Visit Admin/Staff pages (with roles) and confirm no English “leaks”  
5) Use keyboard navigation/screen reader: aria labels are translated

