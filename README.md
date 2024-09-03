# React Project with Master-Details

## Overview

The **React Project with Master-Details** is a React application built with TypeScript that interfaces with the [WorldCitiesAPI](https://github.com/TausifImtiaz/WorldCitiesAPI). This project demonstrates a Master-Details approach for managing city data, featuring CRUD (Create, Read, Update, Delete) operations. It provides a modern and interactive user interface for handling and displaying city information.

## Features

- **Master-Details Interface:** View a list of cities (master) and their detailed information (details).
- **CRUD Operations:** Perform Create, Read, Update, and Delete operations for city data.
- **React Framework:** Utilizes React and TypeScript for a responsive and maintainable web application.
- **WorldCitiesAPI Integration:** Connects to the WorldCitiesAPI for data retrieval and manipulation.

## Technologies Used

- React (v18 or later)
- TypeScript
- Node.js (v18.20.3)
- WorldCitiesAPI
- HTML/CSS
- Material-UI or other UI libraries (if used)

## Project Structure

- **src/components:** Contains React components for the Master-Details interface.
- **src/services:** Includes services for interacting with the WorldCitiesAPI.
- **src/models:** Defines TypeScript interfaces and models for city data.
- **src/hooks:** Custom hooks for managing state and API calls.
- **src/assets:** Contains static assets such as images and styles.

## Getting Started

### Prerequisites

- Node.js (v18.20.3)
- npm (v8.0.0 or later)
- Access to the [WorldCitiesAPI](https://github.com/TausifImtiaz/WorldCitiesAPI)

### Cloning the Repository

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/TausifImtiaz/React_Project.git
   ```

### Installation

1. **Navigate to the Project Directory:**
   ```bash
   cd React_Project
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

### Configuration

1. **Configure API Endpoint:**
   - Open `src/services/cityService.ts`.
   - Update the API endpoint to point to your instance of the WorldCitiesAPI.

### Running the Application

1. **Start the Development Server:**
   ```bash
   npm start
   ```

2. **Access the Application:**
   - Open a web browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. **Master-Details Interface:**
   - View a list of cities and select a city to view or edit its details.

2. **CRUD Operations:**
   - **Create:** Add new city records through the user interface.
   - **Read:** Display city information and details.
   - **Update:** Modify existing city records.
   - **Delete:** Remove city records from the list.

3. **API Integration:**
   - The application interacts with the WorldCitiesAPI for CRUD operations. Ensure the API endpoint is correctly configured.

## Code Example

### City Service Example

```typescript
import axios from 'axios';
import { City } from '../models/city';

const apiUrl = 'https://api.worldcitiesapi.com'; // Update with your API URL

export const getCities = async (): Promise<City[]> => {
  const response = await axios.get<City[]>(`${apiUrl}/cities`);
  return response.data;
};

export const getCity = async (id: number): Promise<City> => {
  const response = await axios.get<City>(`${apiUrl}/cities/${id}`);
  return response.data;
};

export const addCity = async (city: City): Promise<City> => {
  const response = await axios.post<City>(`${apiUrl}/cities`, city);
  return response.data;
};

export const updateCity = async (city: City): Promise<City> => {
  const response = await axios.put<City>(`${apiUrl}/cities/${city.id}`, city);
  return response.data;
};

export const deleteCity = async (id: number): Promise<void> => {
  await axios.delete<void>(`${apiUrl}/cities/${id}`);
};
```

## Contributing

Contributions are welcome! To contribute:
- Fork the repository.
- Create a feature branch.
- Commit your changes.
- Push to the branch.
- Open a pull request with a description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- React documentation
- TypeScript documentation
- [WorldCitiesAPI](https://github.com/TausifImtiaz/WorldCitiesAPI)

## Contact

For any questions or support, please contact [Tausif Imtiaz](mailto:tausifimtiaz@gmail.com).

