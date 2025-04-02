"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface MemorySelectorProps {
  baseModel: string; // Base slug without memory specification, e.g. "samsung-s24"
  currentMemory?: number; // Currently selected memory in GB
}

interface DeviceWithMemory {
  memory: number;
  slug: string;
}

export default function MemorySelector({
  baseModel,
  currentMemory,
}: MemorySelectorProps) {
  const [memoryOptions, setMemoryOptions] = useState<DeviceWithMemory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemoryOptions = async () => {
      try {
        const response = await fetch(
          `/api/product-memory-options?baseModel=${baseModel}`
        );
        if (!response.ok) throw new Error("Failed to fetch memory options");
        const data = await response.json();
        setMemoryOptions(data);
      } catch (error) {
        console.error("Error fetching memory options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemoryOptions();
  }, [baseModel]);

  return (
    <div className="my-4">
      <h3 className="text-lg font-medium mb-2">Память:</h3>
      <div className="flex flex-wrap gap-2">
        {memoryOptions.map((option) => (
          <Link href={`/product/${option.slug}`} key={option.memory}>
            <Button
              variant={currentMemory === option.memory ? "default" : "outline"}
            >
              {option.memory} GB
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
