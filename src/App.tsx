import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import Index from "./pages/Index";
import New from "./pages/New";
import Show from "./pages/Show";
import Edit from "./pages/Edit";
import PageWrapper from "./components/global/PageWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageNotFound from "./pages/global/PageNotFound";
import { ClerkProvider } from "@clerk/clerk-react";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PageWrapper />}>
        <Route index element={<Home />} />

        <Route path="books">
          <Route index element={<Index />} />
          <Route path="new" element={<New />} />
          <Route path=":id" element={<Show />} />
          <Route path=":id/edit" element={<Edit />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </>
  )
);

export default function App() {
  return (
    <>
      <ClerkProvider publishableKey={clerkPubKey}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ClerkProvider>
    </>
  );
}
