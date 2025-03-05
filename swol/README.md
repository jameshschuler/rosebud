# Features

## Check Ins

- Toggle check in display
- Show check ins in calendar

## Settings

- Toggle check in display(MMMM DD YYYY, MMMM DD, DD, etc.)

## PR Log

- Exercise list
- Add PR
- Edit PR
- Delete PR
- Search PRs?

## Achievements

- TODO

## Goal Tracker

- TODO

## Workout Timer

- TODO

## Misc

- Deploy to render
- PWA Support
- Mobile design / usability
- Tests
- landing page / login design
- implement circle cursor (should be a setting)
- non white background color
- Add one rep max tool
- Add barbell load calculator
- Goal Tracker

## Profile Setup / Onboarding

- Set check ins per week goal
- Each week this is completed counts towards some achievement

# Devlog

### 02/16/25

- [x] Deploy to render
- [x] Pick a font

### 03/1/25

- [x] Clean up anon design (landing page / login design)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
