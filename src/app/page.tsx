'use client'
import Profile from "@/components/profile";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_2fr] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-16 font-[family-name:var(--font-geist-sans)]">
      <Profile />
      <main className="flex flex-col gap-16 row-start-2 items-center sm:items-start">
        
      </main>
    </div>
  );
}
