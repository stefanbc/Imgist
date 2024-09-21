# Cloudflare R2 Image Manager

This is a **React TypeScript** application built using **Vite**, **Material UI (MUI)**, **Tailwind CSS**, **Tanstack Query**, and **Zustand** for managing images on **Cloudflare R2**. The app allows users to upload and manage (view and delete) images.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- Upload images to Cloudflare R2.
- View a list of uploaded images.
- Delete images from Cloudflare R2.
- State management using Zustand.
- Asynchronous data fetching using Tanstack Query.
- Error handling with React Error Boundaries and React Query.

## Technologies Used

- **React (with TypeScript)** – Frontend framework for building the UI.
- **Vite** – A fast build tool for modern web applications.
- **Material UI (MUI)** – UI components library.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **Tanstack Query (React Query)** – Powerful data-fetching and state synchronization library.
- **Zustand** – Minimalist state management library.
- **Cloudflare R2** – Object storage platform used for storing images.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16.x or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/cloudflare-r2-image-manager.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd cloudflare-r2-image-manager
   ```

3. **Install the dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

### Running the Development Server

Start the development server using Vite:

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see the app in action.

## Configuration

1. **Set up Cloudflare R2 credentials:**

   To interact with Cloudflare R2 for image upload and management, you'll need to configure API credentials.

2. **API Configuration:**

   Modify the `/upload` and `/images` API routes in the code (`axios` requests) to match your Cloudflare R2 API endpoints.

   Example:

   ```typescript
   const uploadImage = async (file: File): Promise<ImageResponse> => {
     const formData = new FormData();
     formData.append('file', file);

     const { data } = await axios.post('/upload', formData); // Modify with actual endpoint
     return data;
   };
   ```

3. **Environment Variables:**

   Set environment variables in a `.env` file in the root directory for sensitive configurations like API URLs, Cloudflare credentials, etc.

   Example `.env`:

   ```env
   VITE_API_BASE_URL=https://your-cloudflare-r2-endpoint.com
   ```

## Project Structure

```bash
src/
├── assets/             # Static assets (e.g., images, icons)
├── components/         # Reusable React components
│   ├── ImageUploader.tsx  # Component to upload images
│   ├── ImageList.tsx      # Component to display and delete images
│   └── ErrorBoundary.tsx  # Error boundary component
├── store/              # Zustand store for global state management
│   └── useImageStore.ts   # Store for image state
├── App.tsx             # Main application component
├── main.tsx            # Entry point for the React app
└── index.css           # Tailwind CSS imports
```

## Usage

1. **Uploading Images:**
   - Use the file input to select an image from your local machine.
   - Click the **Upload** button to upload the image to Cloudflare R2.

2. **Viewing Images:**
   - The list of uploaded images is fetched from Cloudflare R2 and displayed on the page.

3. **Deleting Images:**
   - Click the **Delete** button under an image to remove it from Cloudflare R2.

## Error Handling

This project uses a combination of **Error Boundaries** and **React Query error handling** for robust error management.

- **Error Boundaries:** Used to catch JavaScript errors during rendering or lifecycle methods and display a fallback UI.
- **React Query onError:** Used to catch errors in asynchronous API requests, such as fetching and deleting images, with appropriate messages for the user.

### Example

```tsx
const { data, error, isLoading } = useQuery(['images'], fetchImages, {
  onError: (error) => {
    console.error("Error fetching images:", error);
  }
});

if (error) {
  return <Typography color="error">Error fetching images. Please try again later.</Typography>;
}
```

## Contributing

Contributions are welcome! If you would like to contribute, please:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Enjoy managing your images with Cloudflare R2

If you encounter any issues, feel free to open an issue or contribute to improve this project.
