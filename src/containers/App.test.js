import React from 'react'

import App from './App'

// Dummy test for App component
describe('<App />', () => {
  it('should render h1 tag with text if working properly', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('h1').text()).toBe('Dummy test!')
  })
})
