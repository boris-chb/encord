import { DiscordIcon } from "@/app/components/ui/icons";
import NavLink from "@/app/components/nav-link";
import Image from "next/image";

const servers = [
  { id: 1, img: "next.svg" },
  { id: 2, img: "vercel.svg" },
];

export default function ServersSidebar() {
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
