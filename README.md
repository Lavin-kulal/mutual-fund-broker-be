# Mutual Fund Broker Backend

This repository contains the backend application for the Mutual Fund Broker system. Below are detailed instructions for setting up and running the project locally.

## Prerequisites

Before getting started, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)

## Setup Instructions

### 1. Clone the Repository

Clone the repository using SSH:
```bash
git clone git@github.com:Lavin-kulal/mutual-fund-broker-be.git
cd mutual-fund-broker-be
```

### 2. Install Dependencies

Install all required dependencies:
```bash
npm install
```

### 3. Build the Application

Build the application:
```bash
npm run build
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory. The required environment variables will be shared separately via email. Do not share these credentials publicly.

Required environment variables include:
- `RAPIDAPI_KEY`
- `PORT`
- `MONGODB_URI`
- `NODE_ENV`
- `JWT_SECRET`
- `JWT_EXPIRATION`
- `SESSION_SECRET`

### 5. RapidAPI Setup

1. Sign up for an account on [RapidAPI](https://rapidapi.com/) to obtain your own API key.
2. The application integrates with the [Latest Mutual Fund NAV API](https://rapidapi.com/suneetk92/api/latest-mutual-fund-nav) to fetch mutual fund data.
3. The implementation specifically fetches open-ended schemes and provides functionality to filter by fund family.

### 6. Database Setup

1. Ensure MongoDB server is running on your local system.
2. The application will automatically connect to the database specified in your `.env` file.

### 7. Run the Application

Start the development server:
```bash
npm run dev-start
```

This will launch the server with hot reloading enabled via nodemon.

## Project Structure

```
mutual-fund-broker-be/
├── src/                # Source code
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic and external API integration
│   ├── middleware/     # Express middleware
│   ├── utils/          # Utility functions
│   └── index.js        # Application entry point
├── dist/               # Compiled JavaScript files (after build)
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Available Scripts

In the project directory, you can run:

### `npm run dev-start`
Runs the server in development mode with hot reloading

### `npm run build`
Compiles TypeScript files to JavaScript in the `dist` folder

### `npm start`
Runs the compiled application from the `dist` folder

### `npm test`
Runs the test suite

## API Integration

The backend integrates with the [Latest Mutual Fund NAV API](https://rapidapi.com/suneetk92/api/latest-mutual-fund-nav) to fetch:
- Open-ended mutual fund schemes
- Fund data filtered by fund family house
- Latest NAV (Net Asset Value) information

## Data Storage

The application uses MongoDB to store:
- User information
- Investment portfolios
- Transaction history
- Fund watchlists

## Authentication

The system implements JWT-based authentication with the following features:
- Secure user login/signup
- Token-based session management
- Role-based access control

## Troubleshooting

### Common Issues

1. **MongoDB connection errors**
   - Ensure MongoDB is running locally (`mongod` service)
   - Verify the connection string in your `.env` file
   - Check network configuration if using a remote MongoDB instance

2. **RapidAPI key issues**
   - Verify your RapidAPI key is correctly set in the `.env` file
   - Check your RapidAPI subscription plan limits
   - Ensure you've subscribed to the "Latest Mutual Fund NAV" API

3. **Build errors**
   - Check for TypeScript errors in your codebase
   - Ensure all dependencies are correctly installed
   - Try removing `node_modules` and `package-lock.json`, then run `npm install` again,then do `npm run build` ,once build is successfull run the server with command ``npm run dev-start``

## Contributing

Please refer to our contribution guidelines before submitting pull requests to the project.

## Contact

For any questions or support, please contact the repository maintainer at [laveenk0032@gmail.com](mailto:laveenk0032@gmail.com).
