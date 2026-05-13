# MERN Deployment — Concepts & Commands Reference

---

## CONCEPTS

---

### MERN Stack

| Letter | Full Form | Role |
|---|---|---|
| M | MongoDB | Database — stores data as JSON-like documents |
| E | Express | Backend framework — handles API routes |
| R | React | Frontend — what the user sees in the browser |
| N | Node.js | Runtime — lets JavaScript run on a server |

---

### EC2 — Elastic Compute Cloud

A virtual machine rented from AWS. It runs in AWS's data center. You SSH into it and run your app on it. t3.micro = small size, 2 vCPUs, 1GB RAM, free tier eligible.

---

### AMI — Amazon Machine Image

A pre-built OS template. When you pick Ubuntu 22.04, you're picking the AMI. It comes with the base OS — you install everything else on top.

---

### Security Group

A firewall around your EC2 instance. Inbound rules control what traffic is allowed into the server. Each rule opens a specific port to a specific source.

---

### SSH — Secure Shell

Gives you a terminal on a remote machine over an encrypted connection. The .pem file is your private key — the server holds the matching public key. No password needed.

---

### SCP — Secure Copy Protocol

Copies files between two computers over SSH. Same encryption as SSH, just for file transfer instead of a terminal session.

---

### Swap

Disk space that acts as overflow RAM. t3.micro has 1GB RAM which is not enough for npm install. Swap prevents the VM from freezing by using disk space when RAM runs out.

---

### apt — Advanced Package Tool

Ubuntu's package manager. Used to install software on the VM. Always run `apt update` before installing anything to refresh the list of available packages.

---

### sudo — Superuser Do

Runs a command as admin (root). Required for installing software, moving files to protected folders, and starting system services.

---

### Node.js and npm

Node.js is a JavaScript runtime — lets you run JS outside the browser, on a server. npm is Node Package Manager — installs all the libraries your project depends on, listed in package.json.

---

### MongoDB and mongod

MongoDB is a NoSQL database that stores data as JSON-like documents. mongod is the MongoDB daemon — the background process that keeps MongoDB running on the server.

MongoDB runs on localhost:27017 inside the VM. The backend connects to it internally. It is never exposed to the internet — port 27017 is never opened in the security group.

---

### mongoose.connect

A line in server.js that connects the backend to MongoDB:

```js
mongoose.connect('mongodb://localhost:27017/studentdb')
```

localhost = same machine, not the internet. 27017 = MongoDB's default port. studentdb = database name, auto-created if it does not exist.

---

### Vite and dist

Vite is a build tool for React. It compiles your JSX source code into plain HTML, CSS, and JS that any browser can understand. The output is placed in a folder called dist (short for distribution). This is what gets served to users — not the raw source code.

---

### VITE_API_URL

An environment variable passed to Vite at build time. It tells the React frontend where the backend API is located. Gets baked into the compiled files so the frontend knows which IP and port to talk to.

---

### PM2 — Process Manager 2

Keeps your Node apps running permanently in the background. Without PM2, the app stops when you close the terminal or if it crashes. PM2 auto-restarts crashed processes and survives terminal disconnects.

---

### serve

A simple static file server. PM2 uses it internally to serve the /dist folder on a given port. The --spa flag redirects all routes to index.html so React Router works correctly.

---

### localhost vs Public IP

localhost means the machine itself — only accessible from within the VM. The public IP is the VM's address on the internet — accessible by anyone. Backend talks to MongoDB via localhost. Your browser talks to the backend via the public IP.

---

### curl

A command line tool to make HTTP requests. Used to test if the backend API is responding without needing a browser.

---

### /tmp

A temporary folder on Linux. Anyone can write here without sudo. Used as a staging area when uploading files via SCP before moving them to protected locations.

---

### systemctl

Controls background services on Linux. Used to start, stop, check status of services like MongoDB.

---

### Ports

A port is a numbered door into the server. Each app listens on a specific port. The port opened in the security group must match the port the app is listening on.

| Port | Used For |
|---|---|
| 22 | SSH — you connecting to manage the server |
| 3000 | Frontend — users visiting the website |
| 5000 | Backend API — frontend talking to backend |
| 80 | HTTP standard — browsers default to this |
| 443 | HTTPS standard |
| 27017 | MongoDB — internal only, never opened publicly |

---

## COMMANDS REFERENCE

---

### System & Setup

| Command | What it does |
|---|---|
| `sudo apt update` | Refreshes the list of available packages |
| `sudo apt install -y git curl build-essential` | Installs git, curl, and C build tools. `-y` auto-confirms prompts |
| `sudo` | Runs the command as admin/root |

---

### Swap

| Command | What it does |
|---|---|
| `sudo fallocate -l 1G /swapfile` | Creates a 1GB empty file at /swapfile. `-l 1G` = length 1 gigabyte |
| `sudo chmod 600 /swapfile` | Sets permissions so only root can read/write it. Required by Linux for swap files |
| `sudo mkswap /swapfile` | Formats the file as swap space so Linux recognises it |
| `sudo swapon /swapfile` | Activates the swap file — Linux will now use it when RAM fills up |

---

### SSH and SCP

| Command | What it does |
|---|---|
| `chmod 400 key.pem` | Sets key file to read-only by owner. SSH refuses to work if the key is too open |
| `ssh -i key.pem ubuntu@<IP>` | Connects to remote VM. `-i` = identity file (your key). `ubuntu` = default username on Ubuntu AMIs |
| `scp -i key.pem file.txt ubuntu@<IP>:/tmp/` | Copies file.txt from your machine to /tmp/ on the server. `-i` = identity file |

---

### Node and npm

| Command | What it does |
|---|---|
| `curl -fsSL https://deb.nodesource.com/setup_20.x \| sudo -E bash -` | Downloads and runs the Node 20 setup script. `-fsSL` = silent, follow redirects, fail on error |
| `sudo apt install -y nodejs` | Installs Node.js and npm after the setup script runs |
| `node -v` | Prints the installed Node version to confirm it worked |
| `npm install` | Reads package.json and installs all dependencies into node_modules |
| `npm install --no-audit --no-fund --legacy-peer-deps` | Same as above but faster and more lenient. `--no-audit` skips security scan. `--no-fund` skips funding messages. `--legacy-peer-deps` ignores version conflicts |
| `rm -rf node_modules package-lock.json` | Deletes node_modules and lock file for a clean reinstall. `-r` = recursive. `-f` = force |
| `node server.js` | Runs the backend directly — for testing only, stops when terminal closes |

---

### MongoDB

| Command | What it does |
|---|---|
| `sudo systemctl start mongod` | Starts the MongoDB background service |
| `sudo systemctl status mongod` | Shows if MongoDB is running or not |
| `sudo systemctl enable mongod` | Makes MongoDB auto-start on VM reboot |

---

### Git

| Command | What it does |
|---|---|
| `git clone <url>` | Downloads a copy of the repository from GitHub to the VM |
| `cd mern-student-system` | Moves into the cloned project folder |

---

### Vite Build

| Command | What it does |
|---|---|
| `npm run build` | Runs Vite — compiles React source into /dist folder |
| `VITE_API_URL=http://<IP>:5000/api/students npm run build` | Same but passes the backend URL as an environment variable so the frontend knows where to send API requests |

---

### PM2

| Command | What it does |
|---|---|
| `sudo npm install -g pm2 serve` | Installs PM2 and serve globally. `-g` = global, available anywhere on the system |
| `pm2 start server.js --name "backend"` | Starts server.js as a background process named "backend" |
| `pm2 serve dist 3000 --name "frontend" --spa` | Serves the /dist folder on port 3000. `--spa` redirects all routes to index.html for React Router |
| `pm2 list` | Shows all running PM2 processes and their status |
| `pm2 logs` | Shows live output and errors from all PM2 processes |
| `pm2 stop all` | Stops all running PM2 processes |
| `pm2 restart all` | Restarts all PM2 processes |

---

### curl — Testing

| Command | What it does |
|---|---|
| `curl http://localhost:5000/api/students` | Tests backend from inside the VM |
| `curl http://<IP>:5000/api/students` | Tests backend from outside (your laptop) — confirms port 5000 is open |
| `curl -X POST http://<IP>:5000/api/students -H "Content-Type: application/json" -d '{...}'` | Sends a POST request with JSON data to create a new record. `-X POST` = method. `-H` = header. `-d` = data |

---

### Navigation

| Command | What it does |
|---|---|
| `cd backend` | Move into the backend folder |
| `cd ../frontend` | Move up one level then into frontend folder |
| `ls` | List files in current folder |
| `ls /var/www/html/` | List files in the web root (for static sites) |

---
