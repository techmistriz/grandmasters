export interface ApiResponse<T = unknown> {
  status: boolean;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message?: string;
  status?: number | null;
  response?: {
    data?: ApiErrorResponse;
    status?: number;
  };
}
