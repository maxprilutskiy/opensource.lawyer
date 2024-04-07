import { TogetherLLM } from 'llamaindex';

export function createLLM() {
  return new TogetherLLM({
    apiKey: process.env.TOGETHER_API_KEY,
    model: 'mistralai/Mistral-7B-Instruct-v0.2'
  });
}
