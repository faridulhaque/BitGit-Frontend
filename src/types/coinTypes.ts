import { IUser } from "./userTypes";

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
  website_url: string;
  custom_merge_score_allowed: boolean;
  github_repo: string;
}

export interface GitHubWebhook {
  id: number;
  type: string;
  name: string;
  active: boolean;
  config: {
    url: string;
    content_type: string;
    insecure_ssl: string;
  };
}

export interface ICoin {
  id: string;
  name: string;
  ticker: string;
  description: string;
  image: string;
  twitter_url: string;
  website_url: string;
  custom_merge_score_allowed: boolean;
  creator: IUser; 
  market_cap: string;
}