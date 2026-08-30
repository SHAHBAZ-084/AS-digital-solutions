module.exports = {
  apps: [
    {
      name: 'as-content-api',
      cwd: '/var/www/as-digital-solutions',
      script: '/var/www/as-digital-solutions/start-api.sh',
      interpreter: 'bash',
      env: {
        NODE_ENV: 'production',
        PATH: '/opt/node-v22.18.0-linux-x64/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
      },
      max_restarts: 20,
      min_uptime: '5s',
    },
  ],
}
