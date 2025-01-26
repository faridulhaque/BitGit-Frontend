import GitHubLogin from "@/components/home/GitHubLogin";
import Navbar from "@/components/Shared/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <GitHubLogin></GitHubLogin>
    </div>
  );
}
