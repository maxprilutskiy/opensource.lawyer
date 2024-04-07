import {
  ServiceContext,
  serviceContextFromDefaults,
  storageContextFromDefaults,
  VectorStoreIndex,
  Settings,
  TogetherEmbedding,
  SimpleVectorStore,
} from "llamaindex";

import * as dotenv from "dotenv";

import { getDocuments } from "./loader";
import { CHUNK_OVERLAP, CHUNK_SIZE, STORAGE_CACHE_DIR } from "./shared";
import { createEmbeddingsModel, createModel } from "./llm";

// Load environment variables from local .env file
dotenv.config();

async function getRuntime(func: any) {
  const start = Date.now();
  await func();
  const end = Date.now();
  return end - start;
}

async function generateDatasource(serviceContext: ServiceContext) {
  console.log(`Generating storage context...`);
  // Split documents, create embeddings and store them in the storage context
  const ms = await getRuntime(async () => {
    const documents = await getDocuments();
    const storageContext = await storageContextFromDefaults({
      persistDir: STORAGE_CACHE_DIR,
    });
    const vsi = await VectorStoreIndex.fromDocuments(documents, {
      logProgress: true,
      serviceContext,
      storageContext,
    });
  });
  console.log(`Storage context successfully generated in ${ms / 1000}s.`);
}

(async () => {
  const llm = createModel();
  const embeddingsLLM = createEmbeddingsModel();

  const serviceContext = serviceContextFromDefaults({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
    llm,
    embedModel: embeddingsLLM,
  });

  await generateDatasource(serviceContext);
  console.log("Finished generating storage.");
})();
