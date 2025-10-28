"use client";

import { useState, useEffect } from "react";
import { Send, Heart, MessageCircle } from "lucide-react";
import { baseURL } from "@/config/baseUrl";

interface Comment {
  id: number;
  name: string;
  comment: string;
  likes: number;
  liked?: boolean;
  created_at: string;
}

interface CommentSectionProps {
  pollId: number;
}

// ⏳ Helper function to show "time ago" style
function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];

  for (const [secondsInUnit, unit] of intervals) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

export default function CommentSection({ pollId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // 🟢 Fetch comments for this specific poll
  useEffect(() => {
    if (!pollId) return;

    const fetchComments = async () => {
      try {
        const res = await fetch(`${baseURL}/api/comments/${pollId}`);
        if (!res.ok) throw new Error("Failed to load comments");

        const data = await res.json();
        const likedIds = JSON.parse(localStorage.getItem("likedComments") || "[]");

        const updated = data.map((c: Comment) => ({
          ...c,
          liked: likedIds.includes(c.id),
        }));

        setComments(updated);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchComments();
  }, [pollId]);

  // 🟣 Handle new comment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${baseURL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment, poll_id: pollId }),
      });

      if (!res.ok) throw new Error("Failed to post comment");

      const newComment = await res.json();
      setComments((prev) => [{ ...newComment, liked: false }, ...prev]);
      setName("");
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Handle like (1 like per person)
  const handleLike = async (index: number) => {
    const comment = comments[index];
    if (comment.liked) return;

    const updatedLikes = comment.likes + 1;

    setComments((prev) =>
      prev.map((c, i) => (i === index ? { ...c, likes: updatedLikes, liked: true } : c))
    );

    const likedIds = JSON.parse(localStorage.getItem("likedComments") || "[]");
    likedIds.push(comment.id);
    localStorage.setItem("likedComments", JSON.stringify(likedIds));

    try {
      await fetch(`${baseURL}/api/comments/${comment.id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: updatedLikes }),
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center space-x-2 p-4 border-b bg-gray-50">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
      </div>

      {/* Comment Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 p-4 border-b border-gray-100 bg-gray-50"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Posting..." : "Submit"}
          {!loading && <Send className="w-4 h-4 ml-2" />}
        </button>
      </form>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {fetching ? (
          <p className="text-gray-500 text-sm text-center py-6">
            Loading comments...
          </p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((c, i) => (
            <div
              key={c.id}
              className="bg-gray-50 border border-gray-100 rounded-xl p-3 transition hover:shadow-sm"
            >
              <div className="flex items-center mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold mr-2">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-semibold text-gray-800">{c.name}</span>
                <span className="text-gray-500 text-xs ml-2">
                  {timeAgo(c.created_at)}
                </span>
              </div>

              <p className="text-gray-700 text-sm mb-3">{c.comment}</p>

              <button
                onClick={() => handleLike(i)}
                disabled={c.liked}
                className={`flex items-center text-sm transition ${
                  c.liked
                    ? "text-red-500 cursor-not-allowed"
                    : "text-gray-500 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`w-4 h-4 mr-1 transition ${
                    c.liked ? "fill-red-500 text-red-500" : ""
                  }`}
                />
                {c.likes > 0
                  ? `${c.likes} Like${c.likes > 1 ? "s" : ""}`
                  : "Like"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
