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
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-6 text-[22px] font-bold text-card-foreground">
        {"What's on your mind?"}
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
        <div className="mb-4">
          <label className="mb-2 block text-base text-card-foreground">Content</label>
          <Textarea
            placeholder="Content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[74px] resize-none border-border bg-card text-card-foreground placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isDisabled}
            className="h-8 min-w-[111px] bg-primary text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
