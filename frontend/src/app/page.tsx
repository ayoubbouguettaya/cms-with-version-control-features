"use client";

import HomeComponent from "@/components/Home";
import Navbar from "@/components/Navbar";
import { WorkSpaceProvider } from "@/store/context";

export default function Home() {
  return (
    <>
      <WorkSpaceProvider>
        <Navbar />
        <main>
          <HomeComponent />
        </main>
      </WorkSpaceProvider>
    </>
  );
}
