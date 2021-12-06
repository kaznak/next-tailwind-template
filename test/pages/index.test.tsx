import React from 'react'
import {
  render,
  fireEvent,
  waitFor,
} from 'test/testUtils/testingLibraryWrapper'
import { Home } from 'pages/index'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('clicking button triggers alert', async () => {
    const { getByText } = render(<Home />, {})
    window.alert = jest.fn()
    fireEvent.click(getByText('API Test Button'))
    await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1))
    expect(window.alert).toHaveBeenCalledWith('api returns: Jane Doe')
  })
})
