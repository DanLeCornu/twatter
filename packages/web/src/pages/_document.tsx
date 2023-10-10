import * as React from "react"
import { ColorModeScript } from "@chakra-ui/react"
import Document, { Head, Html, Main, NextScript } from "next/document"
// import Script from "next/script"

export default class AppDocument extends Document {
  static getInitialProps(ctx: any) {
    return Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <meta name="theme-color" key="theme-color" content="#000000" /> */}
          <meta name="description" content="Twatter" key="description" />
          <meta property="og:title" content="Twatter" key="title" />
          <meta property="og:description" content="Twatter" key="og:description" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          {/* {IS_PRODUCTION && (
            <div className="container">
              <Script id="hotjar">
                {`
                  (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:3596037,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `}
              </Script>
            </div>
          )} */}
        </Head>
        <body>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
