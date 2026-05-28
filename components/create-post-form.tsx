import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/api";
import { useUsername } from "@/lib/user-store";

interface CreatePostFormProps {
  onPostCreated: () => void;
}

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const username = useUsername();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !username) return;

    setIsLoading(true);
    try {
      await createPost({
        username,
        title: title.trim(),
        content: content.trim(),
      });
      setTitle("");
      setContent("");
      onPostCreated();
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !title.trim() || !content.trim() || isLoading;

  return (
    <div className="rounded-lg border-2 border-cyan-500 bg-white p-8 shadow-lg">
      {/* Section header with cyan accent dot */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-cyan-500" />
        <h2 className="text-2xl font-bold font-sans tracking-tighter text-slate-900">
          What&apos;s on your mind?
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Title field with improved spacing */}
        <div className="mb-6">
          <label className="mb-3 block text-base font-sans font-semibold text-slate-700">
            Title
          </label>
          <Input
            type="text"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Content field with improved spacing */}
        <div className="mb-8">
          <label className="mb-3 block text-base font-sans font-semibold text-slate-700">
            Content
          </label>
          <Textarea
            placeholder="Share your thoughts, ideas, or questions..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[140px] resize-none"
          />
        </div>
        {/* Submit button with hover scale effect */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isDisabled}
            className="h-11 min-w-[140px] bg-cyan-500 font-sans font-semibold uppercase text-white hover:bg-cyan-600 transition-smooth hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
