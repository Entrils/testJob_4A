import "./globals.css";

export const metadata = {
  title: "4A",
  description: "Тестовое задание 4A"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
