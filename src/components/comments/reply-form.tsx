import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ReplyData } from "@/lib/types";
import { useToast } from "../ui/use-toast";
import { useSession } from "@/app/(main)/SessionProvider";

interface ReplyFormProps {
  commentId: string;
  onNewReply: (reply: ReplyData) => void;
}

export default function ReplyForm({ commentId, onNewReply }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSession();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !user) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/comments/${commentId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        console.error("Failed to submit reply");
        throw new Error("Failed to submit reply");
      }

      const savedReply: ReplyData = await res.json();

      onNewReply(savedReply);

      toast({ description: "Reply published successfully!" });
      setContent("");
    } catch (error) {
      console.error("Error submitting reply:", error);
      toast({
        variant: "destructive",
        description: "Failed to submit reply. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <form onSubmit={handleSubmit} className="mt-2 flex w-full space-x-2">
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a reply..."
          required
          className="w-full flex-grow"
        />
        <Button type="submit" variant="default" disabled={loading}>
          {loading ? <Loader2 className="size-5 animate-spin" /> : "Reply"}
        </Button>
      </form>
    </div>
  );
}
