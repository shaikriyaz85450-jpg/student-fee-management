/**
 * Root Next config to explicitly set Turbopack root
 * This points Next/Turbopack to the `frontend` workspace.
 */
const nextConfig = {
  turbopack: {
    root: './frontend',
  },
};

export default nextConfig;
