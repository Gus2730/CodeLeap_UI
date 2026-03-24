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
    <div className="overflow-hidden rounded-lg border-2 border-cyan-500 bg-white shadow-xl transition-all duration-200 hover:shadow-2xl hover:-translate-y-1">
      {/* Post Header with navy background and cyan border */}
      <div className="flex items-center justify-between border-b-2 border-cyan-500 bg-slate-900 px-6 py-4">
        <h3 className="text-2xl font-bold text-white font-display pb-1 border-b-2 border-cyan-500 inline-block">
          {post.title}
        </h3>
        {isOwner && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => onDelete(post)}
              className="text-white transition-all duration-150 hover:scale-110 hover:text-red-400"
              aria-label="Delete post"
            >
              <MdDeleteForever className="h-5 w-5" />
            </button>
            <button
              onClick={() => onEdit(post)}
              className="text-white transition-all duration-150 hover:scale-110 hover:text-cyan-400"
              aria-label="Edit post"
            >
              <BiEdit className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      {/* Post Metadata */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3 bg-gray-50">
        <span className="text-sm font-mono text-slate-600">
          <span className="text-cyan-600">@</span>{post.username}
        </span>
        <span className="text-xs font-mono text-slate-500">{timeAgo}</span>
      </div>
      {/* Post Content */}
      <div className="p-6 bg-slate-50">
        <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-900 font-body">
          {post.content}
        </p>
      </div>
    </div>
  );
}
