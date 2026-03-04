import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProviders } from "./app/providers.tsx";
import { AppErrorBoundary } from "./features/tasks/components/AppErrorBoundary.tsx";
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppProviders>
        <AppErrorBoundary>
          <App />
        </AppErrorBoundary>
      </AppProviders>
    </StrictMode>,
  );
});
