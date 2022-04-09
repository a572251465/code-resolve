/* @flow */

import { mergeOptions } from "../util/index";

export function initMixin(Vue: GlobalAPI) {
  // 进行全局混入的静态方法
  Vue.mixin = function (mixin: Object) {
    // 实例的options，混入的参数
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
