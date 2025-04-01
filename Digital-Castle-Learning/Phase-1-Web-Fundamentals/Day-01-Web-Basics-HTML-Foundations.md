# Day 1: Web Basics & HTML Foundations

> **Castle Metaphor**: Today we're laying the foundation stones of our digital castle. HTML is like the basic structure that defines what rooms we'll have and how they connect.

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Set up a development environment
- Create a basic HTML document
- Use fundamental HTML tags
- Create your first webpage

## 🔑 Key Concepts

### HTML Basics

**HTML (HyperText Markup Language)** is the standard markup language for creating web pages. It describes the structure of a web page using elements enclosed in tags.

Key points about HTML:
- It's not a programming language but a markup language
- It uses **tags** to define elements on the page
- Tags are enclosed in angle brackets: `<tagname>`
- Most tags come in pairs: opening tag `<tagname>` and closing tag `</tagname>`
- The content goes between the opening and closing tags

### Document Structure

Every HTML document follows a standard structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Castle Page</title>
</head>
<body>
    <!-- Content goes here -->
    <h1>Welcome to my Digital Castle</h1>
    <p>This is where I'll build my online presence!</p>
</body>
</html>
```

Let's break this down:
- `<!DOCTYPE html>` - Tells the browser this is an HTML5 document
- `<html>` - The root element that contains all other HTML elements
- `<head>` - Contains meta-information about the document (not visible on the page)
- `<meta>` - Provides metadata about the HTML document
- `<title>` - Specifies the title shown in the browser tab
- `<body>` - Contains the visible content of the webpage

## 🧱 Essential HTML Tags

### Headings

HTML provides six levels of headings, from `<h1>` (most important) to `<h6>` (least important):

```html
<h1>Main Castle Entrance</h1>
<h2>North Tower</h2>
<h3>Guard Room</h3>
<h4>Weapon Rack</h4>
<h5>Small Shield</h5>
<h6>Shield Emblem</h6>
```

### Paragraphs

The `<p>` tag defines a paragraph:

```html
<p>Welcome to my digital castle. This castle is built with HTML, which forms the structure of all web pages you see online.</p>
```

### Divisions and Spans

- `<div>` - A block-level container for grouping content
- `<span>` - An inline container for text

```html
<div>
    <h2>Castle Library</h2>
    <p>The library contains <span style="color: gold;">ancient scrolls</span> and manuscripts.</p>
</div>
```

### Semantic HTML5 Elements

HTML5 introduced several semantic elements that give meaning to the structure:

```html
<header>The top part of your castle (banner, logo)</header>
<nav>The pathways connecting castle areas</nav>
<main>The main courtyard of your castle</main>
<section>A specific area or room in your castle</section>
<article>A self-contained element, like a scroll in your castle</article>
<aside>Information related but separate, like a castle notice board</aside>
<footer>The foundation information at the bottom of your castle</footer>
```

Using semantic elements is better than using generic `<div>` elements because:
- They make your code more readable
- They help with accessibility (screen readers)
- They improve SEO (search engines understand your content better)


## 🏰 Castle Builder's Note

Remember that HTML is just the foundation of your digital castle. In the coming days, we'll add CSS (the decoration and styling) and JavaScript (the interactive elements) to make your castle truly magnificent!

---