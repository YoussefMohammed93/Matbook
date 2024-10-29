import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import LoadingButton from "../LoadingButton";
import { ReplyData } from "@/lib/types";

interface DeleteReplyDialogProps {
  reply: ReplyData;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function DeleteReplyDialog({
  reply,
  open,
  onClose,
  onConfirm,
  loading,
}: DeleteReplyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete reply?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this reply? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={onConfirm}
            loading={loading}
          >
            Delete
          </LoadingButton>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
