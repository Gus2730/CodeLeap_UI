import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/lib/api";
import { useUsername } from "@/lib/user-store";

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  const username = useUsername();
  const isOwner = username === post.username;

  const timeAgo = formatDistanceToNow(new Date(post.created_datetime), {
    addSuffix: true,
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between bg-primary px-6 py-4">
        <h3 className="text-[22px] font-bold text-primary-foreground">
          {post.title}
        </h3>
        {isOwner && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => onDelete(post)}
              className="text-primary-foreground transition-opacity hover:opacity-80"
              aria-label="Delete post"
            >
              <MdDeleteForever className="h-5 w-5" />
            </button>
            <button
              onClick={() => onEdit(post)}
              className="text-primary-foreground transition-opacity hover:opacity-80"
              aria-label="Edit post"
            >
              <BiEdit className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-lg font-bold text-muted-foreground">
            @{post.username}
          </span>
          <span className="text-lg text-muted-foreground">{timeAgo}</span>
        </div>
        <p className="whitespace-pre-wrap text-lg text-card-foreground">
          {post.content}
        </p>
      </div>
    </div>
  );
}
