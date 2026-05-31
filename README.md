# native-viewport-transitions

A showcase of native-feel page transitions built entirely in the browser — no native code, no app store. Just React, Vite, and Motion.

**[Live Demo →](https://native-viewport-transitions.netlify.app)**

---

## What is this?

Modern mobile apps have a visual language that the web has always struggled to replicate — pages that slide, stack, rise, and fall with the kind of physicality that makes navigation feel natural. This project is an attempt to close that gap.

Every transition in this demo is implemented purely in React using [Motion](https://motion.dev). No CSS hacks, no native WebView bridges, no React Native. Just a browser.

---

## Transitions

| Name | Description |
|---|---|
| `stack` | New page slides up from the bottom, previous page scales down and dims behind it. iOS push navigation. |
| `push` | Pages slide horizontally. Both pages animate simultaneously — one out, one in. |
| `rise` | Incoming page rises from 60% of the screen with a fade, previous page pulls back. Android Material You style. |
| `fall` | Current page pulls down 15vh and disappears, incoming page drops subtly into place. |
| `flash` | Quick cross-fade between pages. Clean and fast. |
| `card` | Incoming page slides up as a card stopping at 3% from the top, previous page scales down and gets rounded behind it. iOS sheet presentation. |

All transitions support a `reverse` direction for backward navigation.

---

## How it works

The core idea is to replicate the routing of native platforms and give it to a `TransitionManager` component that holds both the previous and current page in state simultaneously — so both are mounted and visible during the animation.

```
navigate("/next")
    ↓
setTransition({ effect: "stack" })   // set before navigating
    ↓
TransitionManager detects route change
    ↓
captures prev + current page + effect atomically
    ↓
renders both pages with the chosen transition
    ↓
animation plays, lock releases
```

A Zustand store holds the current transition effect and a lock that prevents navigation during an active animation.

---

## Tech stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [React Router](https://reactrouter.com)
- [Motion](https://motion.dev)
- [Zustand](https://zustand-demo.pmnd.rs)
- [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Netlify](https://netlify.com)

---

## Running locally

```bash
git clone https://github.com/danoweibo/native-viewport-transitions
cd native-viewport-transitions
pnpm install
pnpm dev
```

Opens on `http://localhost:3000`.

---

## Project structure

```
src/
├── components/
│   └── transitions/
│       ├── index.tsx        # TransitionManager
│       ├── stack.tsx
│       ├── push.tsx
│       ├── rise.tsx
│       ├── fall.tsx
│       ├── flash.tsx
│       ├── card.tsx
│       └── none.tsx
├── contexts/
│   ├── transitions.ts       # Zustand store + lock
│   └── platform.ts          # iOS / Android / other detection
├── hooks/
│   └── use-platform.ts
├── lib/
│   └── animation.ts         # anim() helper for Motion variants
├── routes/
│   └── router.ts            # Route map
└── screens/
    ├── index.tsx            # Initial screen
    └── next.tsx             # Destination screen
```

---

## License

MIT