import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GCP-SII",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}