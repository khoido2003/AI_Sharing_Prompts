"use client";

import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { AiChatDialog } from "./_components/ai-chat-dialog";

interface ConvexAiChatProps {
  convexUrl: string;
  name: string;
  infoMessage: string;
  welcomeMessage: string;
  renderTrigger: (onClick: () => void) => React.ReactNode;
}

export const ConvexAiChat = ({
  convexUrl,
  infoMessage,
  name,
  renderTrigger,
  welcomeMessage,
}: ConvexAiChatProps) => {
  const [hasOpened, setHasOpened] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return (
    <div className="">
      {renderTrigger(() => {
        setHasOpened(true);
        setDialogOpen((dialogOpen) => !dialogOpen);
      })}

      {hasOpened
        ? createPortal(
            <AiChatDialog
              convexUrl={convexUrl}
              infoMessage={infoMessage}
              isOpen={dialogOpen}
              name={name}
              welcomeMessage={welcomeMessage}
              onClose={handleCloseDialog}
            />,

            document.body,
          )
        : null}
    </div>
  );
};
