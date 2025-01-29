"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSendFileMutation } from "@/services/api/fileApi";
import SelectRepository from "./SelectRepository";
import { FormDataType } from "@/types/coinTypes";
import { useCreateCoinMutation } from "@/services/api/coinApi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function CreateCoinForm() {
  const router = useRouter();
  const { connected } = useWallet();
  const [createCoin, { isLoading: creatingCoin }] = useCreateCoinMutation();
  const [firstStepDone, setFirstStepDone] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    ticker: "",
    description: "",
    image: "",
    twitter_url: "",
    custom_merge_score_allowed: false,
    github_repo: "",
    website_url: "",
  });

  const [sendFile, { isLoading }] = useSendFileMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file); // Append file with key "file"

        const response = await sendFile(formData).unwrap(); // Send as FormData

        setFormData((prev) => ({
          ...prev,
          image: response?.Location,
        }));
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await createCoin(formData);
    if (response.data.id)
      router.push(`/instructions?repo=${response.data.github_repo}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6 py-5">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl border border-gray-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Create Coin
        </h2>
        {firstStepDone ? (
          <form onSubmit={handleSubmit} className="space-y-6 py-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                required
              />
            </div>

            {/* Ticker */}
            <div>
              <label
                htmlFor="ticker"
                className="block text-sm font-medium text-gray-700"
              >
                Ticker
              </label>
              <input
                type="text"
                name="ticker"
                id="ticker"
                value={formData.ticker}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                rows={4}
                required
              />
            </div>

            {/* Image Upload or Preview */}
            <div className="flex flex-col items-center">
              {formData.image ? (
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, image: "" }))
                  }
                  className=" bg-red-500 text-white px-2 py-1 rounded-full text-xs z-2 my-2 "
                >
                  ✕
                </button>
              ) : (
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Image
                </label>
              )}

              <div className="relative w-40 h-40 border-2 border-gray-300 rounded-lg flex items-center justify-center z-1">
                {formData.image ? (
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={formData?.image}
                      alt="Uploaded preview"
                      width={160}
                      height={160}
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="fileInput"
                      className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-500 transition duration-300 bg-gray-50"
                    >
                      <span className="text-gray-500 text-sm">
                        Click to upload
                      </span>
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
              {isLoading && (
                <p className="text-blue-500 mt-2">Uploading image...</p>
              )}
            </div>

            {/* Twitter URL */}
            <div>
              <label
                htmlFor="twitter_url"
                className="block text-sm font-medium text-gray-700"
              >
                Twitter URL
              </label>
              <input
                type="url"
                name="twitter_url"
                id="twitter_url"
                value={formData.twitter_url}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            </div>
            <div>
              <label
                htmlFor="website_url"
                className="block text-sm font-medium text-gray-700"
              >
                Website URL
              </label>
              <input
                type="url"
                name="website_url"
                id="website_url"
                value={formData.website_url}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Selected Repository
              </label>
              <input
                disabled
                value={formData.github_repo}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="customMergeScore"
                onChange={() => {
                  setFormData((prev) => ({
                    ...prev,
                    custom_merge_score_allowed:
                      !formData.custom_merge_score_allowed,
                  }));
                }}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="customMergeScore"
                className="ml-2 text-sm text-gray-700"
              >
                Allow custom score for merging pull requests for this project
              </label>
            </div>

            {!connected && (
              <div className="text-red-500">
                Please connect your wallet. It is required for creating a coin.
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                disabled={creatingCoin || !connected}
                type="submit"
                className={`px-6 py-3 rounded-lg shadow-md transition-all w-full font-semibold 
    ${
      creatingCoin || !connected
        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
    }`}
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <SelectRepository
              setFormData={setFormData}
              formData={formData}
            ></SelectRepository>
            {!connected && (
              <div className="text-red-500">
                Please connect your wallet. It is required to create a coin!
              </div>
            )}

            <div className="text-center">
              <button
                disabled={!formData.github_repo}
                onClick={() => setFirstStepDone(true)}
                className={`px-6 py-3 rounded-lg shadow-md transition-all w-full font-semibold 
    ${
      formData.github_repo
        ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
        : "bg-gray-400 text-gray-200 cursor-not-allowed"
    }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
