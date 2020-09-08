import Document, { Html, Head, Main, NextScript } from 'next/document'

/* NE PAS TOUCHER SVP 
NE PAS TOUCHER SVP 
NE PAS TOUCHER SVP 
NE PAS TOUCHER SVP 
*/
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
      console.log("allo")
    return (
      <Html lang="fr">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument