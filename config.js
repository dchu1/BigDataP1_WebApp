const config = {};

config.host = "https://bdp1func.azurewebsites.net" //|| "[the endpoint URI of your Azure Cosmos DB account]";
config.port = "443"
//config.host = "http://localhost:7071"
//config.port = "7071"
config.functionKey = "9SUYKI8zYMcyo5rCK7VlHrhAMZHnKtnoxayqo7QGZzroLn0RzD2T2g=="
config.apiEndpoint = "api/v1"
if (config.host.includes("https://localhost")) {
  console.log("Local environment detected");
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
}

module.exports = config;