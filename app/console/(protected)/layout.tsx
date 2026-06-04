import { ReactNode } from "react";
import { ConsoleLayout } from "@/components/console/ConsoleLayout";

export default function ProtectedConsoleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ConsoleLayout>{children}</ConsoleLayout>;
}