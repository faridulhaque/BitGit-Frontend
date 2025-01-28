export interface GitHubRepository {
  name: string;
  full_name: string;
  html_url: string;
}
export interface FormDataType {
  name: string;
  ticker: string;
  description: string;
  image: string;
  twitter_url: string;
  custom_merge_score_allowed: boolean;
  github_repo: string;
}
