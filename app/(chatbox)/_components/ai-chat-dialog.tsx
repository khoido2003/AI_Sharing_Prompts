"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useMemo } from "react";
import { Dialog } from "./dialog";

interface AiChatDialogProps {
  convexUrl: string;
  infoMessage: React.ReactNode;
  isOpen: boolean;
  name: string;
  welcomeMessage: string;
  onClose: () => void;
}

export const AiChatDialog = ({
  convexUrl,
  infoMessage,
  isOpen,
  name,
  onClose,
  welcomeMessage,
}: AiChatDialogProps) => {
  const client = useMemo(() => new ConvexReactClient(convexUrl), [convexUrl]);

  return (
    <ConvexProvider client={client}>
      <Dialog
        infoMessage={infoMessage}
        isOpen={isOpen}
        name={name}
        welcomeMessage={welcomeMessage}
        onClose={onClose}
      />
    </ConvexProvider>
  );
};
