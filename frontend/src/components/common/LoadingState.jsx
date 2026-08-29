export default function LoadingState({ label = 'Loading' }) {
  return (
    <div className="flex items-center justify-center py-16" role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-cream-300 border-t-noviq" />
    </div>
  );
}
