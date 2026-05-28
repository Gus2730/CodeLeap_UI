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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md">
      <div className="animate-slide-up w-full max-w-[660px] rounded-xl border-t-4 border-t-red-500 border border-slate-200 bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold font-sans tracking-tighter text-slate-900">
          Are you sure you want to delete this item?
        </h2>
        <p className="mb-8 text-base font-serif text-slate-600">
          This action cannot be undone. The post will be permanently removed.
        </p>
        <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
          <Button
            onClick={onClose}
            disabled={isLoading}
            variant="outline"
            className="h-10 min-w-[120px] border-2 border-slate-300 font-sans font-semibold text-slate-900 hover:border-cyan-500 hover:bg-slate-50 transition-smooth active:scale-95"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="h-10 min-w-[120px] bg-red-500 font-sans font-semibold uppercase text-white hover:bg-red-600 transition-smooth hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
