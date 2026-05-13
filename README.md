# cc-static-website-1

Static website project (HTML + CSS + a little JavaScript) for a restaurant landing page, plus simple login/signup demo pages.

> Note: The actual site files live in the `cc-static-website-1/` folder in this repo.

## Pages

Inside `cc-static-website-1/`:

- `index.html` — Restaurant landing page.
- `login.html` — Login form (stores login state in `localStorage`, then navigates to `index.html`).
- `signup.html` — Signup form (stores a demo user in `localStorage`, then navigates to `login.html`).

Convenience “pretty URLs” (works with `python3 -m http.server`):

- `/login` → redirects to `/login.html`
- `/signup` → redirects to `/signup.html`

## Run locally

From the folder that contains the HTML files:

```bash
cd cc-static-website-1
python3 -m http.server 8000
```

Open in your browser:

- http://localhost:8000/ (serves `index.html`)
- http://localhost:8000/login.html or http://localhost:8000/login
- http://localhost:8000/signup.html or http://localhost:8000/signup

## Notes

- The login/signup pages are a front-end demo only and store credentials in `localStorage` (not secure for real applications).
- Don’t commit private keys: this repo ignores `*.pem` via `.gitignore`.
