module.exports = {
  apps: [
    {
      name: 'fetchit-waitlist',
      script: 'pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
