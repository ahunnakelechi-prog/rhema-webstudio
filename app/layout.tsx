export const metadata = {
  title: 'Rhema Webstudio',
  description: 'I build websites for businesses and individuals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
