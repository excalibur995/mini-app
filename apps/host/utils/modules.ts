export const preloadModules = async () => {
  try {
    await Promise.all([
      import('dashboard/Navigator'),
      import('transfer/Navigator'),
      import('ca/Navigator'),
    ]);
  } catch (error) {
    console.error('Failed to preload federated modules:', error);
  }
};
