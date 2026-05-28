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
      <div className="mx-auto max-w-[900px]">
        {/* Header with gradient, cyan top border, and shadow - slide down + fade in (300ms) */}
        <header className="relative border-t-4 border-cyan-500 bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6 shadow-lg animate-slide-down">
          <h1 className="text-4xl font-bold tracking-tighter text-white font-sans">
            CodeLeap Network
          </h1>
        </header>
        <main className="flex flex-col gap-6 p-6">
          {/* Create Form fades in after header (200ms delay) */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CreatePostForm onPostCreated={handlePostCreated} />
          </div>
          {/* Posts list with staggered cascade animations */}
          <PostsList refreshTrigger={refreshTrigger} />
        </main>
      </div>
    </div>
  );
}
