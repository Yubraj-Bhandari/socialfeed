# Social Feed - React + TypeScript + Vite

A modern social media feed application built with React, TypeScript, and Vite. Features infinite scrolling, real-time search, and a beautiful UI.

## Features

### ✨ Infinite Filtering & Search
- **Real-time Search**: Search posts by title or content with instant results
- **Infinite Scroll**: Automatically loads more posts as you scroll down
- **Load More Button**: Alternative explicit loading option for better accessibility
- **Debounced Search**: Optimized performance with 300ms debounce
- **Search Results Counter**: Shows how many posts match your search

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Cards**: Clean post cards with hover effects
- **Loading States**: Smooth loading indicators and animations
- **Search Bar**: Intuitive search with clear button

### 🔧 Technical Features
- **React Query**: Efficient data fetching with caching
- **TypeScript**: Full type safety
- **Tailwind CSS**: Modern styling with utility classes
- **React Router**: Client-side routing
- **Intersection Observer**: Smooth infinite scroll implementation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd socialfeed-main
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_BASE_URL=https://jsonplaceholder.typicode.com
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Search & Filter
1. Navigate to the Feed page
2. Use the search bar at the top to filter posts
3. Type any keyword to search through post titles and content
4. Results update in real-time as you type

### Infinite Scroll
- Scroll down to automatically load more posts
- Or use the "Load More Posts" button for explicit loading
- The app will show when you've reached the end of all posts

### Navigation
- **Feed**: View all posts with search and infinite scroll
- **Add Post**: Create new posts
- **Post Details**: Click "Read More" on any post to view full details

## Project Structure

```
src/
├── api/                 # API functions
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── postList.tsx    # Main post list with infinite scroll
│   ├── searchBar.tsx   # Search functionality
│   └── sideBar.tsx     # Navigation sidebar
├── hooks/              # Custom React hooks
│   ├── useQuery/       # Data fetching hooks
│   └── useDebounce.ts  # Debounce utility
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
