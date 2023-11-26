"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link href={href} className="relative group rounded-2xl">
      <div className="flex absolute -left-3 h-full items-center">
        <div
          className={`${
            pathname === href
              ? "h-10"
              : "h-5 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100"
          } w-1 bg-white rounded-r transition-all duration-200 origin-left`}
        ></div>
      </div>
      <div
        className={`${
          pathname === href
            ? "rounded-2xl bg-brand text-white"
            : "text-gray-100 group-hover:rounded-2xl group-hover:bg-brand group-hover:text-white bg-gray-700 rounded-3xl"
        } flex items-center justify-center w-12 h-12  transition-all duration-200  group-active:translate-y-px overflow-hidden`}
      >
        {children}
      </div>
    </Link>
  );
}
