import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/mock/images";
import { site } from "@/lib/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image src={IMG.heroInterior} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="pattern-arabesque absolute inset-0 opacity-10" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-cream">
          <p className="font-arabic text-3xl text-gold">أهلاً بك</p>
          <h2 className="mt-2 font-display text-4xl">Welcome to {site.name}</h2>
          <p className="mt-3 max-w-md text-cream/70">Sign in to track orders, earn rewards and savor the authentic taste of Yemen.</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-cream p-6 sm:p-10">
        <Link href="/" className="mb-8 flex items-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gold font-display text-xl font-bold text-ink">ا</span>
          <span className="font-display text-2xl text-ink">{site.name}</span>
        </Link>
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
