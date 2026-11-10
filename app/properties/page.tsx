import type { Metadata } from "next";
import PropertiesBrowser from "@/components/PropertiesBrowser";

export const metadata: Metadata = { title: "Home Search" };

export default function PropertiesPage() {
  return <PropertiesBrowser />;
}
