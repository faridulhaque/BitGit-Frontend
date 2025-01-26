"use client";
import {
  useCreateUserMutation,
  useLoginUserMutation,
} from "@/app/services/api/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export enum UserRole {
  Contributor = "contributor",
  Creator = "creator",
}

const ChooseRole = () => {
  const [roleSelection, setRoleSelection] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [githubUsername, setGithubUsername] = useState("");
  const router = useRouter();
  const [login, { isLoading: loggingIn }] = useLoginUserMutation();
  const [createUser, { isLoading: creatingUser }] = useCreateUserMutation();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const handleLogin = async () => {
      const response = await login({ github_code: code });
      const data = response?.data;
      if (data?.token) {
        localStorage.setItem("token", data?.token);
        router.push("/");
      } else if (data?.github_username && !data?.token) {
        setGithubUsername(data?.github_username);
        setRoleSelection(true);
      }
    };

    if (code) {
      handleLogin();
    }
  }, [code]);

  const handleContinue = async () => {
    if (!role) return;

    const response = await createUser({
      github_username: githubUsername,
      role,
    });
    const data = response?.data;
    if (data?.token) {
      localStorage.setItem("token", data?.token);
      router.push("/connect-wallet");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {loggingIn || creatingUser ? (
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {roleSelection && (
            <div>
              <h1 className="text-2xl font-bold mb-6 text-center">
                Choose Your Role
              </h1>

              <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg">
                <div
                  onClick={() => setRole(UserRole.Contributor)}
                  className={`border-2 p-6 rounded-lg shadow-md cursor-pointer transition-all ${
                    role === UserRole.Contributor
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                >
                  <h2 className="text-xl font-semibold mb-2">Contributor</h2>
                  <p className="text-gray-600">
                    Select this role if you want to contribute to existing
                    projects.
                  </p>
                </div>

                <div
                  onClick={() => setRole(UserRole.Creator)}
                  className={`border-2 p-6 rounded-lg shadow-md cursor-pointer transition-all ${
                    role === UserRole.Creator
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300"
                  }`}
                >
                  <h2 className="text-xl font-semibold mb-2">Creator</h2>
                  <p className="text-gray-600">
                    Select this role if you want to create new projects.
                  </p>
                </div>
              </div>
              <div className="w-full justify-center flex">
                <button
                  onClick={handleContinue}
                  disabled={!role || !creatingUser}
                  className="mt-8 bg-info text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChooseRole;
