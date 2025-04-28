import { Inter } from "next/font/google";
import { Providers } from "./lib/providers";
import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, Box, Toolbar, Typography, CssBaseline } from "@mui/material";
import { SideDrawer } from "./components/ui/SideDrawer";

const inter = Inter({ subsets: ["latin"] });
const theme = createTheme({
  typography: {
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export const metadata = {
  title: "Smart Notes App",
  description: "A note-taking app with AI features",
};

function ButtonAppBar({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: 11111 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Smart Notes
          </Typography>
        </Toolbar>
      </AppBar>
      <SideDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-6 py-8 max-w-6xl">
              <ButtonAppBar>{children}</ButtonAppBar>
            </main>
            <footer className="bg-white shadow-inner mt-8 border-t border-gray-100">
              <div className="container mx-auto px-6 py-4 text-center text-gray-500 text-sm">
                Smart Notes App with AI &copy; {new Date().getFullYear()}
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}