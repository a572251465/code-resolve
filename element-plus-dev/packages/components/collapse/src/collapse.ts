import {
  buildProps,
  definePropType,
  mutable,
  isNumber,
  isString,
} from '@element-plus/utils'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '@element-plus/constants'
import type { ExtractPropTypes } from 'vue'
import type Collapse from './collapse.vue'
import type { Arrayable } from '@element-plus/utils'

export type CollapseActiveName = string | number
export type CollapseModelValue = Arrayable<CollapseActiveName>

export const emitChangeFn = (value: CollapseModelValue) =>
  typeof isNumber(value) || isString(value) || Array.isArray(value)

export const collapseProps = buildProps({
  accordion: Boolean,
  modelValue: {
    type: definePropType<CollapseModelValue>([Array, String, Number]),
    default: () => mutable([] as const),
  },
} as const)
export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export const collapseEmits = {
  [UPDATE_MODEL_EVENT]: emitChangeFn,
  [CHANGE_EVENT]: emitChangeFn,
}
export type CollapseEmits = typeof collapseEmits

export type CollapseInstance = InstanceType<typeof Collapse>
