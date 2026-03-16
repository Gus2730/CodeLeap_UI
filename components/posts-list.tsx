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
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-destructive">Failed to load posts. Please try again.</p>
      </div>
    );
  }

  if (sortedPosts.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-muted-foreground">No posts yet. Be the first to post!</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {sortedPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={setPostToEdit}
            onDelete={setPostToDelete}
          />
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
