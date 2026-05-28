import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updatePost } from "@/lib/api";
import type { Post } from "@/lib/api";

interface EditModalProps {
  post: Post;
  onClose: () => void;
  onUpdated: () => void;
}

export function EditModal({ post, onClose, onUpdated }: EditModalProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsLoading(true);
    try {
      await updatePost(post.id, {
        title: title.trim(),
        content: content.trim(),
      });
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Failed to update post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !title.trim() || !content.trim() || isLoading;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md">
      <div className="animate-slide-up w-full max-w-[660px] rounded-xl border-t-4 border-t-cyan-500 border border-slate-200 bg-white p-8 shadow-2xl">
        <h2 className="mb-8 text-2xl font-bold font-sans tracking-tighter text-slate-900">
          Edit item
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Title field with improved spacing */}
          <div className="mb-6">
            <label className="mb-3 block text-base font-sans font-semibold text-slate-700">Title</label>
            <Input
              type="text"
              placeholder="Hello world"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Content field with improved spacing */}
          <div className="mb-8">
            <label className="mb-3 block text-base font-sans font-semibold text-slate-700">Content</label>
            <Textarea
              placeholder="Share your thoughts, ideas, or questions..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[140px] resize-none"
            />
          </div>
          {/* Button group with improved spacing */}
          <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
            <Button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              variant="outline"
              className="h-10 min-w-[120px] border-2 border-slate-300 font-sans font-semibold text-slate-900 hover:border-cyan-500 hover:bg-slate-50 transition-smooth active:scale-95"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isDisabled}
              className="h-10 min-w-[120px] bg-emerald-500 font-sans font-semibold uppercase text-white hover:bg-emerald-600 transition-smooth hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
