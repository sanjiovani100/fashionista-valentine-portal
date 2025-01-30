export const checkDeviceCapabilities = () => {
  const capabilities = {
    touchscreen: 'ontouchstart' in window,
    devicePixelRatio: window.devicePixelRatio,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    orientation: window.screen.orientation?.type || 'unknown',
    connection: (navigator as any).connection?.effectiveType || 'unknown',
  };

  console.info('[Device Capabilities]:', capabilities);
  return capabilities;
};

export const simulateSlowConnection = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    const originalType = connection.effectiveType;

    Object.defineProperty(connection, 'effectiveType', {
      get: () => '2g',
    });

    return () => {
      Object.defineProperty(connection, 'effectiveType', {
        get: () => originalType,
      });
    };
  }
  
  return () => {};
};