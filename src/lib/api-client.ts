const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api/v1";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {}),
      },
    }
  );

  const data = await response.json().catch(
    () => ({})
  );

  if (!response.ok) {
    throw {
      status: response.status,
      message:
        data.message ||
        "Something went wrong.",
      errors: data.errors || {},
      code: data.code,
    };
  }

  return data;
}

const api = {
  get<T>(endpoint: string) {
    return request<T>(endpoint, {
      method: "GET",
    });
  },

  post<T>(
    endpoint: string,
    body?: unknown
  ) {
    return request<T>(endpoint, {
      method: "POST",
      body: body
        ? JSON.stringify(body)
        : undefined,
    });
  },
};

export default api;