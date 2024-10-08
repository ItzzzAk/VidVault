# 📹 Video Gallery
![Screenshot of VidVault](public/css/Screenshot%202024-09-24%20214940.png)

This project is a Video Gallery application that allows users to upload, view, and manage videos. The application is built using Node.js, Express, MongoDB, and Firebase.

## ✨ Features

- 🔒 User authentication and authorization
- 📤 Video upload and storage
- 📺 Video viewing and management
- 🔐 Secure environment variable management
- 🔄 Real-time database updates

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/videogallery.git
   cd videogallery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   SESSION_SECRET=your_session_secret
   ```

## 🚀 Usage

1. Start the application:
   ```bash
   npm start
   ```

2. For development, use:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `config/`: Contains configuration files for Firebase and Mongoose.
  - `firebase.js`: Initializes Firebase Admin SDK.
  - `mongoose.js`: Connects to MongoDB using Mongoose.
- `.env`: Environment variables for secure configuration.
- `package.json`: Project metadata and dependencies.
- `.gitignore`: Specifies files and directories to be ignored by Git.

## 📦 Dependencies

- `bcrypt`: For hashing passwords.
- `config`: For managing configuration files.
- `connect-flash`: For flash messages.
- `cookie-parser`: For parsing cookies.
- `cors`: For enabling Cross-Origin Resource Sharing.
- `dotenv`: For loading environment variables.
- `ejs`: For rendering templates.
- `express`: For building the server.
- `express-session`: For managing sessions.
- `firebase-admin`: For Firebase Admin SDK.
- `joi`: For data validation.
- `jsonwebtoken`: For generating and verifying JSON Web Tokens.
- `mongoose`: For MongoDB object modeling.
- `multer`: For handling file uploads.
- `passport`: For authentication.
- `passport-local`: For local authentication strategy.

## 🛠️ Development Dependencies

- `autoprefixer`: For adding vendor prefixes to CSS.
- `postcss`: For transforming CSS with JavaScript.
- `tailwindcss`: For utility-first CSS framework.

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Passport.js, JWT
- **Storage**: Firebase Storage
- **Environment Management**: dotenv

## 🔒 Backend API Endpoints

- `POST /signup`: Create an account.
- `POST /login`: Authenticate and receive a JWT token.
- `POST /upload`: Upload a video with a caption.
- `GET /videos`: Retrieve all videos for the authenticated user.
- `PUT /video/:id`: Update the caption of a video.
- `DELETE /video/:id`: Delete a video.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Description of your changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-branch
   ```
5. Create a pull request.

## 📜 License

This project is licensed under the ISC License.

## 👤 Author

Amol Kalel
