"use client";
import DiscordIcon from "@/app/components/discord-icon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const servers = [
  { id: 1, img: "next.svg" },
  { id: 2, img: "vercel.svg" },
];

export default function ServersSidebar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 p-3 overflow-y-scroll flex flex-col gap-2">
      <NavLink href="/">
        <DiscordIcon className="h-5 w-7" />
      </NavLink>

      <hr className="border-t-white/[.06] border-t-2 rounded mx-2" />

      {servers.map(({ id, img }) => (
        <NavLink key={id} href={`/servers/${id}`}>
          <Image src={`/${img}`} fill alt="server icon" />
        </NavLink>
      ))}
    </nav>
  );
}

function NavLink({
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
