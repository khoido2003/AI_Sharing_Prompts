import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
import { internal } from "./_generated/api";

export const list = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    return (
      await ctx.db
        .query("messages")
        .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
        .collect()
    ).map(({ message: { data, type }, ...fields }) => ({
      ...fields,
      isViewer: type === "human",
      text: data.content,
    }));
  },
});

export const send = mutation({
  args: {
    message: v.string(),
    sessionId: v.string(),
  },
  handler: async (ctx, { message, sessionId }) => {
    await ctx.scheduler.runAfter(0, internal.serve.answer, {
      sessionId,
      message,
    });
  },
});

export const clear = mutation({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("bySessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    await Promise.all(messages.map((message) => ctx.db.delete(message._id)));
  },
});
