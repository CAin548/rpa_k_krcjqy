// 代码生成时间: 2025-10-30 02:27:50
// Import required modules
const fs = require('fs');
const path = require('path');

// Define the base path for environment files
const environmentBasePath = path.resolve(__dirname, '../environments/');

/**
 * Loads the environment file based on the provided environment name.
 * @param {string} environmentName - The name of the environment file without extension.
 * @returns {Promise<object>} - A promise that resolves with the environment variables object.
 */
function loadEnvironmentVariables(environmentName) {
  return new Promise((resolve, reject) => {
    // Define the environment file path
    const environmentFilePath = path.join(environmentBasePath, `${environmentName}.env`);

    // Check if the environment file exists
    fs.access(environmentFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        reject(new Error(`Environment file not found: ${environmentFilePath}`));
        return;
      }

      // Read the environment file and parse its content
      fs.readFile(environmentFilePath, 'utf8', (readErr, data) => {
        if (readErr) {
          reject(new Error(`Error reading environment file: ${readErr.message}`));
          return;
        }

        // Parse the environment variables
        const environmentVariables = parseEnvironmentVariables(data);
        resolve(environmentVariables);
      });
    });
  });
}

/**
 * Parses the environment variables from the provided string data.
 * @param {string} data - The string data containing the environment variables.
 * @returns {object} - An object containing the parsed environment variables.
 */
function parseEnvironmentVariables(data) {
  const lines = data.split('
');
  const environmentVariables = {};

  lines.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      environmentVariables[key] = value;
    }
  });

  return environmentVariables;
}

// Example usage
loadEnvironmentVariables('development').then((envVars) => {
  console.log('Environment variables loaded:', envVars);
}).catch((error) => {
  console.error('Error loading environment variables:', error.message);
});