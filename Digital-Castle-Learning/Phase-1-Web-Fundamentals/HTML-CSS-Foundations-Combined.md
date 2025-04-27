# HTML & CSS Foundations: Building and Decorating Your Digital Castle

> **Castle Metaphor**: We begin by laying the foundation stones (HTML) for our digital castle, defining its structure and rooms. Then, we'll add the paint, tapestries, furniture, and lighting (CSS) to make it visually appealing and functional.

## 🎯 Overall Learning Objectives

By the end of this combined guide, you'll be able to:

**HTML:**
- Understand the purpose of HTML.
- Set up a basic development environment.
- Create a valid HTML document structure.
- Use fundamental HTML tags for headings, paragraphs, lists, links, and images.
- Understand and use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Structure content logically using `<div>` and `<span>`.

**CSS:**
- Understand the role and syntax of CSS.
- Connect CSS to HTML documents using external, internal, and inline methods.
- Utilize a wide range of CSS selectors (element, class, ID, attribute, combinators, pseudo-classes, pseudo-elements) to target elements precisely.
- Grasp the core concepts of the Cascade, Specificity, and Inheritance.
- Apply common CSS properties for text styling, colors, backgrounds, borders, and spacing.
- Understand and apply the CSS Box Model, including `box-sizing`.
- Use different CSS units (absolute and relative like `px`, `rem`, `em`, `%`, `vw`, `vh`) and color formats (named, hex, RGB/A, HSL/A) effectively.
- Control element layout behavior with the `display` property (basic values).
- Write cleaner, more organized, and maintainable CSS following best practices.
- Use browser developer tools to inspect and debug HTML and CSS.

---

## Part 1: HTML Foundations - Structuring the Castle

> **Castle Metaphor**: HTML is like the blueprint and the basic building blocks (stones, walls, rooms) of our castle. It defines *what* content is there and its basic structure.

### 🔑 HTML Key Concepts

**HTML (HyperText Markup Language)** is the standard markup language for creating web pages. It describes the structure of a web page using elements enclosed in tags.

- It's a **markup language**, not a programming language.
- It uses **tags** (e.g., `<p>`) to define elements.
- Tags usually come in pairs: opening `<tagname>` and closing `</tagname>`.
- Content goes between the tags: `<p>This is paragraph content.</p>`.

### Basic HTML Document Structure

Every HTML document needs this fundamental structure:

```html
<!DOCTYPE html> <!-- Declares the document type as HTML5 -->
<html lang="en"> <!-- The root element; 'lang' specifies the language -->
<head>
    <!-- Contains meta-information (not visible on the page) -->
    <meta charset="UTF-8"> <!-- Specifies character encoding (important!) -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configures viewport for responsive design -->
    <title>My Digital Castle</title> <!-- Title shown in the browser tab -->
    <!-- CSS links and other meta tags go here -->
</head>
<body>
    <!-- Contains the visible content of the webpage -->
    <h1>Welcome to the Castle Entrance</h1>
    <p>Here begins our journey.</p>
    <!-- More content elements go here -->
</body>
</html>
```

### 🧱 Essential HTML Tags

**Headings (`<h1>` to `<h6>`)**
- Define hierarchical headings. `<h1>` is the most important, `<h6>` the least.
- Use them to structure your content logically. Search engines use headings to index the structure and content of your web pages.
```html
<h1>Main Castle Title</h1>
<h2>Section: The Great Hall</h2>
<h3>Subsection: The Throne</h3>
```

**Paragraphs (`<p>`)**
- Defines a block of text. Browsers automatically add some space (margin) before and after each `<p>` element.
```html
<p>This paragraph describes the history of the castle, detailing its construction and notable events.</p>
```

**Links (`<a>`)**
- Creates hyperlinks to other web pages or resources.
- The `href` attribute specifies the destination URL.
- Content inside the `<a>` tags becomes the clickable link text.
```html
<a href="https://www.example.com">Visit the Kingdom Website</a>
<a href="/map.html">View the Castle Map</a>
<a href="#section-armory">Jump to the Armory section</a> <!-- Internal link -->
```

**Images (`<img>`)**
- Embeds images into the page. This is an *empty tag* (no closing tag needed).
- `src` attribute: Specifies the path to the image file.
- `alt` attribute: Provides alternative text if the image cannot be displayed ( crucial for accessibility and SEO).
- `width` and `height` attributes: Can specify image dimensions (though often better controlled with CSS).
```html
<img src="images/castle-gate.jpg" alt="Drawing of the main castle gate" width="300" height="200">
```

**Lists**
- **Unordered Lists (`<ul>`)**: For items where order doesn't matter (uses bullet points by default). Contains `<li>` (list item) elements.
  ```html
  <ul>
      <li>Shield</li>
      <li>Sword</li>
      <li>Helmet</li>
  </ul>
  ```
- **Ordered Lists (`<ol>`)**: For items where order *does* matter (uses numbers by default). Contains `<li>` elements.
  ```html
  <ol>
      <li>Lower the drawbridge</li>
      <li>Open the main gate</li>
      <li>Sound the trumpets</li>
  </ol>
  ```

**Divisions (`<div>`) and Spans (`<span>`)**
- **`<div>`**: A generic **block-level** container. Used to group larger sections of content for styling or layout purposes. Starts on a new line and takes up the full available width.
- **`<span>`**: A generic **inline** container. Used to group small parts of text or content within a block-level element, often for applying specific styles. Does not start on a new line.
```html
<div class="room-description">
    <h2>The King's Chamber</h2>
    <p>This opulent room features <span class="highlight">gold-trimmed</span> furniture and a large fireplace.</p>
</div>
```

**Semantic HTML5 Elements**
- These elements provide meaning to the structure of the content, improving readability, accessibility (for screen readers), and SEO (for search engines). Use them instead of generic `<div>`s where appropriate.
    - `<header>`: Introductory content for a page or section (often contains headings, logos, navigation).
    - `<nav>`: Contains navigation links.
    - `<main>`: Represents the dominant content of the `<body>`. There should only be one `<main>` element per page.
    - `<section>`: Represents a thematic grouping of content, typically with a heading.
    - `<article>`: Represents a self-contained piece of content that could be distributed independently (e.g., blog post, news story, forum post).
    - `<aside>`: Represents content tangentially related to the main content (e.g., sidebars, pull quotes, related links).
    - `<footer>`: Represents the footer for a page or section (often contains copyright info, contact details, links).
    - `<figure>` & `<figcaption>`: Used to group media content (like images) with a caption.

```html
<body>
    <header>
        <h1>My Digital Castle</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/towers.html">Towers</a></li>
                <li><a href="/contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>History of the Castle</h2>
            <p>Details about the castle's long history...</p>
            <section>
                <h3>Early Years</h3>
                <p>Content about the early years...</p>
            </section>
            <section>
                <h3>The Golden Age</h3>
                <p>Content about the golden age...</p>
                 <figure>
                    <img src="images/golden-age.jpg" alt="Castle during its golden age">
                    <figcaption>The castle basking in the sun during its Golden Age.</figcaption>
                </figure>
            </section>
        </article>

        <aside>
            <h3>Visiting Hours</h3>
            <p>Open daily 9 AM - 5 PM</p>
        </aside>
    </main>

    <footer>
        <p>&copy; 2025 Digital Castle Builders. All rights reserved.</p>
    </footer>
</body>
```

---

## Part 2: CSS - Decorating the Castle

> **Castle Metaphor**: Now that we have the structure (HTML), CSS adds the style! It's the paint on the walls, the tapestries, the furniture arrangement, the lighting – everything that controls the visual presentation.

### 🔑 CSS Core Concepts

**CSS (Cascading Style Sheets)** is the language used to style the visual presentation of web pages. It separates presentation (how it looks) from structure (HTML).

**Basic CSS Rule Syntax:**
```css
selector {
  property: value; /* This is a declaration */
  property2: value2;
  /* CSS comments look like this */
}
```
- **Selector**: Targets the HTML element(s) to style (e.g., `h1`, `.button`, `#main-logo`).
- **Declaration Block**: `{ ... }` contains one or more declarations.
- **Declaration**: `property: value;` (e.g., `color: blue;`).

### Connecting CSS to HTML

1.  **External CSS (Recommended)**: Create a separate `.css` file (e.g., `styles.css`) and link it in the HTML `<head>`:
    ```html
    <head>
        <link rel="stylesheet" href="styles.css">
    </head>
    ```
    *Pros: Clean HTML, easy maintenance, reusable styles, browser caching.*

2.  **Internal CSS**: Place CSS rules inside a `<style>` tag within the HTML `<head>`:
    ```html
    <head>
        <style>
            body { background-color: linen; }
            h1 { color: maroon; }
        </style>
    </head>
    ```
    *Pros: Useful for single pages or page-specific overrides. Cons: Mixes concerns.*

3.  **Inline CSS**: Apply styles directly to an HTML element using the `style` attribute:
    ```html
    <p style="color: sienna; margin-left: 20px;">Special paragraph.</p>
    ```
    *Pros: Quick tests, unique element styles. Cons: High specificity, poor maintainability. **Use sparingly.** *

### CSS Selectors: Targeting Elements

Selectors are crucial for applying styles to the right HTML elements.

**a. Basic Selectors**
- **Element (Type)**: Selects all elements of a type (e.g., `p`, `h2`, `div`).
  ```css
  p { line-height: 1.6; }
  ```
- **Class**: Selects elements with a specific `class` attribute (e.g., `class="button"`). Starts with `.`. Can be reused on multiple elements.
  ```css
  .highlight { background-color: yellow; }
  ```
- **ID**: Selects a *single* element with a specific `id` attribute (e.g., `id="main-logo"`). Starts with `#`. IDs **must be unique** per page.
  ```css
  #main-navigation { border-bottom: 1px solid gray; }
  ```
- **Attribute**: Selects elements based on attributes or their values.
  ```css
  input[type="submit"] { background-color: green; color: white; } /* Style submit buttons */
  a[target="_blank"] { font-style: italic; } /* Style links opening in new tab */
  ```
- **Universal (`*`)**: Selects *all* elements. Use with caution, often for resets.
  ```css
  * { box-sizing: border-box; } /* Common reset */
  ```

**b. Grouping Selectors**
- Apply the same styles to multiple selectors using commas.
  ```css
  h1, h2, h3, h4, h5, h6 {
      font-family: 'Merriweather', serif;
      color: #333;
      margin-bottom: 0.5em;
  }
  ```

**c. Combining Selectors (Combinators)**
- **Descendant (space)**: Selects elements nested anywhere inside another.
  ```css
  article p { color: #555; } /* All <p> inside <article> */
  ```
- **Child (`>`)**: Selects *direct children* only.
  ```css
  ul > li { list-style-type: circle; } /* Only <li> directly inside <ul> */
  ```
- **Adjacent Sibling (`+`)**: Selects the element *immediately* following another (sharing the same parent).
  ```css
  h2 + p { margin-top: 0; } /* <p> right after <h2> */
  ```
- **General Sibling (`~`)**: Selects all siblings that come *after* another (sharing the same parent).
  ```css
  h2 ~ p { text-indent: 1.5em; } /* All <p> siblings following <h2> */
  ```

**d. Pseudo-classes**
- Select elements based on state or position. Start with `:`.
  ```css
  a:hover { color: red; } /* Link on mouse hover */
  input:focus { border-color: blue; outline: none; } /* Input when focused */
  li:nth-child(even) { background-color: #f9f9f9; } /* Even list items */
  p:first-of-type { font-weight: bold; } /* First <p> among siblings */
  :not(.disabled):hover { opacity: 0.8; } /* Elements not having class 'disabled' on hover */
  ```

**e. Pseudo-elements**
- Style specific parts of an element. Start with `::`.
  ```css
  p::first-line { text-transform: uppercase; } /* First line of <p> */
  p::first-letter { font-size: 2em; float: left; margin: 0 0.2em 0 0; } /* First letter */
  ::selection { background-color: lightblue; } /* Style user-selected text */
  .icon::before { content: "► "; font-weight: bold; } /* Insert content before */
  ```

### The Cascade, Specificity, and Inheritance

**a. The Cascade**
- The process browsers use to resolve conflicting CSS rules. It considers:
    1.  **Origin & Importance**: Browser defaults < User styles < Author styles. `!important` flags reverse this order within each origin (use `!important` sparingly!).
    2.  **Specificity**: More specific selectors win.
    3.  **Source Order**: If specificity is equal, the last declared rule wins.

**b. Specificity**
- A weight/score calculated for each selector. Higher specificity wins.
- Rough calculation order (most to least specific):
    1.  Inline styles (`style="..."`)
    2.  ID selectors (`#id`)
    3.  Class selectors (`.class`), attribute selectors (`[type="text"]`), pseudo-classes (`:hover`)
    4.  Element selectors (`div`), pseudo-elements (`::before`)
- **Tip**: Keep specificity as low as possible for easier overrides. Prefer classes over IDs for styling. Avoid `!important`.

**c. Inheritance**
- Some CSS properties (mostly text-related like `color`, `font-family`, `font-size`, `line-height`) are passed down from parent elements to children.
- Layout/box properties (`width`, `padding`, `margin`, `border`) are generally *not* inherited.
- Use `inherit`, `initial`, `unset` keywords to control inheritance explicitly.

### The CSS Box Model

Every HTML element is treated as a rectangular box with layers:
- **Content**: The actual text, image, etc. (`width`, `height`).
- **Padding**: Space *inside* the border, between content and border.
- **Border**: A line around the padding.
- **Margin**: Space *outside* the border, separating the element from others.

![CSS Box Model Diagram](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model/box-model.png)
*(Image credit: MDN Web Docs)*

**`box-sizing` Property**:
- `content-box` (default): `width` & `height` apply to content *only*. Padding and border add to the total size.
- `border-box`: `width` & `height` include content + padding + border. Often easier for layout.
  ```css
  /* Common practice: */
  *, *::before, *::after {
      box-sizing: border-box;
  }
  ```

### Basic CSS Properties

**a. Text Styling**
```css
p.description {
    color: #444;
    font-family: "Lato", sans-serif; /* Font stack */
    font-size: 1rem; /* Use relative units */
    font-weight: 400; /* normal=400, bold=700 */
    font-style: normal;
    text-align: left;
    line-height: 1.7; /* Unitless recommended */
    text-decoration: none;
    text-transform: none;
    letter-spacing: 0.5px;
    word-spacing: 2px;
}
```

**b. Colors and Backgrounds**
```css
.card {
    color: #333; /* Text color */
    background-color: #ffffff; /* Solid background */
    background-image: url('images/paper-texture.png');
    background-repeat: no-repeat;
    background-position: top right;
    background-size: contain;
    border: 1px solid #ccc;
    border-radius: 8px; /* Rounded corners */
    opacity: 1; /* 0=transparent, 1=opaque */
}
```

**c. Dimensions and Spacing (Box Model Properties)**
```css
.avatar {
    width: 100px;
    height: 100px;
    padding: 5px; /* All sides */
    border: 2px solid darkgray;
    margin: 10px auto; /* 10px top/bottom, auto left/right (centers block element) */
    /* margin: top right bottom left; */
    /* padding: top/bottom left/right; */
    min-width: 50px;
    max-width: 150px;
}
```

### CSS Colors

- **Named**: `red`, `lightblue`, `papayawhip` (limited set)
- **Hex**: `#RRGGBB` or `#RGB` (e.g., `#ff0000`, `#f00` for red)
- **RGB/RGBA**: `rgb(0-255, 0-255, 0-255)` / `rgba(r, g, b, 0-1)` (e.g., `rgb(255, 0, 0)`, `rgba(0, 0, 0, 0.5)` for semi-transparent black)
- **HSL/HSLA**: `hsl(0-360, 0-100%, 0-100%)` / `hsla(h, s, l, 0-1)` (Hue, Saturation, Lightness, Alpha) - often intuitive (e.g., `hsl(120, 100%, 50%)` for lime green)

### CSS Units

- **Absolute**: `px` (pixels - most common), `pt`, `cm`, `in`. Fixed size.
- **Relative**:
    - `em`: Relative to parent's font-size (can compound).
    - `rem`: Relative to **root** (`<html>`) font-size (predictable). **Recommended for font-size and spacing.**
    - `%`: Relative to parent element's corresponding value.
    - `vw`, `vh`: 1% of viewport width/height.
    - `vmin`, `vmax`: 1% of smaller/larger viewport dimension.

### Display Property

Controls how an element renders and interacts with others. Key values:
- `block`: Starts new line, takes full width (e.g., `div`, `p`, `h1`). `width`/`height` apply.
- `inline`: Flows with text, only takes needed width (e.g., `span`, `a`, `strong`). `width`/`height`/`margin-top/bottom` ignored.
- `inline-block`: Flows like `inline`, but `width`/`height`/`margin-top/bottom` *do* apply.
- `none`: Hides the element completely (removed from layout).
- (More advanced: `flex`, `grid` - covered in layout topics).

---

## 🛠️ Practical Example: Basic Castle Styling

Let's assume you have a basic `castle.html` file. Create a `style.css` file and link it.

**`style.css`:**
```css
/* === Global Styles & Resets === */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px; /* Base for rem units */
}

body {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f1ea; /* Parchment background */
}

/* === Layout Containers === */
.container { /* Add class="container" to a main wrapping div in HTML */
    max-width: 960px;
    margin: 2rem auto; /* Center container */
    padding: 0 1rem;
}

/* === Header (using semantic <header>) === */
header {
    background-color: #5D4037; /* Dark Brown */
    color: #EFEBE9; /* Light Cream */
    padding: 1.5rem 1rem;
    text-align: center;
    border-bottom: 5px solid #A1887F;
    margin-bottom: 2rem;
}

header h1 {
    font-size: 2.8rem;
    font-weight: normal;
}

/* === Navigation (using semantic <nav>) === */
nav ul {
    list-style: none; /* Remove default bullets */
    padding: 0.5rem 0 0 0;
}

nav li {
    display: inline-block; /* Arrange items horizontally */
    margin: 0 1rem;
}

nav a {
    color: #EFEBE9;
    text-decoration: none;
    font-size: 1.1rem;
}
nav a:hover {
    text-decoration: underline;
}


/* === Main Content Sections (using semantic <section> or <article>) === */
main section, main article {
    background-color: #FFF;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #D7CCC8;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

main h2 {
    font-size: 1.8rem;
    color: #6D4C41; /* Medium Brown */
    border-bottom: 2px solid #BCAAA4;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
}

/* === Images (using a class) === */
img.castle-image {
    max-width: 100%; /* Responsive */
    height: auto;
    display: block;
    margin: 1rem auto;
    border: 3px solid #A1887F;
    border-radius: 4px;
}

/* === Footer (using semantic <footer>) === */
footer {
    text-align: center;
    padding: 1.5rem;
    margin-top: 2rem;
    background-color: #4E342E; /* Darker Brown */
    color: #EFEBE9;
    font-size: 0.9rem;
    border-top: 3px solid #795548;
}
```

**Link in HTML (`castle.html`):**
```html
<head>
    <!-- ... other head elements ... -->
    <link rel="stylesheet" href="style.css">
</head>
```

---

## ✨ Best Practices

- **Organize CSS**: Use comments (`/* ... */`), group related rules. Consider methodologies like BEM or organizing by feature/component.
- **Meaningful Class Names**: Describe *function* or *content* (e.g., `.user-profile`, `.error-message`) not *appearance* (`.red-text`).
- **Low Specificity**: Prefer classes. Avoid IDs for styling. Avoid `!important`.
- **DRY (Don't Repeat Yourself)**: Group selectors or create utility classes for common styles.
- **Relative Units**: Use `rem` for fonts/spacing, `%`/`vw`/`vh` for layout.
- **Accessibility**: Ensure good color contrast, use `rem` for fonts, provide focus styles (`:focus`).
- **Validate**: Use W3C validators for HTML and CSS.

## 🔍 Debugging with Browser DevTools

Essential for web development! (Usually F12 or Right-Click -> Inspect)
- **Elements/Inspector**: View/edit HTML structure live.
- **Styles**: See applied CSS rules, specificity, overridden styles. Edit styles live.
- **Computed**: See the final calculated style values for an element. Inspect the box model visually.

---

## 🏋️ Practice Exercises

1.  **HTML Structure**: Create an HTML file for a simple blog post using semantic elements (`<article>`, `<header>`, `<footer>`, `<section>`, `<h1>`, `<p>`).
2.  **HTML Lists & Links**: Add an unordered list of related articles and an ordered list of steps within the blog post. Make the related article titles links.
3.  **CSS Selectors**: In your `style.css`, target the blog post title (`h1` inside `article`) and make it a specific color. Target only the paragraphs within the main article content.
4.  **CSS Box Model**: Give the main `<article>` element padding, a border, and margin. Use DevTools to inspect its computed size. Apply `box-sizing: border-box;` and observe the change.
5.  **CSS Pseudo-classes**: Style links within the article to change color on hover. Style the first paragraph differently using `:first-of-type`.
6.  **Combine**: Apply the practical CSS example styles to your blog post HTML structure, adapting class names and selectors as needed. Experiment with changing colors, fonts, and spacing.

## 🏰 Castle Builder's Note

You've now learned how to lay the foundation (HTML) and decorate the walls (CSS) of your digital castle! These are the absolute fundamentals of front-end web development. Practice structuring content semantically with HTML and applying precise styles with CSS selectors and properties. Mastering these will allow you to build increasingly complex and beautiful web experiences.

---

**Next Steps:** Explore CSS Layout (Flexbox, Grid), Responsive Design, CSS Transitions & Animations, and eventually JavaScript for interactivity.
