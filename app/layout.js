import "./globals.css";

export const metadata = {
  title: "4A",
  description: "Тестовое задание для 4А"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
