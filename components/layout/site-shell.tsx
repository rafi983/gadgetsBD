import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-amazon-background text-amazon-text">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1200px] px-4 py-6">{children}</main>
      <SiteFooter />
    </div>
  );
}

