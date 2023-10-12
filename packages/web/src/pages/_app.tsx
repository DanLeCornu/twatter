import * as React from "react"
import { ApolloProvider } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import { Analytics } from "@vercel/analytics/react"
import Head from "next/head"
// import Script from "next/script"
import "../styles/globals.css"

import { useApollo } from "lib/apollo/client"
import { theme } from "lib/theme"

export default function App(props: any) {
  const { Component, pageProps } = props
  const apolloClient = useApollo(pageProps.initialApolloState)
  const getLayout = Component.getLayout ?? ((page: any) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* {IS_PRODUCTION && ( */}
      {/* <div className="container"> */}
      {/* GOOGLE ANALYTICS */}
      {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-3XQEJLV0LG" /> */}
      {/* <Script id="ga-tag">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3XQEJLV0LG');
            `}
          </Script> */}
      {/* </div> */}
      {/* )} */}
      <ChakraProvider theme={theme}>
        <ApolloProvider client={apolloClient}>{getLayout(<Component {...pageProps} />)}</ApolloProvider>
      </ChakraProvider>
      <Analytics />
    </>
  )
}
