/** Error dari respons HTTP non-2xx; `message` diambil dari body JSON `{ message }` bila ada. */
export class HttpError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

/** POST JSON dan kembalikan body JSON; melempar HttpError bila status bukan 2xx. */
export async function postJson<T = { success: boolean; message?: string }>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new HttpError((data as { message?: string }).message ?? "", res.status);
  return data as T;
}
