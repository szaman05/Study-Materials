# Learning React Fundamentals with AI Assistance

In this guide, we'll learn the fundamentals of React using AI tools to accelerate our learning and minimize manual coding. React is a JavaScript library for building user interfaces, particularly single-page applications.

## Setting Up a React Project with AI

Let's start by creating a new React project using Vite. We'll use AI to help us with the setup process:

1. Open your terminal
2. Ask your AI assistant: "What is the command to create a new React project with Vite and TypeScript?"
3. The AI will likely suggest something like:
   ```bash
   npm create vite@latest my-react-app -- --template react-ts
   ```
4. Run the suggested command and follow the instructions
5. Navigate to the project and install dependencies:
   ```bash
   cd my-react-app
   npm install
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Understanding React Core Concepts with AI

Now let's use AI to explain the core concepts of React:

### 1. Components

Ask your AI: "What are React components? Explain the difference between functional and class components with examples."

Take notes on:
- What components are
- Functional vs. class components
- Component composition

### 2. JSX

Ask your AI: "What is JSX in React? Provide simple examples of JSX syntax."

Take notes on:
- JSX syntax
- How JSX differs from HTML
- JSX expressions and statements

### 3. Props

Ask your AI: "Explain React props with examples. How are props passed between components?"

Take notes on:
- What props are
- How to pass props
- Props validation
- Default props

### 4. State

Ask your AI: "Explain React state and useState hook with examples. When should I use state in a component?"

Take notes on:
- What state is
- useState hook
- State updates
- Lifting state up

### 5. Lifecycle and Effects

Ask your AI: "Explain React component lifecycle and useEffect hook with examples."

Take notes on:
- Component lifecycle
- useEffect hook
- Dependency arrays
- Cleanup functions

## Creating React Components with AI Assistance

Let's practice creating React components using AI:

### Exercise 1: Create a Simple Counter Component

1. In your project, create a file named `Counter.tsx` in the `src/components` directory (create the directory if it doesn't exist)
2. Ask your AI: "Create a React functional component in TypeScript that implements a counter with increment and decrement buttons. Use the useState hook."
3. Implement the suggested code
4. Ask your AI to explain any parts you don't understand

### Exercise 2: Create a Todo List Component

1. Create a file named `TodoList.tsx` in the `src/components` directory
2. Ask your AI: "Create a React Todo List component in TypeScript that allows users to add, remove, and mark todos as complete. Use the useState hook for state management."
3. Implement the suggested code
4. Ask your AI to modify the code to add features like editing todos or filtering by status

## Using AI to Add Styling with TailwindCSS

Let's enhance our components with TailwindCSS:

1. Ask your AI: "How do I add TailwindCSS to my Vite React project?"
2. Follow the AI's instructions to set up TailwindCSS
3. Ask your AI: "How can I style my Counter component using TailwindCSS to make it look modern with a clean UI?"
4. Apply the suggested styling to your Counter component
5. Try the same process for your TodoList component

## Using AI to Understand Advanced React Concepts

Ask your AI to explain these more advanced React concepts:

1. Context API: "Explain React Context API with a simple example"
2. Custom Hooks: "What are custom hooks in React and how can I create one?"
3. React Router: "How does React Router work? Provide an example of basic routing"
4. State Management: "Compare different state management approaches in React (useState, useReducer, Context, Redux)"

## Exercise: Building a Mini-Application with AI Help

Let's combine what we've learned to build a mini-application:

1. Ask your AI: "Help me plan a simple React application that shows a list of products. Users should be able to:
   - View all products
   - Filter products by category
   - Search products by name
   - Add products to a cart
   - View the cart"

2. Ask the AI to help you implement each feature one by one, explaining the code as you go

3. Use the AI to troubleshoot any issues you encounter

## Next Steps

Now that you understand React fundamentals, proceed to [02-Vite-and-Project-Structure.md](./02-Vite-and-Project-Structure.md) to learn about Vite and how to structure a React project. 