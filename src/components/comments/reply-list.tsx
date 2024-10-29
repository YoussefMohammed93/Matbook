import Reply from "./Reply";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ReplyData } from "@/lib/types";
import { useEffect, useState } from "react";
import DeleteReplyDialog from "./DeleteReplyDialog";
import { useDeleteReplyMutation } from "./mutations";

interface ReplyListProps {
  commentId: string;
  replies: ReplyData[];
}

export default function ReplyList({
  commentId,
  replies: initialReplies,
}: ReplyListProps) {
  const [fetchedReplies, setFetchedReplies] = useState<ReplyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [replies, setReplies] = useState<ReplyData[]>(initialReplies);
  const [replyToDelete, setReplyToDelete] = useState<ReplyData | null>(null);

  const MAX_REPLIES_DISPLAY = 5;

  const { mutateAsync: deleteReply, status: deleteStatus } =
    useDeleteReplyMutation();
  const isLoadingDelete = deleteStatus === "pending";

  useEffect(() => {
    const fetchReplies = async () => {
      setLoading(true);
      const res = await fetch(`/api/comments/${commentId}/replies`);
      if (res.ok) {
        const data: ReplyData[] = await res.json();

        const newFetchedReplies = data.filter(
          (fetchedReply) =>
            !replies.some(
              (existingReply) => existingReply.id === fetchedReply.id,
            ),
        );
        setFetchedReplies(newFetchedReplies);
      }
      setLoading(false);
    };

    fetchReplies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId]);

  const combinedReplies = [...replies, ...fetchedReplies].reduce<ReplyData[]>(
    (acc, reply) => {
      if (!acc.some((existingReply) => existingReply.id === reply.id)) {
        acc.push(reply);
      }
      return acc;
    },
    [],
  );

  const visibleReplies = showAll
    ? combinedReplies
    : combinedReplies.slice(0, MAX_REPLIES_DISPLAY);

  const handleDeleteReply = (reply: ReplyData) => {
    setReplyToDelete(reply);
  };

  const confirmDeleteReply = async () => {
    if (!replyToDelete) return;
    try {
      await deleteReply({ replyId: replyToDelete.id, commentId });
      setReplies((prevReplies) =>
        prevReplies.filter((reply) => reply.id !== replyToDelete.id),
      );
      setFetchedReplies((prevFetchedReplies) =>
        prevFetchedReplies.filter((reply) => reply.id !== replyToDelete.id),
      );
      setReplyToDelete(null);
    } catch (error) {
      console.error("Failed to delete reply:", error);
    }
  };

  const cancelDelete = () => {
    setReplyToDelete(null);
  };

  return (
    <div className="mt-5 space-y-2">
      {loading && <Loader2 className="size-5 animate-spin" />}
      {combinedReplies.length === 0 && !loading ? (
        <p className="text-muted-foreground">No replies yet</p>
      ) : (
        <>
          {visibleReplies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              onDelete={() => handleDeleteReply(reply)}
            />
          ))}
          {!showAll && combinedReplies.length > MAX_REPLIES_DISPLAY && (
            <Button variant="link" onClick={() => setShowAll(true)}>
              Show more replies
            </Button>
          )}
        </>
      )}

      {isLoadingDelete && <Loader2 className="size-5 animate-spin" />}

      {replyToDelete && (
        <DeleteReplyDialog
          reply={replyToDelete}
          open={!!replyToDelete}
          onClose={cancelDelete}
          onConfirm={confirmDeleteReply}
          loading={isLoadingDelete}
        />
      )}
    </div>
  );
}
