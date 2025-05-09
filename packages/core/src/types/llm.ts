import type {
    FIMCompletionResponse as MistralFIMCompletion,
    FIMCompletionRequest$Outbound as MistralFIMCompletionCreateParams,
} from "@mistralai/mistralai/models/components";

import type { PromptData } from "./copilot";

/**
 * Providers supported by Copilot.
 */
export type Provider = "mistral" | "deepseek" | "openrouter";

/**
 * Core type mapping for provider-specific implementations
 */
export interface ProviderImplementationMap {
    mistral: {
        Model: "codestral";
        Params: MistralFIMCompletionCreateParams;
        Completion: MistralFIMCompletion;
    };
    deepseek: {
        Model: "deepseek-coder";
        Params: DeepSeekCompletionCreateParams;
        Completion: DeepSeekCompletion;
    };
    openrouter: {
        Model: "openrouter-gemini";
        Params: OpenRouterCompletionCreateParams;
        Completion: OpenRouterCompletion;
    };
}

/**
 * Models available for each provider (maintained as individual exports)
 */
export type MistralModel = ProviderImplementationMap["mistral"]["Model"];
export type DeepSeekModel = ProviderImplementationMap["deepseek"]["Model"];
export type OpenRouterModel = ProviderImplementationMap["openrouter"]["Model"];

/**
 * Union of all predefined Copilot models
 */
export type Model = {
    [K in Provider]: ProviderImplementationMap[K]["Model"];
}[Provider];

/**
 * Utility types for provider-specific implementations
 */
export type PickModel<P extends Provider> =
    ProviderImplementationMap[P]["Model"];
export type PickCompletionCreateParams<P extends Provider> =
    ProviderImplementationMap[P]["Params"];
export type PickCompletion<P extends Provider> =
    ProviderImplementationMap[P]["Completion"];

/**
 * Consolidated chat completion types (maintained as individual exports)
 */
export type CompletionCreateParams = {
    [K in Provider]: ProviderImplementationMap[K]["Params"];
}[Provider];
export type Completion = {
    [K in Provider]: ProviderImplementationMap[K]["Completion"];
}[Provider];

/**
 * Individual provider type aliases (preserved from original)
 */
export type MistralCompletionCreateParams = MistralFIMCompletionCreateParams;
export type MistralCompletion = MistralFIMCompletion;

export interface DeepSeekCompletionCreateParams {
    model: string;
    prompt: string;
    suffix?: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    stream?: boolean;
    stop?: string | string[];
}

export interface DeepSeekCompletionChoice {
    text: string;
    index: number;
    finish_reason: string;
}

export interface DeepSeekCompletion {
    id: string;
    choices: DeepSeekCompletionChoice[];
    created: number;
    model: string;
    object: string;
}

export interface OpenRouterMessage {
    role: string;
    content: string;
}

export interface OpenRouterCompletionCreateParams {
    model: string;
    messages: OpenRouterMessage[];
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    stream?: boolean;
    stop?: string | string[];
}

export interface OpenRouterCompletionChoice {
    message: {
        content: string;
        role: string;
    };
    index: number;
    finish_reason: string;
}

export interface OpenRouterCompletion {
    id: string;
    choices: OpenRouterCompletionChoice[];
    created: number;
    model: string;
    object: string;
}

export interface ProviderHandler<P extends Provider> {
    createEndpoint(model: PickModel<P>, apiKey: string): string;
    createRequestBody(
        model: PickModel<P>,
        prompt: PromptData,
    ): PickCompletionCreateParams<P>;
    createHeaders(apiKey: string): Record<string, string>;
    parseCompletion(completion: PickCompletion<P>): string | null;
}
