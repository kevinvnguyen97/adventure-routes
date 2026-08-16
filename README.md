# Adventure Routes

Adventure Routes is an application where users can plan out their trips by mapping places they want to go, and creating a planned routes between them. These trips can be shared between other users, encouraging interactions around these trips.

## Project Structure

This project is a monorepo, containing three main parts:

- Frontend (Web): The frontend is created using ReactJS, with Vite as the project builder. This is a dockerized container.
- Backend - This handles all API calls between the database and the web frontend/mobile application. This is a dockerized container.
- Mobile (Coming soon) - The mobile application is coded using React Native, built for both iOS and Android platforms.

## Running the Application

Build Containers:
`docker compose build`

Start the Application:
`docker compose up`
