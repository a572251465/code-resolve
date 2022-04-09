# Defining a Store

Before diving into core concepts, we need to know that a store is defined using `defineStore()` and that it requires a **unique** name, passed as the first argument:

```js
import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
  // other options...
})
```

This _name_, also referred as _id_, is necessary and is used by Pinia to connect the store to the devtools. Naming the returned function _use..._ is a convention across composables to make its usage idiomatic.

## Using the store

We are _defining_ a store because the store won't be created until `useStore()` is called inside of `setup()`:

```js
import { useStore } from '@/stores/counter'

export default {
  setup() {
    const store = useStore()

    return {
      // you can return the whole store instance to use it in the template
      store,
    }
  },
}
```

You can define as many stores as you want and **you should define each store in a different file** to get the most out of pinia (like automatically allow your bundle to code split and TypeScript inference).

If you are not using `setup` components yet, [you can still use Pinia with _map helpers_](../cookbook/options-api.md).

Once the store is instantiated, you can access any property defined in `state`, `getters`, and `actions` directly on the store. We will see these in detail in the next pages but autocompletion will help you.

Note that `store` is an object wrapped with `reactive`, meaning there is no need to write `.value` after getters but, like `props` in `setup`, **we cannot destructure it**:

```js
export default defineComponent({
  setup() {
    const store = useStore()
    // ❌ This won't work because it breaks reactivity
    // it's the same as destructuring from `props`
    const { name, doubleCount } = store

    name // "eduardo"
    doubleCount // 2

    return {
      // will always be "eduardo"
      name,
      // will always be 2
      doubleCount,
      // this one will be reactive
      doubleValue: computed(() => store.doubleCount),
      }
  },
})
```

In order to extract properties from the store while keeping its reactivity, you need to use `storeToRefs()`. It will create refs for any reactive property. This is useful when you are only using state from the store but not calling any action:
```js
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()
    // `name` and `doubleCount` are reactive refs
    // This will also create refs for properties added by plugins
    // but skip any action or non reactive (non ref/reactive) property
    const { name, doubleCount } = storeToRefs(store)

    return {
      name,
      doubleCount
    }
  },
})
```
