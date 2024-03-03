import { v } from "convex/values";
import { internalAction } from "./_generated/server";

import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ConvexChatMessageHistory } from "langchain/stores/message/convex";
import { ConvexVectorStore } from "langchain/vectorstores/convex";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";

const OPENAI_MODEL = "gpt-3.5-turbo";

export const answer = internalAction({
  args: { sessionId: v.string(), message: v.string() },
  handler: async (ctx, { sessionId, message }) => {
    // Vector store
    const vectorStore = new ConvexVectorStore(new OpenAIEmbeddings(), {
      ctx,
    });

    // AI model
    const model = new ChatOpenAI({ modelName: OPENAI_MODEL });

    const memory = new BufferMemory({
      chatHistory: new ConvexChatMessageHistory({ sessionId, ctx }),
      memoryKey: "chat_history",
      outputKey: "text",
      returnMessages: true,
    });

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      { memory },
    );

    await chain.call({ question: message });
  },
});
