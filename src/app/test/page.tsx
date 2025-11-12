import AddWebsitePage from "@/components/custom/add-website";
import Sidebar from "@/components/custom/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-20 flex-1 p-8">
        <AddWebsitePage />
      </main>
    </div>
  );
}
