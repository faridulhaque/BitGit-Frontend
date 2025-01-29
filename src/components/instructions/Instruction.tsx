"use client";
import { nextServerUrl } from "@/services/constant";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Instructions = () => {
  const searchParams = useSearchParams();
  const selectedRepo = searchParams.get("repo");

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${nextServerUrl}/bit-git`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="mt-6 text-gray-700 p-6 rounded-lg shadow-lg max-w-3xl mx-auto lg:py-5">
      <h2 className="text-2xl font-bold mb-4 text-info">
        GitHub Webhook Setup
      </h2>

      <p className="text-gray-700 mb-4">
        Webhooks enable your GitHub repository to **communicate** with BitGit in
        real-time, ensuring that contributors&apos; commits and actions trigger
        automated processes to reward them based on their activities. Follow the
        steps below to set up your webhook correctly.
      </p>

      <ul className="space-y-4 list-disc list-inside text-gray-800">
        {/* Copy Webhook URL */}
        <li className="flex flex-wrap items-center gap-3">
          <span className="font-semibold">Webhook URL:</span>
          <span className="text-gray-700 py-2 rounded-lg">
            {nextServerUrl}/bit-git
          </span>
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              isCopied
                ? "bg-green-600 text-white"
                : "bg-info hover:bg-info-dark text-white"
            }`}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </li>

        {/* GitHub Webhook Settings */}
        <li>
          Navigate to your GitHub repository’s
          <a
            target="_blank"
            href={`${selectedRepo}/settings/hooks/new`}
            className="text-info underline hover:text-info-dark mx-1"
          >
            Webhook Settings
          </a>
          and paste the copied URL in the **Payload URL** field.
        </li>

        {/* Content Type */}
        <li>
          Ensure the **Content Type** is set to{" "}
          <span className="font-semibold">application/json</span>.
        </li>

        {/* Select Individual Events */}
        <li>
          Click on **Let me select individual events**, then mark:
          <span className="font-semibold text-info">
            {" "}
            Stars, Forks, Pull Requests, and Pushes.
          </span>
        </li>

        {/* Add Webhook */}
        <li>
          Scroll down and click on the **Add Webhook** button to save the
          configuration.
        </li>

        {/* Webhook Success/Failure Icons */}
        <li className="flex items-center gap-2">
          If you see a{" "}
          <span className="text-green-600 font-semibold flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L7 13.586 4.707 11.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
            green checkmark
          </span>
          , it means your setup was successful.
        </li>

        <li className="flex items-center gap-2">
          If you see a{" "}
          <span className="text-red-600 font-semibold flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 012 0v8a1 1 0 01-2 0V2zm1 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                clipRule="evenodd"
              />
            </svg>
            red warning icon
          </span>
          , your setup has failed. Please check your configuration.
        </li>
      </ul>

      {/* YouTube Tutorial */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-info mb-2">
          Watch the Setup Guide
        </h3>
        <iframe
          className="w-full rounded-lg shadow-lg"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="GitHub Webhook Setup Guide"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Instructions;
