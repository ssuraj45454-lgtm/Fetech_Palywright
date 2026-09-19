import { APIRequestContext, APIResponse } from '@playwright/test';

export type ApiRequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  data?: unknown;
  timeout?: number;
  auth?: string;
  contentType?: string;
  failOnStatusCode?: boolean;
};

export class BaseApi {
  constructor(protected request: APIRequestContext) {}

  protected buildHeaders(headers: Record<string, string> = {}, contentType?: string, auth?: string): Record<string, string> {
    const mergedHeaders: Record<string, string> = {
      Accept: 'application/json',
      ...headers,
    };

    if (contentType) {
      mergedHeaders['Content-Type'] = contentType;
    }

    if (auth) {
      mergedHeaders.Authorization = auth;
    }

    return mergedHeaders;
  }

  protected buildRequestOptions(options: ApiRequestOptions = {}): Record<string, unknown> {
    const {
      headers = {},
      params,
      data,
      timeout,
      auth,
      contentType,
      failOnStatusCode,
    } = options;

    const requestOptions: Record<string, unknown> = {
      headers: this.buildHeaders(headers, contentType, auth),
      failOnStatusCode: failOnStatusCode ?? false,
    };

    if (params && Object.keys(params).length > 0) {
      requestOptions.params = params;
    }

    if (data !== undefined) {
      requestOptions.data = data;
    }

    if (timeout) {
      requestOptions.timeout = timeout;
    }

    return requestOptions;
  }

  async get(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.get(endpoint, this.buildRequestOptions(options));
  }

  async post(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.post(endpoint, this.buildRequestOptions(options));
  }

  async put(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.put(endpoint, this.buildRequestOptions(options));
  }

  async patch(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.patch(endpoint, this.buildRequestOptions(options));
  }

  async delete(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.delete(endpoint, this.buildRequestOptions(options));
  }

  async options(endpoint: string, options: ApiRequestOptions = {}): Promise<APIResponse> {
    return this.request.fetch(endpoint, {
      method: 'OPTIONS',
      ...this.buildRequestOptions(options),
    });
  }
}
