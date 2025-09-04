# React Frontend for Order Management

This project is a React-based frontend application for managing orders. It provides pages to create, list, view, update, and delete orders, and connects to the existing Node.js API backend.

## Features
- List all orders
- View details of a single order
- Create a new order
- Update an existing order
- Delete an order

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm start
   ```
3. The app will run on http://localhost:3000 by default.

## API Configuration

Set the API base URL in a `.env` file in the `frontend` directory:
```
REACT_APP_API_BASE_URL=http://<API_LB_PUBLIC_IP>:3000
```
Replace `<API_LB_PUBLIC_IP>` with your API's public IP or DNS name.

---

This project was scaffolded with Create React App or Vite (see package.json for details).
# frontend
