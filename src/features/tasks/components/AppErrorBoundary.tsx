import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";

type AppErrorBoundaryProps = {
  children: ReactNode;
};
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  let message = "Something went wrong";

  if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div>
      <p>{message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  );
}
