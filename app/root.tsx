import { LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindCss from '~/tailwind.css?url';
import { NextUIProvider } from "@nextui-org/react";

export const links: LinksFunction = () => [
  { rel: 'preload', as: 'style', href: tailwindCss },
  { rel: 'stylesheet', href: tailwindCss },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <NextUIProvider className="h-full">
      <Outlet />
    </NextUIProvider>
  );
}
