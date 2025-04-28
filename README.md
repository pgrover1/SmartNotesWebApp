# Smart Notes App

A Next.js application for note-taking with AI-powered features.

## Features

- Create, read, update, and delete notes
- Create, read, update, and delete categories
- Assign categories to notes
- AI-powered note summarization using OpenAI
- AI-powered category suggestions
- Sentiment analysis for notes
- Search notes by keyword or using natural language queries

## Technologies Used

- Next.js 14
- React 19
- TypeScript
- Tailwind CSS
- React Query for data fetching and state management
- React Hook Form for form handling
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd notes-app
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following content:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Replace the URL with your API server URL if it's running on a different port or host.

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/src/app` - Next.js app directory
- `/src/app/components` - React components
  - `/src/app/components/notes` - Note-related components
  - `/src/app/components/categories` - Category-related components
  - `/src/app/components/ui` - Reusable UI components
- `/src/app/lib` - Utility functions and hooks
- `/src/app/services` - API service functions
- `/src/app/types` - TypeScript type definitions

## API Integration

The application integrates with a backend API that provides the following endpoints:

- Notes: CRUD operations, search, summarization, category suggestion, and sentiment analysis
- Categories: CRUD operations

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## License

[MIT](LICENSE)
