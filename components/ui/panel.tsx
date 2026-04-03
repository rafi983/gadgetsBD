type PanelProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function Panel({ title, children, className }: PanelProps) {
  return (
    <section className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${className ?? ""}`}>
      {title ? <h2 className="mb-3 text-lg font-semibold">{title}</h2> : null}
      {children}
    </section>
  );
}

