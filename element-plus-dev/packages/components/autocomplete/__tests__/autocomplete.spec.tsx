import { nextTick, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { NOOP } from '@vue/shared'
import { POPPER_CONTAINER_SELECTOR } from '@element-plus/hooks'
import Autocomplete from '../src/autocomplete.vue'

jest.unmock('lodash')

jest.useFakeTimers()

const _mount = (payload = {}) =>
  mount({
    setup() {
      const state = reactive({
        value: '',
        list: [
          { value: 'Java', tag: 'java' },
          { value: 'Go', tag: 'go' },
          { value: 'JavaScript', tag: 'javascript' },
          { value: 'Python', tag: 'python' },
        ],
        payload,
      })

      const querySearch = (
        queryString: string,
        cb: (arg: typeof state.list) => void
      ) => {
        cb(
          queryString
            ? state.list.filter(
                (i) => i.value.indexOf(queryString.toLowerCase()) === 0
              )
            : state.list
        )
      }

      return () => (
        <Autocomplete
          ref="autocomplete"
          v-model={state.value}
          fetch-suggestions={querySearch}
          {...state.payload}
        />
      )
    },
  })

describe('Autocomplete.vue', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  test('placeholder', async () => {
    const wrapper = _mount()
    await nextTick()

    await wrapper.setProps({ placeholder: 'autocomplete' })
    expect(wrapper.find('input').attributes('placeholder')).toBe('autocomplete')

    await wrapper.setProps({ placeholder: 'placeholder' })
    expect(wrapper.find('input').attributes('placeholder')).toBe('placeholder')
  })

  test('triggerOnFocus', async () => {
    const fetchSuggestions = jest.fn()
    const wrapper = _mount({
      debounce: 10,
      fetchSuggestions,
    })
    await nextTick()

    await wrapper.setProps({ triggerOnFocus: false })
    await wrapper.find('input').trigger('focus')
    jest.runAllTimers()
    await nextTick()
    expect(fetchSuggestions).toHaveBeenCalledTimes(0)

    await wrapper.find('input').trigger('blur')

    await wrapper.setProps({ triggerOnFocus: true })
    await wrapper.find('input').trigger('focus')
    jest.runAllTimers()
    await nextTick()
    expect(fetchSuggestions).toHaveBeenCalledTimes(1)
  })

  test('popperClass', async () => {
    const wrapper = _mount()
    await nextTick()

    await wrapper.setProps({ popperClass: 'error' })
    expect(
      document.body.querySelector('.el-popper')?.classList.contains('error')
    ).toBe(true)

    await wrapper.setProps({ popperClass: 'success' })
    expect(
      document.body.querySelector('.el-popper')?.classList.contains('error')
    ).toBe(false)
    expect(
      document.body.querySelector('.el-popper')?.classList.contains('success')
    ).toBe(true)
  })

  test('teleported', async () => {
    _mount({ teleported: false })
    expect(document.body.querySelector('.el-popper__mask')).toBeNull()
  })

  test('debounce / fetchSuggestions', async () => {
    const fetchSuggestions = jest.fn()
    const wrapper = _mount({
      debounce: 10,
      fetchSuggestions,
    })
    await nextTick()

    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(fetchSuggestions).toHaveBeenCalledTimes(0)
    jest.runAllTimers()
    await nextTick()

    expect(fetchSuggestions).toHaveBeenCalledTimes(1)
    await wrapper.find('input').trigger('focus')
    jest.runAllTimers()
    await nextTick()

    expect(fetchSuggestions).toHaveBeenCalledTimes(2)
  })

  test('valueKey / modelValue', async () => {
    const wrapper = _mount()
    await nextTick()

    const target = wrapper.getComponent(Autocomplete).vm as InstanceType<
      typeof Autocomplete
    >

    await target.handleSelect({ value: 'Go', tag: 'go' })

    expect(target.modelValue).toBe('Go')

    await wrapper.setProps({ valueKey: 'tag' })

    await target.handleSelect({ value: 'Go', tag: 'go' })
    expect(target.modelValue).toBe('go')
  })

  test('hideLoading', async () => {
    const wrapper = _mount({
      hideLoading: false,
      fetchSuggestions: NOOP,
      debounce: 10,
    })
    await nextTick()
    await wrapper.find('input').trigger('focus')
    jest.runAllTimers()
    await nextTick()

    expect(document.body.querySelector('.el-icon-loading')).toBeDefined()
    await wrapper.setProps({ hideLoading: true })
    expect(document.body.querySelector('.el-icon-loading')).toBeNull()
  })

  test('selectWhenUnmatched', async () => {
    const wrapper = _mount({
      selectWhenUnmatched: true,
      debounce: 10,
    })
    await nextTick()
    const target = wrapper.getComponent(Autocomplete).vm as InstanceType<
      typeof Autocomplete
    >

    target.highlightedIndex = 0
    target.handleKeyEnter()
    jest.runAllTimers()
    await nextTick()

    expect(target.highlightedIndex).toBe(-1)
  })

  test('highlightFirstItem', async () => {
    const wrapper = _mount({
      highlightFirstItem: false,
      debounce: 10,
    })
    await nextTick()

    await wrapper.find('input').trigger('focus')
    jest.runAllTimers()
    await nextTick()

    expect(document.body.querySelector('.highlighted')).toBeNull()

    await wrapper.setProps({ highlightFirstItem: true })

    await wrapper.find('input').trigger('focus')
    jest.runAllTimers()
    await nextTick()

    expect(document.body.querySelector('.highlighted')).toBeDefined()
  })

  describe('teleported API', () => {
    it('should mount on popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      _mount()

      await nextTick()
      expect(
        document.body.querySelector(POPPER_CONTAINER_SELECTOR)?.innerHTML
      ).not.toBe('')
    })

    it('should not mount on the popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      _mount({
        teleported: false,
      })

      await nextTick()
      expect(
        document.body.querySelector(POPPER_CONTAINER_SELECTOR)?.innerHTML
      ).toBe('')
    })
  })
})
