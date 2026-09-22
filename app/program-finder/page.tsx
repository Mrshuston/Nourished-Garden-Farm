import type { Metadata } from "next";
import { ProgramFinder } from "./program-finder";

export const metadata: Metadata = {
  title: "Find Your Program",
  description: "Answer a few questions to find a health coaching program that fits your current goals.",
};

export default function ProgramFinderPage() {
  return <ProgramFinder />;
}
