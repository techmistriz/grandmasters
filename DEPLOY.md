# Deploying to the production server

GrandMasters runs on the Hostinger VPS next to BFLS and the Laravel API. The
server is managed with CloudPanel, and both sites are CloudPanel **Node.js
sites**: each runs as its own site user, under PM2, with CloudPanel's nginx in
front. BFLS uses port 3000; GrandMasters uses 3001.

The app has server-rendered routes (`/[slug]`, `/official-messages/[slug]`), so
it needs a running Node process; it can't be uploaded as static files.

In the commands below, replace:

- `SITE_USER` with the site user CloudPanel created for GrandMasters
  (Sites → the site → Settings)
- `DOMAIN` with the GrandMasters domain, e.g. `www.example.com`

## 1. Create the site in CloudPanel

Add Site → **Create a Node.js Site**: enter the domain, pick Node.js 20 or
newer, and set **App Port** to `3001`. CloudPanel creates the site user, the
folder `/home/SITE_USER/htdocs/DOMAIN` and the nginx vhost that proxies the
domain to port 3001.

If you used a different port, change `PORT` in `ecosystem.config.js` to match.

## 2. Log in as the site user

From the VPS as root:

```bash
su - SITE_USER
node -v    # should print v20 or newer
```

## 3. Get the code

CloudPanel puts a placeholder file in the site folder; clear it, then clone:

```bash
cd ~/htdocs/DOMAIN
rm -rf ./* ./.[!.]*
git clone https://github.com/techmistriz/grandmasters-fe.git .
```

## 4. Add the environment file

`NEXT_PUBLIC_*` values are baked in when the app is built, so this file must
exist before `npm run build`, and any change to it needs a rebuild.

```bash
cp .env.example .env.production
nano .env.production
```

Fill in every value (the same ones the Vercel project had, renamed from
`VITE_*` to `NEXT_PUBLIC_*`). `NEXT_PUBLIC_API_BASE_URL` is the same LW Events
API that BFLS uses, so you can compare with BFLS's env file in
`/home/bfls/htdocs/www.bfls.in/`. Set `NEXT_PUBLIC_SITE_URL` to
`https://DOMAIN`.

## 5. Install and build

```bash
npm ci
npm run build
```

If the build is slow or runs out of memory, use `NEXT_BUILD_CPUS=1 npm run build`.

## 6. Start it with PM2

```bash
npm install -g pm2          # once per site user, if `pm2 -v` fails
pm2 start ecosystem.config.js
pm2 save
curl -I http://127.0.0.1:3001   # should return HTTP 200
```

So it comes back after a server reboot, add a cron entry for the site user
(`crontab -e`):

```
@reboot /bin/bash -lc "pm2 resurrect"
```

BFLS should already have one; `crontab -l -u bfls` (as root) shows it, and you
can copy whatever it uses.

## 7. DNS and SSL

1. Point the domain's A record at the VPS IP (for `www.` and the bare domain).
2. Once DNS resolves, in CloudPanel open the site → **SSL/TLS** → Actions →
   **New Let's Encrypt Certificate**.
3. Open `https://DOMAIN` and check the home page, a past edition page and the
   cart.

## Updating the site

```bash
su - SITE_USER
cd ~/htdocs/DOMAIN
git pull
npm ci
npm run build
pm2 reload grandmasters
```

## Useful commands

```bash
pm2 list                  # is it running?
pm2 logs grandmasters     # recent output and errors
pm2 restart grandmasters
```
