/**
 * @module @pinia/nuxt
 */
// import { isVue2 } from 'vue-demi'
import type { Pinia } from 'pinia'
import type { Context, Module } from '@nuxt/types'

export interface PiniaNuxtOptions {
  /**
   * Pinia disables Vuex by default, set this option to `false` to avoid it and
   * use Pinia alongside Vuex.
   *
   * @default `true`
   */
  disableVuex?: boolean
}

const DEFAULTS = {
  disableVuex: true,
}

export default <Module>function (_options) {
  const nuxt = this.nuxt
  const options = {
    ...DEFAULTS,
    ...(_options || {}),
    ...(nuxt.options.pinia || {}),
  }

  // Disable default Vuex store (options.features only exists in Nuxt v2.10+)
  if (nuxt.options.features && options.disableVuex) {
    nuxt.options.features.store = false
  }

  // make sure we use the mjs for pinia so node doesn't complain about using a module js with an extension that is js
  // but doesn't have the type: module in its packages.json file
  nuxt.options.alias.pinia = 'pinia/dist/pinia.mjs'

  this.addPlugin({ src: require.resolve('./plugin.mjs') })

  // transpile pinia for nuxt 2 and nuxt bridge
  // if (isVue2 && !nuxt.options.build.transpile.includes('pinia')) {
  //   nuxt.options.build.transpile.push('pinia')
  // }
}

declare module '@nuxt/types' {
  export interface Context {
    /**
     * Pinia instance attached to the app.
     *
     * @deprecated: use context.$pinia instead
     */
    pinia: Pinia

    /**
     * Pinia instance attached to the app.
     */
    $pinia: Pinia
  }
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    /**
     * Nuxt context.
     */
    $nuxt: Context
  }
}
