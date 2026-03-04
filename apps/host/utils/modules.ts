export const preloadModules = async () => {
  try {
    await Promise.all([
      import('dashboard/Navigator' as any),
      import('transfer/Navigator' as any),
    ]);
  } catch (error) {
    console.error('Failed to preload federated modules:', error);
  }
};
