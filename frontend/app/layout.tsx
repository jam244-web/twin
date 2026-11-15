import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dzxt5k26egmcv.cloudfront.net"),
  title: "John Mathew | AI Career Twin",
  description:
    "Ask my AI twin about my work in ML deployment and LLM systems. Built on AWS Bedrock, Lambda and Terraform.",
  openGraph: {
    title: "John Mathew | AI Career Twin",
    description: "Ask my AI twin about my work in ML deployment and LLM systems.",
    images: ["/og.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
