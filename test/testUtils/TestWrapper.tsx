import { SWRConfig } from 'swr'
import fetchJson from 'lib/fetchJson'
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

export const TestWrapper = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
        provider: () => new Map(),
        dedupingInterval: 0,
      }}
    >
      {children}
    </SWRConfig>
  )
  // return (
  //   <ThemeProvider theme="light">
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  //   </ThemeProvider>
  // )
}

export default TestWrapper
