"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons/icons";
import { Trash } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure?"
      desription="This action cannot be undone!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-8 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
          {loading ? (
            <div className="flex items-center gap-2">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </div>
          ) : (
            <div className="flex items-center gap-x-2">
              <Trash className="h-4 w-4" />
              Delete
            </div>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
