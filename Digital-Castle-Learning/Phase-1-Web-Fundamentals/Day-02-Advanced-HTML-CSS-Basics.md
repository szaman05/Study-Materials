# Day 2: Advanced HTML & CSS Basics

> **Castle Metaphor**: Today we're adding decorations and colors to our castle walls. If HTML is the structure, CSS is the paint, tapestries, and decorative elements that make our castle beautiful.

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Use more advanced HTML elements (lists, links, images, tables)
- Understand CSS basics and how to connect CSS to HTML
- Apply styles to HTML elements using selectors
- Change colors, fonts, and text properties
- Create a more visually appealing castle homepage

## 🔑 Key Concepts

### Advanced HTML Elements

#### Lists
HTML provides two main types of lists:

**Ordered Lists** (`<ol>`) - for numbered sequences:
```html
<ol>
    <li>Enter the castle through the main gate</li>
    <li>Turn right at the grand hall</li>
    <li>Climb the spiral staircase to the top floor</li>
</ol>
```

**Unordered Lists** (`<ul>`) - for bullet points:
```html
<ul>
    <li>Castle Guards</li>
    <li>Royal Family</li>
    <li>Court Advisors</li>
    <li>Kitchen Staff</li>
</ul>
```

#### Links
The `<a>` (anchor) tag creates hyperlinks:
```html
<a href="https://en.wikipedia.org/wiki/Castle">Learn more about castles</a>
```

For linking to pages within your own castle:
```html
<a href="tower.html">Visit the North Tower</a>
```

#### Images
The `<img>` tag displays images:
```html
<img src="castle.jpg" alt="A majestic castle on a hill" width="300" height="200">
```

Key attributes:
- `src`: Path to the image file
- `alt`: Alternative text for accessibility
- `width`, `height`: Dimensions in pixels

#### Tables
Tables are created using `<table>`, `<tr>` (table row), `<th>` (table header), and `<td>` (table data):

```html
<table>
    <tr>
        <th>Castle Room</th>
        <th>Purpose</th>
    </tr>
    <tr>
        <td>Great Hall</td>
        <td>Feasts and celebrations</td>
    </tr>
    <tr>
        <td>Throne Room</td>
        <td>Royal audiences</td>
    </tr>
</table>
```

### Introduction to CSS

**CSS (Cascading Style Sheets)** is a language used to describe the presentation of HTML documents. It controls layout, colors, fonts, and more.

#### Connecting CSS to HTML

There are three ways to add CSS to HTML:

**1. Inline CSS** - using the `style` attribute:
```html
<p style="color: blue; font-size: 16px;">This is a blue paragraph.</p>
```

**2. Internal CSS** - using the `<style>` tag in the `<head>` section:
```html
<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
    </style>
</head>
```

**3. External CSS** (recommended) - linking to a separate CSS file:
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

With a `styles.css` file containing:
```css
p {
    color: blue;
    font-size: 16px;
}
```

#### CSS Selectors

CSS selectors determine which HTML elements to style:

**Element Selector** - styles all elements of a specific type:
```css
p {
    color: darkblue;
}
```

**Class Selector** - styles elements with a specific class attribute:
```css
.castle-room {
    background-color: beige;
}
```

Used in HTML like this:
```html
<div class="castle-room">The Grand Hall</div>
```

**ID Selector** - styles a single unique element:
```css
#main-tower {
    height: 300px;
}
```

Used in HTML like this:
```html
<div id="main-tower">The tallest tower in the castle</div>
```

#### Basic CSS Properties

**Text Properties**:
```css
p {
    color: #333333;         /* Text color */
    font-family: Arial, sans-serif;  /* Font type */
    font-size: 16px;        /* Text size */
    font-weight: bold;      /* Text boldness */
    text-align: center;     /* Text alignment */
    line-height: 1.5;       /* Space between lines */
    text-decoration: underline;  /* Text decoration */
}
```

**Color and Background**:
```css
div {
    background-color: #f5f5f5;    /* Background color */
    color: #0000ff;               /* Text color */
    border: 1px solid #000000;    /* Border */
}
```

**Dimensions**:
```css
.castle-image {
    width: 300px;          /* Width */
    height: 200px;         /* Height */
    margin: 10px;          /* Space outside the element */
    padding: 20px;         /* Space inside the element */
}
```

## 🛠️ Building with CSS

### The CSS Box Model

Every HTML element is treated as a box with:
- **Content**: The actual content of the element
- **Padding**: Space between content and border
- **Border**: A line around the padding
- **Margin**: Space outside the border

```css
.castle-room {
    width: 200px;        /* Content width */
    padding: 20px;        /* Space inside */
    border: 2px solid brown; /* Border */
    margin: 15px;        /* Space outside */
}
```

### CSS Colors

Colors can be specified in several formats:

**Named Colors**:
```css
h1 {
    color: darkblue;
    background-color: lightgray;
}
```

**Hexadecimal Notation**:
```css
h1 {
    color: #00008B;  /* Dark blue */
    background-color: #D3D3D3;  /* Light gray */
}
```

**RGB Function**:
```css
h1 {
    color: rgb(0, 0, 139);  /* Dark blue */
    background-color: rgb(211, 211, 211);  /* Light gray */
}
```

## 💪 Practical Exercise: Enhance Your Castle Homepage

Let's improve the castle homepage we created in Day 1 by adding more HTML elements and CSS styling.

1. Create a new file in your "my-digital-castle" folder named `styles.css`

2. Add the following CSS code to this file:

```css
/* General Styles */
body {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
}

/* Header Styles */
header {
    background-color: #8B4513;  /* Brown like wood */
    color: #FFF;
    padding: 20px;
    text-align: center;
}

header h1 {
    margin: 0;
    font-size: 2.5em;
}

/* Main Content */
main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

section {
    background-color: #FFF;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 5px;
    border-left: 5px solid #8B4513;
}

h2 {
    color: #8B4513;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 5px;
}

/* Lists */
ul, ol {
    margin-left: 20px;
}

li {
    margin-bottom: 5px;
}

/* Footer */
footer {
    text-align: center;
    padding: 10px;
    background-color: #333;
    color: #FFF;
    font-size: 0.8em;
}
```

3. Update your `index.html` file to link to your CSS file and add more HTML elements:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Digital Castle</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to My Digital Castle</h1>
        <p>A place where imagination meets technology</p>
    </header>
    
    <main>
        <section>
            <h2>About My Castle</h2>
            <p>This castle was founded in 2023 and is built with the finest HTML stones and CSS decorations.</p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Edinburgh_Castle_from_the_North.JPG/320px-Edinburgh_Castle_from_the_North.JPG" alt="Castle Image" width="300">
        </section>
        
        <section>
            <h2>Castle Features</h2>
            <ul>
                <li>Strong HTML foundation</li>
                <li>Beautiful CSS decorations</li>
                <li>Interactive JavaScript elements (coming soon)</li>
                <li>Responsive design for all devices</li>
            </ul>
        </section>
        
        <section>
            <h2>Castle Rooms</h2>
            <table>
                <tr>
                    <th>Room</th>
                    <th>Function</th>
                </tr>
                <tr>
                    <td>Great Hall</td>
                    <td>Meetings and festivities</td>
                </tr>
                <tr>
                    <td>Library</td>
                    <td>Knowledge and learning</td>
                </tr>
                <tr>
                    <td>Observatory</td>
                    <td>Stargazing and wonder</td>
                </tr>
            </table>
        </section>
        
        <section>
            <h2>Explore the Castle</h2>
            <p>Visit these special areas:</p>
            <ol>
                <li><a href="#">The North Tower</a></li>
                <li><a href="#">The Secret Garden</a></li>
                <li><a href="#">The Dungeon Labs</a></li>
            </ol>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 My Digital Castle. All rights reserved.</p>
        <p>Contact the castle keeper: <a href="mailto:keeper@digitalcastle.example">keeper@digitalcastle.example</a></p>
    </footer>
</body>
</html>
```

4. Save both files and open your HTML file in a browser to see your beautifully styled castle!

## 🔍 Challenge Tasks

1. Add a "Castle Staff" section with a description list (`<dl>`, `<dt>`, `<dd>`) listing staff roles and responsibilities
2. Create a CSS class called `.highlight` that gives elements a gold background and apply it to important parts of your content
3. Add a castle banner image at the top of the page (you can find free castle images on sites like Unsplash or Pixabay)
4. Change the font for headings to a more medieval-looking font using Google Fonts
5. Add hover effects to links to make them change color when the user hovers over them

## 📚 Additional Resources

- [MDN Web Docs: HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [MDN Web Docs: CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
- [W3Schools CSS Tutorial](https://www.w3schools.com/css/)
- [Google Fonts](https://fonts.google.com/)
- [CSS Tricks](https://css-tricks.com/) - For advanced CSS techniques
- [Color Hunt](https://colorhunt.co/) - For color palette inspiration

## 🏰 Castle Builder's Note

Today we added style and beauty to our castle walls! While HTML provides the structure, CSS brings everything to life with colors, spacing, and visual flair. Remember that a well-designed castle not only looks impressive but is also easy to navigate for visitors. Continue experimenting with different HTML elements and CSS properties to make your castle truly unique.

---

**Tomorrow:** We'll focus on CSS layout and responsive design, ensuring our castle looks magnificent on all devices, from small mobile phones to large desktop screens. 