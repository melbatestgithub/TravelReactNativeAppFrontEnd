const development = {
  apiUrl: "http://localhost:6500/api/v1",
  mongoDbUri:
    "mongodb+srv://travel:travel123@cluster0.8ndlf0f.mongodb.net/travelApp",
};

const production = {
  apiUrl: process.env.REACT_NATIVE_API_URI,
  mongoDbUri: process.env.MONGODB_URI,
};

// Determine environment
const environment = process.env.NODE_ENV || "development";

// Export configuration based on environment
module.exports = environment === "production" ? production : development;
