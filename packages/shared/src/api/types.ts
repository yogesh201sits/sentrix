export interface ApiError {
  code: string;

  message: string;

  details?: Record<string, unknown>;

  requestId?: string;
}

export interface ApiResponse<T> {
  data: T;

  requestId: string;
}

export interface ApiErrorResponse {
  error: ApiError;

  requestId: string;
}