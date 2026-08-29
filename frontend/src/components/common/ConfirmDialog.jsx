export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <button type="button" className="absolute inset-0 bg-ink/50" aria-label="Close dialog" onClick={onCancel} />
      <div className="relative w-full max-w-md rounded-card bg-cream-50 p-6 shadow-lift">
        <h2 id="confirm-title" className="font-display text-2xl">
          {title}
        </h2>
        <p className="mt-3 text-ink-muted">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
