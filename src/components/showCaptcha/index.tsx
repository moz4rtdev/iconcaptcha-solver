"use client";
import { Icon } from "@/types";
import { useState, useEffect } from "react";

export default function ShowCaptcha() {
  const [currentCaptcha, setCurrentCaptcha] = useState<string>("");
  const [icon, setIcon] = useState<Icon>();

  useEffect(() => {
    fetchCaptchas();
  }, []);

  const fetchCaptchas = async () => {
    try {
      const response = await fetch("/api/v2/demo/captchas");
      const data = await response.json();
      getRandomCaptcha(data.captchas);
    } catch (error) {
      console.error("Failed to load captchas:", error);
    }
  };

  const getRandomCaptcha = (captchas: string[]) => {
    const randomIndex = Math.floor(Math.random() * captchas.length);
    setCurrentCaptcha(captchas[randomIndex]);
  };

  const solveCaptcha = async () => {
    try {
      const response = await fetch("/api/v2/demo/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pathFile: currentCaptcha,
        }),
      });
      const data = await response.json();
      setIcon(data);
    } catch (error) {
      console.error("Failed to solve captcha:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`flex flex-col h-26 items-center justify-center ${currentCaptcha.includes("dark") ? "bg-[#555555] border-gray-800" : "bg-[#FAFAFA] border-gray-400"} rounded-md border-2 `}
      >
        <h3
          className={`font-bold ${currentCaptcha.includes("dark") ? "text-white" : "text-black"}`}
        >
          IconCaptcha Challenge
        </h3>
        {!currentCaptcha && (
          <div role="status">
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {currentCaptcha && (
          <img
            src={currentCaptcha}
            alt="IconCaptcha Challenge"
            className={`border-2 ${currentCaptcha.includes("dark") ? "border-neutral-700" : "border-gray-400"}`}
          />
        )}
        <h3
          className={`font-bold text-[12px] ${currentCaptcha.includes("dark") ? "text-white" : "text-cyan-600"}`}
        >
          {!icon ? <>IconCaptcha &copy;</> : `Icon Position: ${icon.position}`}
        </h3>
      </div>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-1"
        onClick={solveCaptcha}
      >
        Solve Challenge
      </button>
    </div>
  );
}
