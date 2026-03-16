"use client";

import { useUsername } from "@/lib/user-store";
import { SignupModal } from "@/components/signup-modal";
import { MainScreen } from "@/components/main-screen";

export default function Home() {
  const username = useUsername();

  if (!username) {
    return <SignupModal />;
  }

  return <MainScreen />;
}
