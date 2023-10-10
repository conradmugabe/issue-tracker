"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

import { Skeleton } from "@/components";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];

function AuthView() {
  const { status } = useSession();

  if (status === "loading") return <Skeleton width="2rem" />;

  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Log in</Link>;

  return <Link href="/api/auth/signout">Log out</Link>;
}

function NavLinks() {
  const currentPath = usePathname();

  return (
    <Flex gap={{ initial: "2", sm: "4" }}>
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
    </Flex>
  );
}

export function NavBar() {
  return (
    <nav className="mb-5 border-b">
      <Container>
        <Flex justify="between" align="center" className="h-14 px-2 sm:px-4">
          <Flex align="center" gap={{ initial: "2", sm: "4" }}>
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthView />
        </Flex>
      </Container>
    </nav>
  );
}
