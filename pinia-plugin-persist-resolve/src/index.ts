import { watch } from 'vue-demi'
import { PiniaPluginContext } from 'pinia'

export interface PersistStrategy {
  key?: string;
  storage?: Storage;
  paths?: string[];
}

export interface PersistOptions {
  enabled: true;
  strategies?: PersistStrategy[];
}

type Store = PiniaPluginContext['store'];
type PartialState = Partial<Store['$state']>;

declare module 'pinia' {
  export interface DefineStoreOptionsBase< S, Store> {
    persist?: PersistOptions;
  }
}

const updateStorage = (strategy: PersistStrategy, store: Store) => {
  const storage = strategy.storage || sessionStorage
  const storeKey = strategy.key || store.$id

  if (strategy.paths) {
    const partialState = strategy.paths.reduce((finalObj, key) => {
      finalObj[key] = store.$state[key]
      return finalObj
    }, {} as PartialState)

    storage.setItem(storeKey, JSON.stringify(partialState))
  } else {
    storage.setItem(storeKey, JSON.stringify(store.$state))
  }
}

export default ({ options, store }: PiniaPluginContext): void => {

  // 判断缓存是否启动
  if (options.persist?.enabled) {

    // 设置默认值
    const defaultStrat: PersistStrategy[] = [{
      key: store.$id,
      storage: sessionStorage,
    }]

    // 进行默认值的合并
    const strategies = options.persist?.strategies?.length ? options.persist?.strategies : defaultStrat

    strategies.forEach((strategy) => {
      const storage = strategy.storage || sessionStorage
      const storeKey = strategy.key || store.$id
      const storageResult = storage.getItem(storeKey)

      if (storageResult) {
        // 进行数据patch
        store.$patch(JSON.parse(storageResult))
        // 更新store中的数据
        updateStorage(strategy, store)
      }
    })

    watch(() => store.$state, () => {
      strategies.forEach((strategy) => {
        updateStorage(strategy, store)
      })
    }, { deep: true } )
  }
}
