# Day 11: React Fundamentals

> **Castle Metaphor**: Today we begin working with pre-built, reusable castle components. React is like a magical system that lets us create standardized parts of our castle that we can reuse and customize.

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Understand React's component-based architecture
- Set up a React project using Vite
- Create your first React component
- Learn JSX syntax and how it works
- Render React elements to the DOM

## 🔑 Key Concepts

### What is React?

**React** is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by Facebook and a community of individual developers and companies.

Key features of React:
- **Component-based architecture**: Build encapsulated components that manage their own state
- **Declarative**: Describe what your UI should look like, React takes care of updating the DOM
- **Virtual DOM**: React creates a lightweight representation of the real DOM in memory for better performance
- **One-way data flow**: Data flows down from parent to child components, making code more predictable
- **JSX**: A syntax extension that lets you write HTML-like code in your JavaScript

### Why React?

React has become one of the most popular frontend libraries because:
1. It simplifies building complex, interactive UIs
2. It's highly efficient in updating and rendering components
3. It promotes reusable code and component-based thinking
4. It has a strong ecosystem and community support
5. It's used by many large companies (Facebook, Instagram, Netflix, Airbnb, etc.)

## 🛠️ Setting Up a React Project with Vite

[Vite](https://vitejs.dev/) is a modern build tool that provides a faster and leaner development experience for web projects. It's an excellent alternative to Create React App.

Let's set up a new React project with Vite:

```bash
# Create a new project
npm create vite@latest my-castle-react -- --template react

# Navigate to project folder
cd my-castle-react

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Project Structure

After setup, you'll have a project structure like this:

```
my-castle-react/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
```

The most important files to focus on:
- `index.html`: The HTML template
- `src/main.jsx`: The entry point of the application
- `src/App.jsx`: The main App component

## 🧩 Understanding React Components

Components are the building blocks of React applications, like prefabricated sections of our castle.

There are two types of components:
1. **Functional Components** (modern approach)
2. **Class Components** (legacy approach)

We'll focus on functional components, as they're now the recommended approach in React.

### Your First React Component

A React component is a JavaScript function that returns JSX (React elements):

```jsx
// A simple React component
function Greeting() {
  return <h1>Welcome to my Castle!</h1>;
}

export default Greeting;
```

Components should:
- Start with a capital letter
- Return a single root element
- Be pure (given the same input, always render the same output)

## 🎭 JSX: JavaScript + XML

JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files.

```jsx
const element = <h1>Hello, castle visitor!</h1>;
```

JSX gets transpiled to regular JavaScript by tools like Babel:

```javascript
// Transpiled version of the above
const element = React.createElement("h1", null, "Hello, castle visitor!");
```

### JSX Rules and Syntax

1. **Return a single root element**:
   ```jsx
   // Good
   return (
     <div>
       <h1>Castle Entrance</h1>
       <p>Welcome to our castle!</p>
     </div>
   );
   
   // Or use React Fragment
   return (
     <>
       <h1>Castle Entrance</h1>
       <p>Welcome to our castle!</p>
     </>
   );
   
   // Bad - Multiple root elements
   return (
     <h1>Castle Entrance</h1>
     <p>Welcome to our castle!</p>
   );
   ```

2. **Close all tags**:
   ```jsx
   // Good
   <img src="castle.jpg" alt="Castle" />
   
   // Bad
   <img src="castle.jpg" alt="Castle">
   ```

3. **camelCase most attributes**:
   ```jsx
   // Good
   <div className="castle" onClick={handleClick}>
   
   // Bad
   <div class="castle" onclick={handleClick}>
   ```

4. **JavaScript expressions in curly braces**:
   ```jsx
   const castleName = "Highgarden";
   return <h1>Welcome to {castleName}!</h1>;
   ```

## 🏗️ Creating a Simple React App

Let's modify our new React project to create a simple castle component system:

1. First, clean up the default content in `src/App.jsx`:

```jsx
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="castle">
      <h1>My Digital Castle</h1>
      <p>Built with React components</p>
    </div>
  )
}

export default App
```

2. Now, let's create our first custom component. Create a new file `src/components/CastleTower.jsx`:

```jsx
// src/components/CastleTower.jsx
function CastleTower() {
  return (
    <div className="castle-tower">
      <h2>North Tower</h2>
      <p>This tower stands 100 feet tall and offers a magnificent view.</p>
    </div>
  )
}

export default CastleTower
```

3. Import and use this component in `App.jsx`:

```jsx
import { useState } from 'react'
import './App.css'
import CastleTower from './components/CastleTower'

function App() {
  return (
    <div className="castle">
      <h1>My Digital Castle</h1>
      <p>Built with React components</p>
      
      <div className="castle-structures">
        <CastleTower />
      </div>
    </div>
  )
}

export default App
```

## 🔄 Rendering Elements

React renders components to the DOM through a "root" DOM node. In a Vite React project, this happens in `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### The Rendering Process:

1. The `ReactDOM.createRoot()` method creates a React root in the DOM element with ID 'root'
2. The `render()` method displays the specified component inside that root
3. `<React.StrictMode>` helps identify potential problems in the application

## 💪 Practical Exercise: Build a Castle Component System

Let's expand our castle by creating more components!

1. Create a component for a castle wall (`src/components/CastleWall.jsx`):

```jsx
// src/components/CastleWall.jsx
function CastleWall() {
  return (
    <div className="castle-wall">
      <h2>Castle Wall</h2>
      <p>A mighty wall 20 feet high and 10 feet thick, made of stone.</p>
    </div>
  )
}

export default CastleWall
```

2. Create a component for a castle gate (`src/components/CastleGate.jsx`):

```jsx
// src/components/CastleGate.jsx
function CastleGate() {
  return (
    <div className="castle-gate">
      <h2>Main Gate</h2>
      <p>A reinforced wooden gate with iron hinges. The entrance to our castle.</p>
    </div>
  )
}

export default CastleGate
```

3. Update `App.jsx` to use all our components:

```jsx
import { useState } from 'react'
import './App.css'
import CastleTower from './components/CastleTower'
import CastleWall from './components/CastleWall'
import CastleGate from './components/CastleGate'

function App() {
  return (
    <div className="castle">
      <h1>My Digital Castle</h1>
      <p>Built with React components</p>
      
      <div className="castle-structures">
        <CastleGate />
        <CastleWall />
        <CastleTower />
      </div>
    </div>
  )
}

export default App
```

4. Add some basic styling in `App.css`:

```css
.castle {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.castle-structures {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.castle-gate, .castle-wall, .castle-tower {
  border: 2px solid #333;
  border-radius: 8px;
  padding: 15px;
}

.castle-gate {
  background-color: #8B4513;
  color: white;
}

.castle-wall {
  background-color: #A9A9A9;
}

.castle-tower {
  background-color: #696969;
  color: white;
}
```

## 🔍 Challenge Tasks

1. Create a `CastleCourtyard` component
2. Create a `CastleKeep` component (the main building inside a castle)
3. Add an image to at least one of your components
4. Add a `CastleBanner` component that displays the castle name and a slogan
5. Arrange the components in a more interesting layout using CSS flexbox or grid

## 📚 Additional Resources

- [Official React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Hooks Overview](https://react.dev/reference/react)
- [JSX In Depth](https://legacy.reactjs.org/docs/jsx-in-depth.html)
- [Thinking in React](https://react.dev/learn/thinking-in-react)

## 🏰 Castle Builder's Note

Today we laid the foundation for building with React components. These reusable building blocks will allow us to create more complex and interactive castle features. Tomorrow, we'll learn about props, which will let us customize our components for different uses—like creating castle towers of different heights and colors!

---

**Tomorrow:** We'll learn about React Props, allowing us to make our castle components more customizable and reusable. 