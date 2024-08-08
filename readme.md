# Diprotech-Weather-Backend ☁️

## Description

Diprotech-Weather-Backend is a backend service that receives user geolocation information and responds with weather forecasts and nearby locations. It also generates a historical record of weather queries.

The weather forecast is obtained through the OpenWeather API, and nearby locations are queried from a custom list.

## Technologies and Tools 💻

The backend is developed using the following technologies:

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building RESTful APIs.
- **Axios**: HTTP client for making requests to the OpenWeather API and other services.
- **Turf**: A library for geospatial calculations, used for calculating distances based on coordinates.

## API Endpoints 🌐

- **Base URL**: `http://localhost:8000`
- **Endpoint**: `/weather-data/:long/:lat`

  - **Method**: GET
  - **Description**: This endpoint receives longitude and latitude as parameters and performs the following actions:
    - Validates the coordinates to ensure they are real.
    - Retrieves the nearest locations from a predefined JSON list.
    - Queries the OpenWeather API to obtain the weather forecast.
    - Returns the weather data along with the nearest locations.

- **Endpoint**: `/docs`

  -**Description**: Show the documentation about function and Classes

## Validation and Error Handling ⚠️

- **Authentication**: The endpoint does not require authorization for access or queries, as the application does not involve user login or authentication.
- **Validation**: The endpoint performs validation to ensure that the provided coordinates are real and accurate.
- **Response Status**:
  - **200 OK**: Indicates that the request was successful and the data was retrieved and processed correctly.
  - **400 Bad Request**: Returned if the provided coordinates are invalid or not in the correct format.
  - **500 Internal Server Error**: Returned if there is an issue with the OpenWeather API or any server-side error.

## Configuration and Usage 🛠️

To run the backend locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Install the required dependencies: `npm install`.
4. Create a `.env` file in the root directory of the project and add your OpenWeather API key:

   ```plaintext
   ORIGIN='http://localhost:3000'
   OPENWEATHER_API_KEY=your_api_key_here
   ```

5. Start the backend server: npm run start.
6. The backend will be running at http://localhost:8000.

## Design and Code Decisions 🧩

- **Daily Data Storage:** It has been decided to store daily weather history in a JSON format within a folder. This approach allows scalability, providing the flexibility to either move the data to a database like MongoDB or MySQL in the future or simply continue storing JSON files.

- **Weather Forecast Reference:** The initial weather forecast (obtained by the browser on the frontend) is based on the JSON of locations. Although OpenWeather might provide more accurate forecasts due to its broader geolocation coverage, it has been decided that the reference points will always be those in the JSON of locations.

For example, specific coordinates from Santa Coloma de Gramenet (my home) were used, and while OpenWeather can provide forecasts for those exact coordinates, Santa Coloma de Gramenet does not appear in the JSON of locations. The nearest location (or point) is "La Vallensana," which is on the outskirts of Santa Coloma. Therefore, Vallensana is used as the reference point, and forecasts and location data are based on this.

- **Creation of Classes and Useful Functions:** The code is designed to be scalable and reusable by separating responsibilities into different functions.

- **Use of Turf:** The Turf library is utilized for spatial calculations (e.g., calculating distances between coordinates) due to its community support and standardized formulas, which enhance code readability and maintainability.

## Future Improvements 🚀

- Database Integration: If the decision is made to store the weather history in a specific database, implement the necessary updates to integrate with that database.

- Data Filtering: Refine the information retrieved from OpenWeather by returning only the necessary fields in the JSON response. This will optimize the data processing and reduce unnecessary data transfer.

- Type Safety: Implement type safety by defining interfaces for the objects expected from OpenWeather. This will help ensure that the data conforms to the expected structure and improve code reliability.

- Enhanced Error Responses: Expand the range of response types to provide more detailed explanations for errors. This will improve error handling and contribute to a better user experience in the frontend by providing clearer information about issues.

- Cache responses: Use the weather forecast stored in the historic weather data to avoid calling OpenWeather API multiple times if we already have the weather data for that location and date stored in our future DB.

Happy coding! 💻
