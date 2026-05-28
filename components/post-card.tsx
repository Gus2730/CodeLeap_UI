import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/lib/api";
import { useUsername } from "@/lib/user-store";
import { useState } from "react";

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  const username = useUsername();
  const isOwner = username === post.username;
  const [isShaking, setIsShaking] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(post.created_datetime), {
    addSuffix: true,
  });

  const handleDeleteHover = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  return (
    <div className="overflow-hidden rounded-lg border-2 border-cyan-500 bg-white shadow-xl transition-smooth hover:shadow-2xl hover:-translate-y-1">
      {/* Post Header with navy background and cyan border */}
      <div className="flex items-center justify-between border-b-2 border-cyan-500 bg-slate-900 px-6 py-4">
        <h3 className="text-2xl font-bold text-white font-sans pb-1 border-b-2 border-cyan-500 inline-block">
          {post.title}
        </h3>
        {isOwner && (
          <div className="flex items-center gap-4">
            {/* Delete button: subtle shake animation on hover (warns user) */}
            <button
              onClick={() => onDelete(post)}
              onMouseEnter={handleDeleteHover}
              className={`text-white transition-smooth hover:scale-125 hover:text-red-400 ${
                isShaking ? 'animate-shake' : ''
              }`}
              aria-label="Delete post"
              title="Delete post (warning)"
            >
              <MdDeleteForever className="h-5 w-5" />
            </button>
            {/* Edit button: cyan glow effect on hover */}
            <button
              onClick={() => onEdit(post)}
              className="text-white transition-smooth hover:scale-125 hover:text-cyan-300 hover:animate-glow"
              aria-label="Edit post"
              title="Edit post"
            >
              <BiEdit className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
      {/* Post Metadata - improved spacing and typography */}
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3 bg-gray-50">
        <span className="text-sm font-mono text-slate-600">
          <span className="text-cyan-600">@</span>{post.username}
        </span>
        <span className="text-xs font-mono text-slate-500">{timeAgo}</span>
      </div>
      {/* Post Content - generous padding and spacing */}
      <div className="p-8 bg-slate-50">
        <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-900 font-serif">
          {post.content}
        </p>
      </div>
    </div>
  );
}
