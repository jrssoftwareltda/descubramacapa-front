import "../styles/globals.css";

export const metadata = {
  title: "FoodFloripa",
  description: "Descubra bares e restaurantes em Floripa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}