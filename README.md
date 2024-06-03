# Mini Real-Time Lottie Animation Editor

Welcome to the mini real-time Lottie animation editor project! This project aims to create an interactive, collaborative Lottie animation editor where users can upload JSON files, manipulate various properties, manage layers, and work together in real-time. Below you'll find a comprehensive overview of the project's objectives, technology stack, and key areas of focus.

## Objective

The primary goal of this project is to develop a Lottie animation editor with the following capabilities:

- Upload and edit JSON animation files.
- Manipulate animation properties such as speed, color, and scale.
- Manage layers, including viewing and removing layers.
- Enable real-time collaboration for multiple users to edit the same animation simultaneously.
- Import animations from the LottieFiles website using their GraphQL API.

## Technology Stack

- **Frontend:** React
- **TypeScript:** For type safety
- **Real-Time Collaboration:** Supabase Realtime
- **Authentication:** Supabase Auth
- **GraphQL:** For fetching featured animations from LottieFiles
- **State Management:** Redux
- **Database:** Supabase Postgres

## Key Features

### Authentication

- **Supabase Auth:** Used for user authentication to manage user sessions and permissions.

### Real-Time Collaboration

- **Supabase Realtime:** Utilized for real-time updates, allowing multiple users to edit animations simultaneously.
- **Chat:** A real-time chat feature where users can discuss changes and collaborate more effectively.

### API Interactions

- **LottieFiles GraphQL API:** Fetch and showcase featured animations for users to import and edit.

## Project Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/wijayantoap/real-time-animation-editor
   cd real-time-animation-editor
   ```
2. **Install Dependencies**

- npm install

3. **Run the Application**

- npm start

## Folder Structure

```sh
lottie-animation-editor/
├── public/
├── src/
│   ├── assets/
│   ├── client/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── helper/
│   ├── hooks/
│   ├── pages/
│   ├── queries/
│   ├── services/
│   ├── redux/
│       ├── slices/
│       ├── store/
│   ├── App.tsx
│   ├── index.tsx
│   └── ... (other files and folders)
├── package.json
└── README.md
```
