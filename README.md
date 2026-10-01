# msw 3: worker stops intercepting after ~5 minutes (Chromium)

```sh
npm install
npx playwright install chromium
npm test
```

The test starts the worker once and fetches a mocked URL every second for 7 minutes.

- `msw@3.0.1`: fails at ~5.5 min with `TypeError: Failed to fetch`
- `msw@2.15.0` (change the version in `package.json`, reinstall): passes
