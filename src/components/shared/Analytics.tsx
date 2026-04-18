import Script from "next/script";

export default function Analytics() {
  const gid = process.env.NEXT_PUBLIC_GA_ID;
  if (!gid) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gid}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${gid}', { send_page_view: true });
      `}</Script>
    </>
  );
}
