# 🍃 mint

Frontend framework

> Work in progress - not ready for production 🚧

```ts
const Counter = component(($) => {
  const count = $.state(0);
  const doubleCount = count.derive((v) => v * 2);

  return [
    h.div("Count is: ", count),
    h.div("Double count is: ", doubleCount),
    h.button({ onClick: () => count.value++ }),
  ];
});
```
