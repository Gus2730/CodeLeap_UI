import { useState, useCallback } from "react";
import useSWR from "swr";
import { getPosts } from "@/lib/api";
import type { Post } from "@/lib/api";
import { PostCard } from "./post-card";
import { DeleteModal } from "./delete-modal";
import { EditModal } from "./edit-modal";
import { Spinner } from "@/components/ui/spinner";

interface PostsListProps {
  refreshTrigger: number;
}

export function PostsList({ refreshTrigger }: PostsListProps) {
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const { data, error, isLoading, mutate } = useSWR(
    ["posts", refreshTrigger],
    () => getPosts(100, 0),
    {
      refreshInterval: 5000,
    }
  );

  const handleRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  const sortedPosts = data?.results
    ? [...data.results].sort(
        (a, b) =>
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime()
      )
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner className="h-8 w-8 text-cyan-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border-2 border-red-500 bg-red-50 p-6 text-center">
        <h3 className="mb-2 text-lg font-bold font-sans text-red-700">
          Oops, something went wrong
        </h3>
        <p className="font-serif text-red-600">Failed to load posts. Please try again.</p>
      </div>
    );
  }

  if (sortedPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 rounded-lg border-2 border-dashed border-cyan-500 bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Cyan accent decoration */}
        <div className="mb-6 h-1 w-16 bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full" />
        
        {/* Large typography - IBM Plex Mono */}
        <h2 className="text-center text-4xl font-bold font-sans text-slate-900 mb-3 tracking-tight">
          No posts yet
        </h2>
        
        {/* Encouraging message in serif body font */}
        <p className="text-center text-lg font-serif text-slate-600 max-w-md leading-relaxed mb-8">
          Be the first to share something amazing with the CodeLeap community. Start the conversation!
        </p>
        
        {/* Bottom accent */}
        <div className="h-1 w-12 bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {sortedPosts.map((post, index) => (
          <div
            key={post.id}
            className="animate-card-fade-in"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <PostCard
              post={post}
              onEdit={setPostToEdit}
              onDelete={setPostToDelete}
            />
          </div>
        ))}
      </div>

      {postToDelete && (
        <DeleteModal
          post={postToDelete}
          onClose={() => setPostToDelete(null)}
          onDeleted={handleRefresh}
        />
      )}

      {postToEdit && (
        <EditModal
          post={postToEdit}
          onClose={() => setPostToEdit(null)}
          onUpdated={handleRefresh}
        />
      )}
    </>
  );
}
