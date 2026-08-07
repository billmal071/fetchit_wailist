const ENV_SUFFIX = process.env.DEPLOY_ENV || 'development';

module.exports = {
  apps: [
    {
      // Runs the Next.js standalone bundle (next.config.ts output: 'standalone').
      // The deploy dir has server.js at its root, with .next/static and public
      // copied alongside it.
      name: `fetchit-waitlist-${ENV_SUFFIX}`,
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      // Crashloop backstop: stop retrying after repeated fast crashes so a
      // broken deploy surfaces as "errored" instead of looping forever.
      min_uptime: '30s',
      max_restarts: 10,
      max_memory_restart: '512M',
      // NODE_ENV must be 'production' for the standalone server; the env split
      // is baked into NEXT_PUBLIC_* at build time, not selected at runtime.
      env_development: {
        NODE_ENV: 'production',
        PORT: 3100,
        HOSTNAME: '127.0.0.1',
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      merge_logs: true,
    },
  ],
};
