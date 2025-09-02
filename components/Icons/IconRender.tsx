"use client";

import * as Icons from "lucide-react";

type Props = {
  name?: string;        // Ej: "Car"
  className?: string;
  size?: number;
  strokeWidth?: number;
};

export default function IconRender({
  name,
  className,
  size = 20,
  strokeWidth = 1.75,
}: Props) {
  const Fallback = (Icons as Record<string, any>)["HelpCircle"];
  const Component =
    (name && (Icons as Record<string, any>)[name]) || Fallback;
  return <Component className={className} size={size} strokeWidth={strokeWidth} />;
}