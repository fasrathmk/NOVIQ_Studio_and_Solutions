export default function EmptyState({ title, text, action }) {
  return (
    <div className="card px-6 py-12 text-center">
      <h2 className="font-display text-2xl">{title}</h2>
      {text ? <p className="mx-auto mt-3 max-w-lg text-ink-muted">{text}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
