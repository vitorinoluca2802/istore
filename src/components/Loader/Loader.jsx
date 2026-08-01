export const Loader = () => (
  <div className="absolute left-0 top-0 z-[5] flex h-[100svh] w-full items-center justify-center bg-white">
    <span
      className="h-9 w-9 animate-spin rounded-full border-[3px] border-divider border-t-link"
      role="status"
      aria-label="Loading"
    />
  </div>
);
