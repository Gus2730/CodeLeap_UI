import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/api";
import type { Post } from "@/lib/api";

interface DeleteModalProps {
  post: Post;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteModal({ post, onClose, onDeleted }: DeleteModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deletePost(post.id);
      onDeleted();
      onClose();
    } catch (error) {
      console.error("Failed to delete post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[660px] rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-10 text-[22px] font-bold text-card-foreground">
          Are you sure you want to delete this item?
        </h2>
        <div className="flex justify-end gap-4">
          <Button
            onClick={onClose}
            disabled={isLoading}
            variant="outline"
            className="h-8 min-w-[111px] border-border bg-card text-card-foreground hover:bg-secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="h-8 min-w-[111px] bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
