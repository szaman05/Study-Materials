# Day 2: CSS Basics

> **Castle Metaphor**: Today we're adding decorations and colors to our castle walls. CSS is the paint, tapestries, and decorative elements that make our castle beautiful.

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Understand CSS basics and how to connect CSS to HTML
- Apply styles to elements using selectors
- Change colors, fonts, and text properties
- Create a more visually appealing castle homepage

## 🔑 Key Concepts

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

**ID Selector** - styles a single unique element:
```css
#main-tower {
    height: 300px;
}
```

#### CSS Specificity

Specificity determines which styles are applied when multiple rules target the same element:

1. Inline styles (highest specificity)
2. ID selectors
3. Class selectors, attribute selectors, and pseudo-classes
4. Element selectors and pseudo-elements (lowest specificity)

```css
/* Less specific - may be overridden */
p {
    color: blue;
}

/* More specific - will override the above */
.castle-text {
    color: red;
}

/* Even more specific - will override both above */
#main-description {
    color: green;
}
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

Every element is treated as a box with:
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

**RGBA Function** (with transparency):
```css
.banner {
    background-color: rgba(0, 0, 139, 0.5);  /* Semi-transparent dark blue */
}
```

**HSL Function** (Hue, Saturation, Lightness):
```css
.header {
    color: hsl(240, 100%, 27%);  /* Dark blue */
}
```

### CSS Units

CSS offers various units for measurements:

**Absolute Units**:
- `px` - pixels
- `pt` - points (1/72 of an inch)
- `cm`, `mm` - centimeters, millimeters

**Relative Units**:
- `em` - relative to parent element's font size
- `rem` - relative to root element's font size
- `%` - percentage relative to parent element
- `vw`, `vh` - viewport width/height units (1vw = 1% of viewport width)

```css
.castle-banner {
    width: 100%;           /* Full width of parent */
    height: 50vh;          /* Half the viewport height */
    font-size: 1.5rem;     /* 1.5x root font size */
    padding: 2em;          /* 2x this element's font size */
}
```

## 💪 Practical Example:

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

/* Links */
a {
    color: #8B4513;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
    color: #5D2E0D;
}

/* Tables */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
}

th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
}

th {
    background-color: #f2f2f2;
}
```

3. Apply this stylesheet to your HTML file by adding the following line in your HTML's `<head>` section:
```html
<link rel="stylesheet" href="styles.css">
```

4. Save both files and open your HTML file in a browser to see your beautifully styled castle!


## 🏰 Castle Builder's Note

Today we added style and beauty to our castle walls! CSS brings everything to life with colors, spacing, and visual flair. Remember that a well-designed castle not only looks impressive but is also easy to navigate for visitors. Continue experimenting with different CSS properties to make your castle truly unique.

---

**Tomorrow:** We'll focus on CSS layout and responsive design, ensuring our castle looks magnificent on all devices, from small mobile phones to large desktop screens. 