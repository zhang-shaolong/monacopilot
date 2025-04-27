import { CompletionCopilot } from "./completion-copilot";
import { registerCompletion } from "./register";

/** @deprecated Use `CompletionCopilot` instead */
export const Copilot = CompletionCopilot;

export { registerCompletion, CompletionCopilot };

export type { Monaco, StandaloneCodeEditor } from "./types/monaco";

export type {
    CopilotOptions,
    CustomCopilotModel,
    Provider,
    Model,
    MistralModel,
} from "@monacopilot/core";

export type {
    CompletionMetadata,
    CompletionRequest,
    CompletionRequestBody,
    CompletionRequestOptions,
    RegisterCompletionOptions,
    CompletionRegistration,
} from "./types/core";

// Re-export from core for easier access
export {
  PROVIDERS,
  MODEL_IDS,
  PROVIDER_MODEL_MAP,
  PROVIDER_ENDPOINT_MAP,
  OpenRouterHandler,
} from "@monacopilot/core";

export type {
  ProviderImplementationMap,
  DeepSeekModel,
  OpenRouterModel,
  PickModel,
  CompletionCreateParams,
  OpenRouterCompletionCreateParams,
  OpenRouterCompletion,
  OpenRouterMessage,
} from "@monacopilot/core";
