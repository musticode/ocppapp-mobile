// Environment configuration for the app
// You can modify these values based on your environment

const ENV = {
  development: {
    // VITE_CSMS_APPLICATION_API_URL: "http://localhost:8080/api",

    // ios local
    VITE_CSMS_APPLICATION_API_URL: "http://192.168.1.103:8080/api",
  },
  production: {
    VITE_CSMS_APPLICATION_API_URL: "https://your-production-api.com",
  },
  staging: {
    VITE_CSMS_APPLICATION_API_URL: "https://your-staging-api.com",
  },
};

// Get the current environment
const getEnvVars = () => {
  // You can set this based on your build process
  const environment = __DEV__ ? "development" : "production";
  return ENV[environment] || ENV.development;
};

export default getEnvVars();
