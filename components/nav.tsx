"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconType } from "react-icons";
import { buttonVariants } from "./ui/button";

interface NavProps {
  links: {
    title: string;
    label?: string;
    icon: IconType;
    variant: "default" | "ghost";
  }[];
}

export function Nav({ links }: NavProps) {
  return (
    <nav className="flex gap-2 px-10">
      {links.map((link, index) => (
        <Link
          key={index}
          href="#"
          className={cn(
            buttonVariants({ variant: link.variant, size: "sm" }),
            link.variant === "default" &&
              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
            "justify-start",
          )}
        >
          <link.icon className="mr-2 h-4 w-4" />
          {link.title}
          {link.label && (
            <span
              className={cn(
                "ml-auto",
                link.variant === "default" && "text-background dark:text-white",
              )}
            >
              {link.label}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
