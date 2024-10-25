import { ThemeProvider } from "@/components/ui/theme-provider";
import NearProvider from "@/contexts/near";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>404 not found</p>
        <Link to="/">Go home</Link>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <NearProvider>
          <div className="min-h-screen">
            {/* <Header /> */}

            <main className="">
              <Outlet />
            </main>
          </div>
        </NearProvider>
        {/* <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" /> */}
      </ThemeProvider>
    </>
  );
}
