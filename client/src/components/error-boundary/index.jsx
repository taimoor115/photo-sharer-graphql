"use client";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-6 bg-red-50 text-red-700 rounded-lg border border-red-200">
      <h2 className="font-bold text-lg">Oops! Something went wrong.</h2>
      <p className="mt-2 text-sm">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
}

export default function ComponentErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Optional: reset local state if needed
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
