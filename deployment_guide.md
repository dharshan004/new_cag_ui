# Deploying CAG Portal via Cloudflare Tunnel (`cloudflared`)

Since your database is hosted on a private local network IP (`10.10.182.225`), standard cloud hosting platforms cannot connect to it. By using **Cloudflare Tunnel**, you can securely expose your local servers to the internet without opening firewall ports.

---

## 🛠️ Step-by-Step Tunnel Setup

### Step 1: Install Cloudflare Tunnel Client (`cloudflared`)
1. Download the Windows version of `cloudflared` from the official repository:
   [https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.msi](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.msi)
2. Run the installer to add `cloudflared` to your system paths.

---

### Step 2: Authenticate with Your Cloudflare Account
Open your command prompt (cmd or PowerShell) and run:
```bash
cloudflared tunnel login
```
*A browser window will open. Log in and select the domain you want to use (e.g., `yourdomain.com`).*

---

### Step 3: Create Your Tunnel
Run the following command to create a tunnel for the project:
```bash
cloudflared tunnel create cag-portal-tunnel
```
*This command will output a **Tunnel ID** (e.g. `1234abcd-1234-abcd-1234-abcd1234abcd`). Copy this ID.*

---

### Step 4: Create the Configuration File
Create a file named `config.yml` in the folder `C:\Users\yokes\.cloudflared\config.yml` (replace `<TUNNEL_ID>` with your copied Tunnel ID):

```yaml
tunnel: <TUNNEL_ID>
credentials-file: C:\Users\yokes\.cloudflared\<TUNNEL_ID>.json

ingress:
  # Next.js Frontend Port 3000
  - hostname: cag.yourdomain.com
    service: http://localhost:3000

  # Laravel Backend Port 8000
  - hostname: api-cag.yourdomain.com
    service: http://localhost:8000

  # Catch-all rule (Required)
  - service: http_status:404
```

---

### Step 5: Route Your Subdomains
Tell Cloudflare to direct traffic from your domains to the tunnel:
```bash
cloudflared tunnel route dns cag-portal-tunnel cag.yourdomain.com
cloudflared tunnel route dns cag-portal-tunnel api-cag.yourdomain.com
```

---

### Step 6: Configure Environment Variables
To make sure Next.js and Laravel talk to each other correctly over the internet, update your configurations:

1. **Next.js config**: In `cag_laravel/frontend/.env.production` (or `.env`):
   ```env
   NEXT_PUBLIC_LARAVEL_API_URL=https://api-cag.yourdomain.com/api
   NEXTAUTH_URL=https://cag.yourdomain.com
   ```
2. **Laravel config**: In `cag_laravel/.env`:
   ```env
   APP_URL=https://api-cag.yourdomain.com
   SANCTUM_STATEFUL_DOMAINS=cag.yourdomain.com
   ```

---

### Step 7: Start the Tunnel
To start routing traffic securely:
```bash
cloudflared tunnel --config C:\Users\yokes\.cloudflared\config.yml run cag-portal-tunnel
```

Your Next.js portal will now be live publicly at `https://cag.yourdomain.com` and connect to the Laravel backend on `https://api-cag.yourdomain.com`, preserving the local database connection!
