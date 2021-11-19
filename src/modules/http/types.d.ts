interface RequestOptions {
  timeout?: number,
  data?: Record<string, string | number | unknown>,
  method?: string,
  headers?: Record<string, string>
}

interface RequestResponse {
  error: boolean,
  status: string | number,
  data: { reason?: string } | string | null
}
