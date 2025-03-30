
export const config = {
  // Set to true to use MongoDB, false to use localStorage
  useMongoDB: true,
  
  // MongoDB connection details
  mongodb: {
    uri: "mongodb://localhost:27017",
    dbName: "maplinkDB"
  },
  
  // For demo purposes - in production these would be in an environment variable
  api: {
    baseUrl: "/api"
  }
};
