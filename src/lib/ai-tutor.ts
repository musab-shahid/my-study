/** AI tutor public API — context builders, provider catalog, and askTutor. */
export {
  buildTopicContext,
  buildStudentContext,
  buildMistakePrompt,
  loadTutorMemory,
  appendTutorMemory,
  extractStruggleNote,
  setPendingExplain,
  consumePendingExplain,
  type TutorMemoryNote,
  type PendingExplainPayload,
} from './ai-tutor-context.ts';

export {
  MODEL_OPTIONS,
  getAvailableModels,
  isTutorAvailable,
  getDefaultModelId,
  askTutor,
  type TutorMessage,
  type ProviderKey,
  type ModelOption,
} from './ai-tutor-providers.ts';
