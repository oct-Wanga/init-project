export const metadata = {
  title: 'EXAONE Showroom',
  description: "Explore LG AI Research's AI Solutions",
  openGraph: {
    title: 'EXAONE Showroom',
    description: "Explore LG AI Research's AI Solutions",
    url: 'https://showroom.exaone.ai',
    images: [
      {
        url: 'https://asset-showroom.exaone.ai/image/showroom-logo.png',
        width: 400,
        height: 400,
        alt: 'EXAONE Showroom Logo',
      },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
