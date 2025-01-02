import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import HelloWorld from '../../src/components/HelloWorld.vue'
import ResizeObserver from 'resize-observer-polyfill'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = ResizeObserver

test('displays message', () => {
  const wrapper = mount({
    template: '<v-layout><hello-world></hello-world></v-layout>'
  }, {
    props: {},
    global: {
      components: {
        HelloWorld,
      },
      plugins: [vuetify],
    }
  })

  // Assert the rendered text of the component
  console.log(wrapper.text())
  expect(wrapper.text()).toContain('Components')
})
