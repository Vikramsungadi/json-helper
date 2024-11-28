import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // ShadCN Dialog

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  name: string;
  setName: (name: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  name,
  setName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent className="p-6 rounded-md w-1/3">
        <DialogHeader>
          <DialogTitle>Save as Favorite</DialogTitle>
        </DialogHeader>
        <input
          type="text"
          placeholder="Enter favorite name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mt-4"
        />
        <DialogFooter>
          <button
            className="bg-gray-500 text-white p-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={onSave}
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
