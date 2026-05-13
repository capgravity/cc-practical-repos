# MERN Deployment — Concepts & Full Forms
 
---
 
## What is MERN
 
| Letter | Stands For | What it does |
|---|---|---|
| M | MongoDB | Database — stores all the data |
| E | Express | Backend framework — handles API routes |
| R | React | Frontend — what the user sees in the browser |
| N | Node.js | Runtime — lets JavaScript run on the server |
 
---
 
## The Full Picture
 
```
Browser (React)
     ↓  http request
Express + Node (port 5000)
     ↓  query
MongoDB (port 27017, internal only)
     ↓  data back
Express + Node
     ↓  response
Browser
```
 
---
 
## EC2
 
**Elastic Compute Cloud.** Just a virtual machine (computer) running in AWS's data center. You rent it, SSH into it, and run your app on it. t3.micro means small size — 2 vCPUs, 1GB RAM.
 
---
 
## AMI
 
**Amazon Machine Image.** A snapshot/template of an OS. When you pick "Ubuntu 26.04 LTS", you're picking the AMI. It comes pre-installed with the base OS — you install everything else on top.
 
---
 
## Security Group
 
A firewall around your EC2 instance. Controls which ports are open to the world. Inbound rules = what traffic is allowed IN.
 
| Port | Used For |
|---|---|
| 22 | SSH — you connecting to manage the server |
| 3000 | Frontend — users visiting the website |
| 5000 | Backend API — frontend talking to backend |
| 27017 | MongoDB — kept closed, internal only |
 
---
 
## SSH
 
**Secure Shell.** Gives you a terminal on a remote machine over an encrypted connection. The `.pem` file is your private key — the server has the matching public key. No password needed.
 
```bash
ssh -i mern-key.pem ubuntu@<IP>
```
- `-i` = identity file (your key)
- `ubuntu` = default username on Ubuntu AMIs
- `@<IP>` = the server to connect to
---
 
## chmod 400
 
Changes file permissions. `400` = owner can read only, nobody else can touch it. SSH refuses to work if your `.pem` file is too open — this fixes that.
 
---
 
## SCP
 
**Secure Copy Protocol.** Copies files between computers over SSH.
 
```bash
scp -i key.pem file.txt ubuntu@<IP>:/tmp/
```
Read as: copy `file.txt` from my machine to that server, put it in `/tmp/`.
 
---
 
## apt
 
**Advanced Package Tool.** Ubuntu's package manager. Used to install software.
 
```bash
sudo apt update          # refresh list of available packages
sudo apt install nginx   # install nginx
```
 
---
 
## sudo
 
**Superuser Do.** Runs a command as admin (root). Required for installing software, moving files to protected folders, starting services.
 
---
 
## Swap
 
Extra disk space that acts as overflow RAM. t3.micro has only 1GB RAM. `npm install` needs more. Without swap, the VM freezes or crashes mid-install.
 
```bash
sudo fallocate -l 1G /swapfile   # create 1GB file
sudo chmod 600 /swapfile         # secure it
sudo mkswap /swapfile            # format as swap
sudo swapon /swapfile            # activate it
```
 
---
 
## Node.js & npm
 
**Node.js** = JavaScript runtime. Lets you run JS outside the browser (on a server).
**npm** = **Node Package Manager.** Installs JS libraries/dependencies.
 
```bash
npm install    # reads package.json, downloads all dependencies
```
 
`--no-audit --no-fund --legacy-peer-deps` = flags to speed up install and avoid errors on older dependency trees.
 
---
 
## MongoDB & mongod
 
**MongoDB** = NoSQL database. Stores data as JSON-like documents instead of tables.
**mongod** = MongoDB Daemon. The background process that keeps MongoDB running.
 
```bash
sudo systemctl start mongod    # start MongoDB service
```
 
MongoDB runs on `localhost:27017` inside the VM. The backend connects to it internally — it is never exposed to the internet.
 
---
 
## mongoose.connect
 
Line in your backend `server.js`:
```js
mongoose.connect('mongodb://localhost:27017/blogdb')
```
- `localhost` = same machine, not the internet
- `27017` = MongoDB's default port
- `blogdb` = database name, auto-created if it doesn't exist
---
 
## Vite & dist
 
**Vite** = build tool for React. Takes your React source code (JSX, CSS, etc.) and compiles it into plain HTML, CSS, and JS that any browser can understand.
 
**dist** = the output folder Vite creates after building. Short for "distribution". This is what you actually serve to users — not the raw React source code.
 
```bash
npm run build    # runs Vite, creates /dist folder
```
 
---
 
## VITE_API_URL
 
An environment variable passed to Vite at build time. Tells the React frontend where the backend API is.
 
```bash
VITE_API_URL=http://<IP>:5000/api/blogs npm run build
```
 
This gets baked into the built files so the frontend knows to talk to your backend on port 5000.
 
---
 
## PM2
 
**Process Manager 2.** Keeps your Node apps running permanently in the background. Without PM2, your app stops when you close the terminal.
 
```bash
pm2 start server.js --name "backend"       # run backend forever
pm2 serve dist 3000 --name "frontend"      # serve built React files on port 3000
```
 
| Command | What it does |
|---|---|
| `pm2 start` | Start a process |
| `pm2 list` | See all running processes |
| `pm2 logs` | See output/errors |
| `pm2 stop all` | Stop everything |
| `pm2 restart all` | Restart everything |
 
---
 
## serve
 
A simple static file server. PM2 uses it to serve the `/dist` folder on port 3000.
 
```bash
pm2 serve dist 3000 --spa
```
`--spa` = Single Page Application mode. Redirects all routes to `index.html` so React Router works correctly.
 
---
 
## localhost vs Public IP
 
| | localhost | Public IP |
|---|---|---|
| What it means | This machine itself | The VM's address on the internet |
| Who can use it | Only the VM internally | Anyone on the internet |
| Example | `localhost:5000` | `98.84.176.104:5000` |
 
When backend talks to MongoDB it uses `localhost` — same machine.
When your browser talks to the backend it uses the public IP — over the internet.
 
---
 
## curl
 
A command line tool to make HTTP requests. Used to test if the backend is responding.
 
```bash
curl http://localhost:5000/api/blogs         # test from inside VM
curl http://98.84.176.104:5000/api/blogs     # test from outside (laptop)
```
 
Response `[]` = empty array = working perfectly, just no data yet.
 
---
 
## /tmp
 
Temporary folder on Linux. Anyone can write here without sudo. Used as a staging area when uploading files via SCP before moving them to protected folders.
 
---
 
## systemctl
 
Controls background services on Linux.
 
```bash
sudo systemctl start mongod      # start MongoDB
sudo systemctl status mongod     # check if it's running
sudo systemctl enable mongod     # auto-start on reboot
```
 
---
 
## Summary — What Each Tool Does
 
| Tool | Role |
|---|---|
| EC2 | The cloud computer everything runs on |
| Ubuntu | OS on the VM |
| SSH / .pem | How you get into the VM |
| Node.js | Runs the backend |
| MongoDB | Stores blog data |
| Express | Handles API routes in backend |
| React + Vite | Frontend, compiled into /dist |
| PM2 | Keeps backend and frontend running permanently |
| serve | Serves the /dist folder as a website |
| Security Group | Firewall — controls which ports are open |
| Swap | Extra RAM from disk for npm install |
 