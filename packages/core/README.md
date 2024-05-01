## @smlr/core

Frontend framework

> Work in progress - not ready for production 🚧

```ts
import { render, cp, htm, signal, computed } from "@smlr/core";

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
