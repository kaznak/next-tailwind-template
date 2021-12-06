import { render } from '@testing-library/react'
import TestWrapper from './TestWrapper'

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: TestWrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
