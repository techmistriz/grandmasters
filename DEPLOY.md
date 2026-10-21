# Deploying to the production server

GrandMasters runs on the same server as BFLS. It's a Next.js app with
server-rendered routes (`/[slug]`, `/official-messages/[slug]`), so it needs a
running Node process; it can't be uploaded as static files.

## Requirements

- Node.js 20.9 or newer (Next 16)
- PM2 (`npm i -g pm2`), or whatever already keeps BFLS running
- A free port for this app (default `3001` in `ecosystem.config.js`)

## First deploy

```bash
git clone https://github.com/techmistriz/grandmasters-fe.git
cd grandmasters-fe

# NEXT_PUBLIC_* values are baked in at build time, so set them before building.
cp .env.example .env.production
nano .env.production

npm ci
npm run build   # on a small server: NEXT_BUILD_CPUS=1 npm run build

pm2 start ecosystem.config.js
pm2 save
```

Check it locally on the server: `curl -I http://127.0.0.1:3001`.

## Updating

```bash
cd grandmasters-fe
git pull
npm ci
npm run build
pm2 reload grandmasters
```

Changing anything in `.env.production` also needs a rebuild.

## Web server

Point the GrandMasters domain at the Node process, the same way the BFLS
domain is set up, then add SSL (e.g. `certbot --nginx -d <domain>`).

nginx:

```nginx
server {
    listen 80;
    server_name grandmasters.example.com;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Apache (needs `mod_proxy` and `mod_proxy_http`):

```apache
<VirtualHost *:80>
    ServerName grandmasters.example.com
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3001/
    ProxyPassReverse / http://127.0.0.1:3001/
</VirtualHost>
```
