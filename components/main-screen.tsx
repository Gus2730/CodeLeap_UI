import { useState } from "react";
import { CreatePostForm } from "./create-post-form";
import { PostsList } from "./posts-list";

export function MainScreen() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[800px]">
        <header className="bg-primary px-6 py-7">
          <h1 className="text-[22px] font-bold text-primary-foreground">
            CodeLeap Network
          </h1>
        </header>
        <main className="flex flex-col gap-6 p-6">
          <CreatePostForm onPostCreated={handlePostCreated} />
          <PostsList refreshTrigger={refreshTrigger} />
        </main>
      </div>
    </div>
  );
}
