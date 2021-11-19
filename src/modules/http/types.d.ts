interface requestOptions {
  timeout?: number,
  data?: Record<string, string | number | unknown>,
  method?: string,
  headers?: Record<string, string>
}

interface response {
  error: boolean,
  status: number | string,
  data: { reason?: string } | string | null
}
