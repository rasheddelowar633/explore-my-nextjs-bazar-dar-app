import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Header";
import Footer from "@/Components/footer";
import { Toaster } from "react-hot-toast";

const NotoSerifBangali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata = {
  title: "Bazar Dar",
  description: "বাংলাদেশের বাজারদর জানুন সহজেই",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${NotoSerifBangali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />

        {children}

        <Footer />

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "12px",
              padding: "14px 16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#16a34a",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}