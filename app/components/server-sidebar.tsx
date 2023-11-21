"use client";
import DiscordIcon from "@/app/components/discord-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ServersSidebar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 p-3 overflow-y-scroll flex flex-col gap-2">
      <Link href={"/"}>
        <div
          className={`${
            pathname === "/"
              ? "rounded-2xl bg-brand text-white"
              : "text-gray-100 hover:rounded-2xl hover:bg-brand hover:text-white"
          } bg-gray-700  w-12 h-12 rounded-3xl  flex items-center justify-center  transition-all duration-200`}
        >
          <DiscordIcon className="w-7 h-5" />
        </div>
      </Link>

      <Link href="/servers/1">
        <div
          className={`${
            pathname === "/servers/1"
              ? "rounded-2xl bg-brand text-white"
              : "text-gray-100 hover:rounded-2xl hover:bg-brand hover:text-white"
          } bg-gray-700  w-12 h-12 rounded-3xl  flex items-center justify-center  transition-all duration-200`}
        >
          S1
        </div>
      </Link>
    </nav>
  );
}
