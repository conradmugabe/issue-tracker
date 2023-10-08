"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];

export function NavBar() {
  const currentPath = usePathname();

  return (
    <nav className="flex items-center space-x-6 mb-5 px-5 h-14 border-b">
      <Link href="/">
        <AiFillBug />
      </Link>
      <div className="flex space-x-6">
        {links.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={classnames("transition-colors", {
                "text-zinc-800": isActive,
                "text-zinc-500 hover:text-zinc-800": !isActive,
              })}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
