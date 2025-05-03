"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
export function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <div
      className="fixed inset-0 -z-10 h-full w-full bg-black ">
      
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
