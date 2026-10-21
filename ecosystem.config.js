// PM2 process file for the production server (same box as BFLS).
// Pick a PORT that BFLS isn't already using, then point the web server at it.
module.exports = {
  apps: [
    {
      name: "grandmasters",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
