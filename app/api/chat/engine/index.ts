import {
  LLM,
  serviceContextFromDefaults,
  SimpleDocumentStore,
  storageContextFromDefaults,
  VectorStoreIndex,
  BaseEmbedding,
} from "llamaindex";
import { CHUNK_OVERLAP, CHUNK_SIZE, STORAGE_CACHE_DIR } from "./shared";

export async function getDataSource(llm: LLM, embedModel: BaseEmbedding) {
  const serviceContext = serviceContextFromDefaults({
    llm,
    embedModel,
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });
  const storageContext = await storageContextFromDefaults({
    persistDir: `${STORAGE_CACHE_DIR}`,
  });

  const numberOfDocs = Object.keys(
    (storageContext.docStore as SimpleDocumentStore).toDict(),
  ).length;
  console.log(`Number of documents in storage: ${numberOfDocs}`);
  if (numberOfDocs === 0) {
    return null;
  }
  return await VectorStoreIndex.init({
    storageContext,
    serviceContext,
  });
}
