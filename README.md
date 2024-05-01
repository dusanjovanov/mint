<img src="https://github.com/dusanjovanov/smlr/blob/main/logo.png?raw=true" width="300" />

[![npm version](https://badge.fury.io/js/smlr.svg)](https://www.npmjs.com/package/smlr)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/smlr)

Frontend framework

> Work in progress - not ready for production 🚧

```ts
import { render, cp, htm, signal, computed } from "smlr";

const Counter = cp(() => {
  const count = signal(0);
  const doubleCount = computed(() => count.value * 2);

  return [
    htm("div", { node: ["Count is: ", () => count.value] }),
    htm("div", { node: ["Double count is: ", () => doubleCount.value] }),
    htm("button", {
      onClick: () => {
        count.value++;
      },
      node: "+",
    }),
  ];
});

render(Counter(), container);
```
