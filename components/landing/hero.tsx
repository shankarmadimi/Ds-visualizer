"use client";

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Papa from "papaparse";
import { useRef } from "react";

export const Hero = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection and parsing
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, // Treat first row as headers
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed Data:", results.data);

        // Example: Show first few rows as a preview
        alert(`Uploaded ${results.data.length} records!\nCheck console for details.`);
      },
    });
  };

  return (
    <div className="relative w-full py-20 lg:py-40 overflow-hidden">
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          {/* Left Section */}
          <div className="flex gap-4 flex-col">
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                Data Structure Visualizer
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Interactive tool for learning and understanding data structures
                through visual animations and step-by-step operations.
              </p>
            </div>

            <div className="flex flex-row gap-4">

              {/* Existing Visualizer Button */}
              <Link href="/visualizer" className="flex-1">
                <Button className="w-full">
                  Visualizer <MoveRight className="hidden sm:block w-4 h-4" />
                </Button>
              </Link>

              {/* Upload Dataset Button */}
              <div className="flex-1">
                <Button
                  className="w-full max-w-[180px]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Dataset
                </Button>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* Right Section (Preview Image) */}
          <div className="relative aspect-video rounded-lg overflow-hidden border">
            <Image
              src="/ds-bst.png"
              alt="Visualizer Preview"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
