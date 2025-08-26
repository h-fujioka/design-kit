import { useState, useCallback } from 'react';
import { ApiResponse, PaginatedResponse } from '../api/types';
import { apiClient } from '../api/client';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  onFinally?: () => void;
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T = any>(options: UseApiOptions = {}) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (requestFn: () => Promise<ApiResponse<T>>) => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await requestFn();

        if (response.success && response.data) {
          setState(prev => ({ ...prev, data: response.data, loading: false }));
          options.onSuccess?.(response.data);
        } else {
          const errorMessage = response.error || 'An error occurred';
          setState(prev => ({ ...prev, error: errorMessage, loading: false }));
          options.onError?.(errorMessage);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        setState(prev => ({ ...prev, error: errorMessage, loading: false }));
        options.onError?.(errorMessage);
      } finally {
        options.onFinally?.();
      }
    },
    [options]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// 特定のAPI操作用のフック
export function useGet<T>(endpoint: string, options?: UseApiOptions) {
  const { execute, ...state } = useApi<T>(options);

  const get = useCallback(() => {
    return execute(() => apiClient.get<T>(endpoint));
  }, [execute, endpoint]);

  return {
    ...state,
    get,
  };
}

export function usePost<T>(endpoint: string, options?: UseApiOptions) {
  const { execute, ...state } = useApi<T>(options);

  const post = useCallback(
    (data?: any) => {
      return execute(() => apiClient.post<T>(endpoint, data));
    },
    [execute, endpoint]
  );

  return {
    ...state,
    post,
  };
}

export function usePut<T>(endpoint: string, options?: UseApiOptions) {
  const { execute, ...state } = useApi<T>(options);

  const put = useCallback(
    (data?: any) => {
      return execute(() => apiClient.put<T>(endpoint, data));
    },
    [execute, endpoint]
  );

  return {
    ...state,
    put,
  };
}

export function useDelete<T>(endpoint: string, options?: UseApiOptions) {
  const { execute, ...state } = useApi<T>(options);

  const del = useCallback(() => {
    return execute(() => apiClient.delete<T>(endpoint));
  }, [execute, endpoint]);

  return {
    ...state,
    delete: del,
  };
}

export function usePaginated<T>(endpoint: string, options?: UseApiOptions) {
  const { execute, ...state } = useApi<PaginatedResponse<T>>(options);

  const getPaginated = useCallback(
    (page: number = 1, limit: number = 10) => {
      return execute(() => apiClient.getPaginated<T>(endpoint, page, limit));
    },
    [execute, endpoint]
  );

  return {
    ...state,
    getPaginated,
  };
}

// ファイルアップロード用フック
export function useFileUpload<T>(endpoint: string, options?: UseApiOptions) {
  const { execute, ...state } = useApi<T>(options);
  const [uploadProgress, setUploadProgress] = useState(0);

  const upload = useCallback(
    (file: File) => {
      setUploadProgress(0);
      return execute(() =>
        apiClient.uploadFile<T>(endpoint, file, (progress) => {
          setUploadProgress(progress);
        })
      );
    },
    [execute, endpoint]
  );

  return {
    ...state,
    upload,
    uploadProgress,
  };
}
