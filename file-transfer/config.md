# Secure File Sharing Between Two Linux VMs — AWS EC2

---

## FLOW

```
Create VM-A and VM-B → SSH into VM-A → Copy key to VM-A → Create file → SCP to VM-B → Verify
```

---

## EC2 INSTANCE SETUP

Do this twice — once for VM-A, once for VM-B.

Go to: AWS Console → EC2 → Launch Instance

| Setting | Value |
|---|---|
| AMI | Ubuntu Server 22.04 LTS (HVM), SSD Volume Type |
| Instance type | t2.micro or t3.micro |
| Key pair | Use the same key pair for both |
| Storage | 8 GiB (default) |

Security Group — Inbound Rules (same for both):

| Type | Port | Source |
|---|---|---|
| SSH | 22 | Anywhere 0.0.0.0/0 |

Leave all network settings as default — both VMs will land in the same default VPC and can communicate over private IPs.

After launching, note down from the EC2 dashboard:

| VM | Public IP | Private IP |
|---|---|---|
| VM-A | `<VM-A-PUBLIC-IP>` | `<VM-A-PRIVATE-IP>` |
| VM-B | `<VM-B-PUBLIC-IP>` | `<VM-B-PRIVATE-IP>` |

---

## 0. SSH INTO VM-A (from your laptop)

```bash
chmod 400 mykey.pem
ssh -i mykey.pem ubuntu@<VM-A-PUBLIC-IP>
```

---

## 1. COPY KEY TO VM-A

Run this from your local machine (new terminal). This copies your key onto VM-A so it can SSH into VM-B.

If you are in the folder where the key is:

```bash
scp -i mykey.pem mykey.pem ubuntu@<VM-A-PUBLIC-IP>:~/.ssh/mykey.pem
```

If you are in a different folder:

```bash
scp -i ~/mykey.pem ~/mykey.pem ubuntu@<VM-A-PUBLIC-IP>:~/.ssh/mykey.pem
```

Then go back to VM-A terminal and fix permissions:

```bash
chmod 400 ~/.ssh/mykey.pem
```

---

## 2. CREATE A FILE ON VM-A

```bash
echo "Hello from VM-A" > testfile.txt
cat testfile.txt
```

---

## 3. TRANSFER FILE FROM VM-A TO VM-B

Still on VM-A, SCP the file to VM-B using its private IP:

```bash
scp -i ~/.ssh/mykey.pem testfile.txt ubuntu@<VM-B-PRIVATE-IP>:~/
```

We use the private IP because both VMs are in the same AWS VPC and can talk to each other internally.

---

## 4. VERIFY ON VM-B

Open a new terminal on your laptop and SSH into VM-B:

```bash
ssh -i mykey.pem ubuntu@<VM-B-PUBLIC-IP>
```

Check the file arrived:

```bash
ls ~
cat testfile.txt
```

Expected output:

```
Hello from VM-A
```

