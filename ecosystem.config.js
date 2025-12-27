module.exports = {
  apps: [
    {
      name: 'fetchit-waitlist',
      script: 'pnpm',
      args: 'start',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
