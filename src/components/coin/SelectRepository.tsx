import { GlobalContext } from "@/app/layout";
import { fetchRepositories } from "@/services/axiosCalls";
import { FormDataType, GitHubRepository } from "@/types/coinTypes";
import { TContext } from "@/types/contextTypes";
import React, { useContext, useEffect, useState } from "react";

interface SelectRepositoryProps {
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  formData: FormDataType;
}

const SelectRepository = ({ setFormData, formData }: SelectRepositoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [searchedRepositories, setSearchRepositories] = useState([]);
  const [repoPage, setRepoPage] = useState(1);
  const [searchRepo, setSearchRepo] = useState("");

  const value = useContext(GlobalContext);
  const { user } = value as TContext;

  useEffect(() => {
    const callOnRender = async () => {
      if (user?.github_username) {
        const repos = await fetchRepositories(user, repoPage, searchRepo);
        if (searchRepo) {
          setSearchRepositories(repos);
        } else setRepositories(repos);
      }
    };
    if (user) callOnRender();
  }, [user, repoPage, searchRepo]);

  return (
    <div className="relative w-full mx-auto pt-6">
      <label
        htmlFor="repository-select"
        className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Repository*
      </label>

      {/* Main Select Box */}
      <div
        id="repository-select"
        className="bg-gray-100 border text-gray-800 rounded-lg px-4 py-3 cursor-pointer 
      hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {formData.github_repo || "Select a repository"}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full left-0 bg-white border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-600">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchRepo}
            onChange={(e) => setSearchRepo(e.target.value)}
            className="w-full px-4 py-2 text-base border-b bg-gray-50 focus:outline-none 
          focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

          {/* Repository List */}
          <ul className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
            {(searchRepo ? searchedRepositories : repositories)?.map(
              (repo: GitHubRepository) => (
                <li
                  key={repo.html_url || repo.full_name}
                  onClick={() => {
                    setFormData((prev: FormDataType) => ({
                      ...prev,
                      github_repo: searchRepo
                        ? `https://github.com/${repo.full_name}`
                        : repo.html_url,
                    }));
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-base cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {repo.name || repo.full_name}
                </li>
              )
            )}
          </ul>

          {/* Pagination Buttons */}
          <div className="flex justify-between items-center p-4 border-t dark:border-gray-600">
            <button
              disabled={repoPage === 1}
              onClick={() => setRepoPage(repoPage - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 
            disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={() => setRepoPage(repoPage + 1)}
              disabled={
                !repositories ||
                repositories.length === 0 ||
                repositories.length < 30
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 
            disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectRepository;
