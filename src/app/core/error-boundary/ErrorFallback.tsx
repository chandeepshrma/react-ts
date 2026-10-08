interface ErrorFallbackProps {
  error: Error | null;
  onRetry: () => void;
}

function ErrorFallback({
  error,
  onRetry,
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          Something went wrong
        </h1>

        <p className="mt-2 text-gray-600">
          An unexpected error occurred. Please try again.
        </p>

        {error?.message && (
          <p className="mt-2 text-sm text-gray-500">
            {error.message}
          </p>
        )}

        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;