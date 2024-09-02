import { cn } from "@/lib/utils";
import { Link, useNavigation } from "@remix-run/react";
import { IconType } from "react-icons";
import { buttonVariants } from "./ui/button";
import { Spinner } from "./ui/spinner";

interface NavProps {
  links: {
    title: string;
    label?: string;
    icon: IconType;
    variant: "default" | "ghost";
    href: string;
  }[];
}

export function Nav({ links }: NavProps) {
  const navigation = useNavigation();

  return (
    <nav className="flex gap-2 px-10">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.href}
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
          {navigation.location?.pathname === link.href && (
            <Spinner className="ml-2 h-4 w-4 text-background dark:text-white" />
          )}
        </Link>
      ))}
    </nav>
  );
}
