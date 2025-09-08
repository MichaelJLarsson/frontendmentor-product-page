# React Setup

This project now includes a React + Vite setup alongside the original static HTML version.

## Files Structure

- `index.html` - Original static HTML version
- `index-react.html` - React version entry point
- `src/` - React source code
  - `src/main.jsx` - React entry point
  - `src/App.jsx` - Main app component
  - `src/components/` - Modular React components
    - `Header.jsx` - Navigation header
    - `ProductImage.jsx` - Product image gallery
    - `ProductInfo.jsx` - Product details and purchase controls
    - `Sidebar.jsx` - Mobile menu sidebar
- `public/` - Static assets (copied from original assets/ and images/)

## Running the React Version

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000/index-react.html

## Building for Production

```bash
npm run build
```

## Original Static Version

The original HTML/CSS version remains unchanged and can still be accessed via `index.html`.