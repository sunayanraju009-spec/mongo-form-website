# FormSpace — HTML/CSS/JS + MongoDB

A responsive form website. The browser sends form data to an Express backend; the backend validates it and saves it to MongoDB using Mongoose. **Do not connect to MongoDB directly from browser JavaScript** because that would expose your database credentials.

## Requirements
- Node.js (LTS)
- A MongoDB Atlas account (or a local MongoDB server)
- VS Code (optional)

## Setup
1. Extract this folder and open it in VS Code.
2. Open the terminal in this folder and run:
   ```bash
   npm install
   ```
3. In MongoDB Atlas, create a free cluster, create a database user, and add your current IP address under **Network Access**.
4. Copy `.env.example` to a new file named `.env`.
5. Replace `MONGODB_URI` in `.env` with your Atlas connection string. Replace the username, password, and cluster host with your own values. URL-encode special characters in the password. Keep `.env` private; never upload it to GitHub.
6. Start the website:
   ```bash
   npm start
   ```
7. Open **http://localhost:3000** in your browser and submit the form.
8. In Atlas, open **Browse Collections**. The database `formWebsite` and collection `submissions` will be created automatically after the first successful submission.

## API
- `POST /api/submissions` — validates and stores a form submission.
- `GET /api/health` — reports API and database connection status.

## Customize
Edit `public/index.html` to change form fields and `server.js` to change the MongoDB schema/API validation. If you add a new field, add it to both the form and the schema/API handling.
