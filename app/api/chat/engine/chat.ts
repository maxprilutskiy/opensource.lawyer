import {
  ContextChatEngine,
  LLM,
  BaseEmbedding,
  VectorStoreIndex,
} from "llamaindex";

export async function createChatEngine(llm: LLM, embedding: BaseEmbedding, vsi: VectorStoreIndex) {
  const retriever = vsi.asRetriever();
  return new ContextChatEngine({
    retriever,
    contextSystemPrompt({ context }) {
      return context || '';
    },
    chatModel: llm,
  });
}
