import Head from 'next/head'

export default function Header() {
  return (
    <Head>
      <title>Storyteller</title>
      {/* <meta property="og:image" content="https://i.imgur.com/NfmSRhc.png" /> */}
      <meta
        property="og:description"
        content="Tell stories that match AI-generated cards!"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
  )
}
