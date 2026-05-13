
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

### Common issue: 404 on `/signup`

The built-in Python server doesn’t do SPA-style routing. Use `signup.html` (or the provided `/signup` redirect) rather than `/signup` on projects that don’t include that folder.

## Files

- `styles.css` — Styles for the restaurant landing page.
- `hotelimage.png` — Hero background image (referenced by `styles.css`).

## Notes

- The login/signup pages are a front-end demo only and store credentials in `localStorage` (not secure for real applications).


## Concepts — How Things Work
 
### How Nginx Works
Nginx is a program that runs continuously on your server, listening on port 80. When a browser makes a request like `http://34.229.163.93`, it knocks on port 80. Nginx answers, looks inside `/var/www/html/`, finds `index.html`, and sends it back to the browser. That's the entire job — listen, find the file, send it. It never modifies the file, never runs logic, just delivers it as-is. That's why it suits static sites perfectly.
 
```
Browser → port 80 → Nginx → /var/www/html/index.html → back to browser
```
 
---
 
### The Linux Filesystem — What is /var, /tmp, etc.
Linux organises everything into one big folder tree starting from `/` (called root). Every folder has a specific purpose by convention:
 
| Folder | Purpose |
|---|---|
| `/` | Root of the entire filesystem. Everything lives here. |
| `/home/ubuntu/` | The logged-in user's personal folder. Like your Desktop. |
| `/tmp/` | Temporary files. Gets cleared on reboot. Safe staging area. |
| `/var/` | Variable data — logs, caches, and web files live here. |
| `/var/www/html/` | Where Nginx looks for files to serve. The web root. |
| `/etc/` | Configuration files for installed programs (including Nginx config). |
 
We use `/tmp/` as a middle step when uploading because it is writable by anyone. Then we `mv` into `/var/www/html/` which needs `sudo` (admin rights).
 
---
 
### What SCP Is
SCP stands for Secure Copy Protocol. It copies files between two computers over SSH — the same encrypted connection you use to get a terminal. Think of it as `cp` (copy) but over the internet.
 
```
scp -i mykey.pem index.html ubuntu@34.229.163.93:/tmp/
```
 
Read this as: "using this key, copy `index.html` from here to that remote machine, put it in `/tmp/`." The `-i mykey.pem` part is just proving your identity, same as in SSH.
 
---
 
### What SSH Is
SSH (Secure Shell) gives you a terminal on a remote machine. Once connected, every command you type runs on the server, not your laptop. The `.pem` file is your key — the server has the matching lock. No password needed, and the connection is fully encrypted.
 
---
 
### Why /tmp First, Then Move
You can't SCP directly into `/var/www/html/` because that folder is owned by root and requires admin (`sudo`) permissions. SCP doesn't support `sudo`. So the two-step approach:
1. SCP into `/tmp/` — no permissions needed, anyone can write here
2. `sudo mv` from `/tmp/` into `/var/www/html/` — now you have admin rights inside the SSH session
---