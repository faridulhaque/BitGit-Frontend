import { IUser } from "@/types/userTypes";

export const fetchRepositories = async (
  user: IUser,
  repoPage: number,
  search: string,
) => {
  if (user?.github_username) {
    try {
      let response;

      if (search) {
        response = await fetch(
          `https://api.github.com/search/repositories?q=${search}+user:${user.github_username}&page=${repoPage}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.items;
      } else {
        response = await fetch(
          `https://api.github.com/users/${user.github_username}/repos?page=${repoPage}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  }
};
