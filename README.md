<img src="https://github.com/dusanjovanov/smlr/blob/main/logo.png?raw=true" width="300" />

[![npm version](https://badge.fury.io/js/smlr.svg)](https://www.npmjs.com/package/smlr)

Frontend framework

> Work in progress - not ready for production 🚧

```ts
import { render, component, htm } from "smlr";

const Counter = component(($) => {
  const count = $.state(0);
  const doubleCount = $.computed(() => count.value * 2);

  return [
    htm("div", { children: ["Count is: ", count] }),
    htm("div", { children: ["Double count is: ", doubleCount] }),
    htm("button", {
      on: {
        click: () => {
          count.value++;
        },
      },
      children: "+",
    }),
  ];
});

render(Counter(), container);
```
