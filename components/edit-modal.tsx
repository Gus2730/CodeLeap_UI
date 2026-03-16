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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[660px] rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-6 text-[22px] font-bold text-card-foreground">
          Edit item
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-base text-card-foreground">Title</label>
            <Input
              type="text"
              placeholder="Hello world"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-8 border-border bg-card text-card-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-base text-card-foreground">Content</label>
            <Textarea
              placeholder="Content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[74px] resize-none border-border bg-card text-card-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              variant="outline"
              className="h-8 min-w-[111px] border-border bg-card text-card-foreground hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isDisabled}
              className="h-8 min-w-[111px] bg-[#47b960] text-primary-foreground hover:bg-[#47b960]/90"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
