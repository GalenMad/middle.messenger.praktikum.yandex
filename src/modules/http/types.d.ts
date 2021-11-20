interface RequestOptions {
  timeout?: number,
  data?: { [key: string]: any } | FormData,
  method?: string,
  headers?: Record<string, string>
}

interface RequestResponse {
  error: boolean,
  status: string | number,
  data: { [key: string]: any } | string | null
}

interface QueryData { [key: string]: string }
