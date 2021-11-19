declare enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface requestOptions {
  timeout?: number,
  data?: Record<string, string | number | unknown>,
  method?: METHODS | string,
  headers?: Record<string, string>
}

interface response {
  error: boolean,
  status: number | string,
  data: { reason?: string } | string | null
}
