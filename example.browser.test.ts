import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { expect, it } from 'vitest'

const worker = setupWorker(
  http.get('https://api.example.com/ping', () => HttpResponse.json({ ok: true })),
)

it('keeps intercepting requests for 7 minutes', async () => {
  await worker.start({ quiet: true })
  const startedAt = Date.now()

  while (Date.now() - startedAt < 7 * 60_000) {
    const minutes = ((Date.now() - startedAt) / 60_000).toFixed(2)
    const result = await fetch('https://api.example.com/ping')
      .then(response => response.json())
      .catch(error => ({ error: String(error) }))

    expect(result, `request at ${minutes} min`).toEqual({ ok: true })
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
})
