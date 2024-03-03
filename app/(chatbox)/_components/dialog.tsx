"use client";

import { useMutation, useQuery } from "convex/react";
import { useSessionId } from "../_hooks/use-session-id";
import { api } from "@/convex/_generated/api";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { SendIcon } from "./send-icon";
import { SizeIcon } from "./size-icon";
import { CloseIcon } from "./close-icon";
import { InfoCircled } from "./info-circled";
import { TrashIcon } from "./trash-icon";
import { cn } from "@/lib/utils";

interface DialogProps {
  infoMessage: React.ReactNode;
  isOpen: boolean;
  name: string;
  welcomeMessage: string;
  onClose: () => void;
}

export const Dialog = ({
  infoMessage,
  isOpen,
  name,
  onClose,
  welcomeMessage,
}: DialogProps) => {
  const sessionId = useSessionId();

  const remoteMessages = useQuery(api.messages.list, { sessionId });
  const messages = useMemo(
    () =>
      [{ isViewer: false, text: welcomeMessage, _id: "0" }].concat(
        (remoteMessages ?? []) as {
          isViewer: boolean;
          text: string;
          _id: string;
        }[],
      ),
    [remoteMessages, welcomeMessage],
  );

  const sendMessage = useMutation(api.messages.send);
  const clearMesages = useMutation(api.messages.clear);

  const [expanded, setExpanded] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  const [input, setInput] = useState("");

  const handleExpand = () => {
    setExpanded(!expanded);
    setScrolled(false);
  };

  const handleSend = async (event: FormEvent) => {
    event.preventDefault();
    await sendMessage({ message: input, sessionId });
    setInput("");
    setScrolled(false);
  };

  const handleClearMessages = async () => {
    await clearMesages({ sessionId });
    setScrolled(false);
  };

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScrolled) {
      return;
    }
    // Using `setTimeout` to make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  }, [messages, isScrolled]);

  return (
    <div
      className={
        // (isOpen ? "fixed" : "hidden") +
        // "z-[99999] flex flex-col rounded-xl bg-white text-black dark:bg-black dark:text-white " +
        // "bottom-0 right-0 m-4 max-w-[calc(100%-2rem)] overflow-hidden transition-all " +
        // "shadow-[0px_5px_40px_rgba(0,0,0,0.16),0_20px_25px_-5px_rgb(0,0,0,0.1)] " +
        // "dark:shadow-[0px_5px_40px_rgba(0,0,0,0.36),0_20px_25px_-5px_rgb(0,0,0,0.3)] " +
        // (expanded
        //   ? "left-0 top-0 z-[1000]"
        //   : "h-[30rem] w-full sm:min-w-[25rem] sm:max-w-[25rem]")

        cn(
          " z-[99999] flex flex-col rounded-xl bg-white text-black dark:bg-black dark:text-white " +
            "bottom-16 right-0 m-4 max-w-[calc(100%-2rem)] overflow-hidden transition-all " +
            "shadow-[0px_5px_40px_rgba(0,0,0,0.16),0_20px_25px_-5px_rgb(0,0,0,0.1)] " +
            "dark:shadow-[0px_5px_40px_rgba(0,0,0,0.36),0_20px_25px_-5px_rgb(0,0,0,0.3)]",
          isOpen ? "fixed" : "hidden",
          expanded
            ? "left-0 top-0 z-[1000]"
            : "h-[30rem] w-full sm:min-w-[25rem] sm:max-w-[25rem]",
        )
      }
    >
      <div className="flex justify-end">
        <button
          className="group cursor-pointer border-none bg-transparent p-0 px-2 pt-2 hover:text-neutral-500 dark:hover:text-neutral-300"
          onClick={() => void handleClearMessages()}
        >
          <InfoCircled className="h-5 w-5" />
          <span
            className={
              "invisible absolute z-50 cursor-auto text-base text-black group-hover:visible dark:text-white " +
              "left-8 right-8 top-12 rounded-md bg-white p-2 text-center shadow-[0px_5px_12px_rgba(0,0,0,0.32)] dark:bg-neutral-700"
            }
          >
            {infoMessage}
          </span>
        </button>
        <button
          className="cursor-pointer border-none bg-transparent p-0 px-2 pt-2 hover:text-neutral-500 dark:hover:text-neutral-300"
          onClick={() => void handleClearMessages()}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
        <button
          className="cursor-pointer border-none bg-transparent p-0 px-2 pt-2 hover:text-neutral-500 dark:hover:text-neutral-300"
          onClick={handleExpand}
        >
          <SizeIcon className="h-5 w-5" />
        </button>
        <button
          className="cursor-pointer border-none bg-transparent p-0 px-2 pt-2 hover:text-neutral-500 dark:hover:text-neutral-300"
          onClick={onClose}
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>
      <div
        className="mx-2 flex flex-grow flex-col gap-2 overflow-scroll rounded-lg pb-2"
        ref={listRef}
        onWheel={() => {
          setScrolled(true);
        }}
      >
        {remoteMessages === undefined ? (
          <>
            <div className="h-5 animate-pulse rounded-md bg-black/10" />
            <div className="h-9 animate-pulse rounded-md bg-black/10" />
          </>
        ) : (
          messages.map((message) => (
            <div key={message._id}>
              <div
                className={
                  "text-sm text-neutral-400 " +
                  (message.isViewer && !expanded ? "text-right" : "")
                }
              >
                {message.isViewer ? <>You</> : <>{name}</>}
              </div>
              {message.text === "" ? (
                <div className="h-9 animate-pulse rounded-md bg-black/10" />
              ) : (
                <div
                  className={
                    "w-full whitespace-pre-wrap rounded-xl px-3 py-2 " +
                    (message.isViewer
                      ? "bg-neutral-200 dark:bg-neutral-800 "
                      : "bg-neutral-100 dark:bg-neutral-900 ") +
                    (message.isViewer && !expanded
                      ? "rounded-tr-none"
                      : "rounded-tl-none")
                  }
                >
                  {message.text}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <form
        className="flex border-0 border-t-[1px] border-solid border-t-neutral-200 dark:border-t-neutral-800"
        onSubmit={(event) => void handleSend(event)}
      >
        <input
          className="w-full border-none bg-white py-3 pl-4 text-[1rem] outline-none dark:bg-black"
          autoFocus
          name="message"
          placeholder="Send a message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          disabled={input === ""}
          className="border-0 bg-transparent px-4 py-3 enabled:cursor-pointer enabled:hover:text-sky-500"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};
