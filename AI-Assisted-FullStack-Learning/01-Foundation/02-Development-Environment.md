# Setting Up Your Development Environment

In this guide, we'll set up a complete development environment for full stack development using AI assistance. Rather than manually following complex installation steps, we'll leverage AI tools to guide us through the process.

## Core Development Tools

We'll need to install these essential tools:

1. **Node.js and npm** - For running JavaScript
2. **Git** - For version control
3. **Code Editor (Cursor or VS Code)** - For writing code
4. **Docker** - For containerization
5. **Database Tools** - For PostgreSQL

## Using AI to Set Up Your Environment

### Step 1: Let's use AI to help install the necessary tools

1. Open ChatGPT, Claude, or Cursor AI
2. Ask: "I need to set up a development environment for full stack development with React, Node.js, Express, PostgreSQL, Docker, and Kubernetes. I'm on [your operating system]. Please provide step-by-step installation instructions."
3. Follow the AI-generated instructions for your specific operating system

### Step 2: Verify your installations

After following the AI-generated instructions, let's verify that everything is installed correctly. Open your terminal and run these commands:

```bash
node -v
npm -v
git --version
docker --version
```

If any command fails, ask your AI assistant to troubleshoot the specific issue.

## Setting Up Your IDE with AI Features

### Option 1: Cursor AI (Recommended)

Cursor is an AI-first code editor based on VS Code that has AI capabilities built in.

1. Download and install Cursor from [https://cursor.sh/](https://cursor.sh/)
2. Open Cursor and explore its AI features:
   - Press `Ctrl+K` or `Cmd+K` to chat with the AI
   - Try asking it: "What are your main features and how can I use them?"

### Option 2: VS Code with GitHub Copilot

1. Download and install VS Code from [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Install the GitHub Copilot extension
3. Set up your GitHub Copilot account and authenticate

## Setting Up Version Control

Let's set up Git and connect to GitHub using AI assistance:

1. In your terminal, run:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. In Cursor or with ChatGPT, ask: "How do I generate an SSH key and add it to my GitHub account?" Then follow the generated instructions.

## Setting Up Docker with AI Assistance

Docker can be complex to learn, but AI can help explain the basics:

1. Open Cursor AI and ask: "Can you explain Docker concepts like containers, images, and Docker Compose in simple terms? Also, how do I verify my Docker installation is working correctly?"

2. Follow the AI's instructions to test your Docker installation

## Exercise: Create a Project Template with AI

Let's use AI to help us create a basic project structure that we'll build upon throughout this learning path:

1. Open Cursor AI and ask: "Can you help me create a basic folder structure for a full stack project with React frontend and Node.js backend? I plan to use Vite, TailwindCSS, Express, and PostgreSQL."

2. Create the suggested folder structure in a new directory named "ai-fullstack-project"

3. Ask the AI: "What files should I create in each folder to set up a minimal starting point? Please provide file names and contents."

4. Create the suggested files with AI-generated content

## Next Steps

Now that you have your development environment set up, proceed to [03-Full-Stack-Concepts.md](./03-Full-Stack-Concepts.md) to learn about the fundamental concepts of full stack development with AI assistance. 