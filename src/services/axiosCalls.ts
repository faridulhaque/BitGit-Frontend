import { IUser } from "@/types/userTypes";
import { baserUrl } from "./constant";
import { GitHubWebhook } from "@/types/coinTypes";

export const fetchRepositories = async (
  user: IUser,
  repoPage: number,
  search: string
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

export const checkWebHook = async (user: IUser | null, token: string) => {
  if (!user) return;
  const apiUrl = `https://api.github.com/repos/${user.github_username.replace(
    "https://github.com/",
    ""
  )}/hooks`;

  console.log(token);

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const hooks = await response.json();
    console.log(hooks);
    const expectedUrl = `${baserUrl}/bit-git`;

    const isExisted =
      hooks.find(
        (hook: GitHubWebhook) => hook.config.url === expectedUrl && hook.active
      ) || false;

    return isExisted;
  } catch (error) {
    console.error("Error checking webhook:", error);
    return false;
  }
};
