"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { FaChartLine } from "react-icons/fa6";
import { Nav } from "./nav";
import { Separator } from "./ui/separator";

export type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex container h-16 items-center">
        <h1 className="text-xl font-bold">GPU Monitor</h1>
        <Nav
          links={[
            {
              title: "Dashboard",
              label: "",
              icon: FaChartLine,
              variant: "default",
              href: "/dashboard",
            },
            {
              title: "Storage",
              href: "/storage",
              icon: FaChartLine,
              variant: "default",
            },
          ]}
        />
      </div>
      <Separator />
      <main className="flex container items-center">{children}</main>
    </TooltipProvider>
  );
};
