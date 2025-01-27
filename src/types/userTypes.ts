export interface IUser {
  id: string;
  name?: string;
  profile_image?: string;
  wallet_address?: string;
  role: string;
  github_username: string;
  reward?: number;
}

export enum UserRole {
  Contributor = "contributor",
  Creator = "creator",
}
