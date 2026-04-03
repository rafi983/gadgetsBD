type AuthCardProps = {
  title: string;
  subtitle: string;
  cta: string;
};

export function AuthCard({ title, subtitle, cta }: AuthCardProps) {
  return (
    <section className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
      <form className="mt-5 space-y-3">
        <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Email" />
        <input className="w-full rounded border border-gray-300 px-3 py-2 text-sm" placeholder="Password" type="password" />
        <button type="button" className="w-full rounded bg-amazon-yellow px-4 py-2 text-sm font-medium hover:bg-amazon-yellow_hover">
          {cta}
        </button>
      </form>
    </section>
  );
}

