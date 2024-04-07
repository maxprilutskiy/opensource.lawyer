import { TogetherLLM, TogetherEmbedding } from 'llamaindex';

export function createModel() {
  return new TogetherLLM({
    apiKey: process.env.TOGETHER_API_KEY,
    model: 'mistralai/Mistral-7B-Instruct-v0.2'
  });
}

export function createEmbeddingsModel() {
  return new TogetherEmbedding({
    apiKey: process.env.TOGETHER_API_KEY,
    model: 'mistralai/Mistral-7B-Instruct-v0.2'
  });
}