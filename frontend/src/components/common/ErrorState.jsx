export default function ErrorState({ title = 'Unable to load this content', text = 'Please refresh the page or try again in a moment.' }) {
  return (
    <div className="rounded-card border border-red-200 bg-red-50 px-6 py-10 text-center text-red-900" role="alert">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-3">{text}</p>
    </div>
  );
}
