
# cc-static-website-1

Static website project (HTML + CSS + a little JavaScript) for a restaurant landing page, plus simple login/signup demo pages.

## Pages

- `index.html` — Restaurant landing page (sections: About, Speciality, Menu, Staff, Timings).
- `login.html` — Login form (stores login state in `localStorage`, then navigates to `index.html`).
- `signup.html` — Signup form (stores a demo user in `localStorage`, then navigates to `login.html`).

Convenience “pretty URLs” are included for the local static server:

- `/login` → redirects to `/login.html`
- `/signup` → redirects to `/signup.html`

## Run locally

From the project folder:

```bash
python3 -m http.server 8000
```

Open in your browser:

- http://localhost:8000/ (serves `index.html`)
- http://localhost:8000/login.html or http://localhost:8000/login
- http://localhost:8000/signup.html or http://localhost:8000/signup

