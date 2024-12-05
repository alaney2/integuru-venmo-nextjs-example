"use client";

import { useState } from "react";

declare global {
  interface Window {
    Taiki: {
      Create: (config: {
        token: string;
        platform: string;
        onSuccess: () => void;
        onExit: () => void;
      }) => {
        open: () => void;
      };
    };
  }
}

export default function VenmoConnectButton() {
  const [isLoading, setIsLoading] = useState(false);

  const initializeToken = async () => {
    try {
      const response = await fetch("/api/integuru/initialize-token");

      if (!response.ok) {
        throw new Error("Failed to initialize token");
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Error initializing token:", error);
      throw error;
    }
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const token = await initializeToken();

      const TaikiModal = window.Taiki.Create({
        token,
        platform: "venmo",
        onSuccess: () => {
          console.log("Successfully connected Venmo");
        },
        onExit: () => {
          console.log("Exited Venmo connection flow");
        },
      });

      TaikiModal.open();
    } catch (error) {
      console.error("Error connecting to Venmo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className="bg-[#008CFF] hover:bg-[#0070CC] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
    >
      {isLoading ? "Connecting..." : "Connect Venmo"}
    </button>
  );
}
