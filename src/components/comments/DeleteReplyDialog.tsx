import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ReplyData } from "@/lib/types";

interface DeleteReplyDialogProps {
  reply?: ReplyData;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function DeleteReplyDialog({
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
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? <Loader2 className="size-5 animate-spin" /> : "Delete"}
          </Button>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
