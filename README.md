# 🦕 smllr 

[![npm version](https://badge.fury.io/js/smllr.svg)](https://www.npmjs.com/package/smllr)

Frontend framework

> Work in progress - not ready for production 🚧

```ts
const Counter = cmp(($) => {
  const count = $.state(0);
  const doubleCount = $.computed(() => count.value * 2);

  return [
    htm("div", null, "Count is: ", () => count.value),
    htm("div", null, "Double count is: ", () => doubleCount.value),
    htm(
      "button",
      {
        onClick: () => {
          count.value++;
        },
      },
      "+"
    ),
  ];
});
```
