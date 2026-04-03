import Link from "next/link";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/shops", label: "Shops" },
  { href: "/bookings", label: "Orders" },
  { href: "/manage-list", label: "Manage" },
  { href: "/profile", label: "Profile" },
];

export function SiteHeader() {
  return (
    <header className="bg-amazon text-white">
      <div className="mx-auto flex w-full max-w-[1200px] items-center gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          gadgets<span className="italic text-amazon-secondary">BD</span>
        </Link>

        <div className="hidden flex-1 md:block">
          <input
            readOnly
            className="w-full rounded-md bg-white px-3 py-2 text-sm text-black"
            placeholder="Search Gadgets, Laptops, Phones..."
          />
        </div>

        <nav className="hidden items-center gap-3 lg:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm hover:text-amazon-secondary">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/cart" className="rounded-md border border-white/30 px-3 py-1.5 text-sm">
          Cart
        </Link>
      </div>
    </header>
  );
}

