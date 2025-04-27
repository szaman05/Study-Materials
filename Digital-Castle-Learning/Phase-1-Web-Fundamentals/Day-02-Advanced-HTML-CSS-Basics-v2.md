# Day 2: Advanced HTML & CSS Basics (v2)

> **Castle Metaphor**: Yesterday we built the basic structure of our castle with HTML. Today, we're decorating it! CSS is the paint, tapestries, furniture, and lighting that make our castle visually appealing and functional. We'll learn how to select specific parts of our castle (HTML elements) and apply styles to them.

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Understand the role and syntax of CSS.
- Connect CSS to HTML documents using various methods.
- Utilize a wider range of CSS selectors to target elements precisely.
- Grasp the concepts of the Cascade, Specificity, and Inheritance.
- Apply common CSS properties for text, color, background, and spacing.
- Understand the CSS Box Model.
- Use different CSS units and color formats effectively.
- Write cleaner, more organized CSS.
- Use browser developer tools to inspect CSS.

## 🔑 Core Concepts

### 1. Introduction to CSS

**CSS (Cascading Style Sheets)** is the language used to style the visual presentation of web pages written in HTML or XML. It controls layout, colors, fonts, spacing, and much more, separating presentation from structure.

**Basic CSS Rule Syntax:**
```css
selector {
  property: value; /* This is a declaration */
  property2: value2;
  /* Add comments like this */
}
```
- **Selector**: Targets the HTML element(s) you want to style.
- **Declaration Block**: Contains one or more declarations separated by semicolons.
- **Declaration**: Consists of a CSS property name and a value, separated by a colon.

### 2. Connecting CSS to HTML

There are three ways to apply CSS:

**a. External CSS (Recommended)**
- Create a separate `.css` file (e.g., `style.css`).
- Link it within the `<head>` of your HTML document:
  ```html
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Castle</title>
      <link rel="stylesheet" href="style.css">
  </head>
  ```
- **Pros**: Centralized styles, cleaner HTML, easier maintenance, browser caching.

**b. Internal CSS**
- Place CSS rules within a `<style>` tag inside the `<head>` of the HTML document.
  ```html
  <head>
      <style>
          body {
              background-color: linen;
          }
          h1 {
              color: maroon;
          }
      </style>
  </head>
  ```
- **Pros**: Useful for single-page websites or specific page styles.
- **Cons**: Mixes style and structure, harder to maintain for multiple pages.

**c. Inline CSS**
- Apply styles directly to an HTML element using the `style` attribute.
  ```html
  <p style="color: sienna; margin-left: 20px;">This paragraph has inline styles.</p>
  ```
- **Pros**: Quick for testing or applying unique styles.
- **Cons**: Highest specificity (can be hard to override), mixes style and structure heavily, poor maintainability. **Use sparingly.**

### 3. CSS Selectors: Targeting Elements

Selectors are patterns that select the elements you want to style.

**a. Basic Selectors**
- **Element (Type) Selector**: Selects all elements of a given type.
  ```css
  p { /* Selects all <p> elements */
      line-height: 1.6;
  }
  ```
- **Class Selector**: Selects all elements with a specific `class` attribute. Starts with a dot (`.`).
  ```css
  .throne-room { /* Selects elements with class="throne-room" */
      background-color: gold;
  }
  ```
  ```html
  <div class="throne-room">...</div>
  ```
- **ID Selector**: Selects a *single* element with a specific `id` attribute. Starts with a hash (`#`). IDs must be unique per page.
  ```css
  #main-gate { /* Selects the element with id="main-gate" */
      border: 5px solid gray;
  }
  ```
  ```html
  <img id="main-gate" src="gate.jpg" alt="Main Castle Gate">
  ```
- **Attribute Selector**: Selects elements based on the presence or value of an attribute.
  ```css
  input[type="text"] { /* Selects <input> elements with type="text" */
      border: 1px solid #ccc;
  }
  a[target="_blank"] { /* Selects <a> elements opening in a new tab */
      background-image: url('external-link.png');
  }
  ```
- **Universal Selector**: Selects *all* elements. Often used for resets (use with caution).
  ```css
  * { /* Selects every element on the page */
      box-sizing: border-box; /* A common use case */
  }
  ```

**b. Grouping Selectors**
- Apply the same styles to multiple selectors by separating them with a comma.
  ```css
  h1, h2, h3 {
      font-family: 'Times New Roman', serif;
      color: #333;
  }
  ```

**c. Combining Selectors (Combinators)**
- **Descendant Selector (space)**: Selects elements that are descendants (nested inside, at any level) of a specified element.
  ```css
  article p { /* Selects all <p> elements inside an <article> */
      color: #555;
  }
  ```
- **Child Selector (`>`)**: Selects elements that are *direct children* of a specified element.
  ```css
  ul > li { /* Selects only <li> elements that are direct children of a <ul> */
      list-style-type: square;
  }
  ```
- **Adjacent Sibling Selector (`+`)**: Selects an element that is *immediately* preceded by a specified element (must share the same parent).
  ```css
  h2 + p { /* Selects the first <p> element immediately following an <h2> */
      margin-top: 0;
  }
  ```
- **General Sibling Selector (`~`)**: Selects elements that are siblings of a specified element and come *after* it (must share the same parent).
  ```css
  h2 ~ p { /* Selects all <p> elements that follow an <h2> and share the same parent */
      text-indent: 2em;
  }
  ```

**d. Pseudo-classes**
- Select elements based on their state or position. Start with a colon (`:`).
  ```css
  a:link { color: blue; } /* Unvisited link */
  a:visited { color: purple; } /* Visited link */
  a:hover { color: red; text-decoration: underline; } /* Link on mouse hover */
  a:active { color: orange; } /* Link being clicked */
  input:focus { border-color: blue; } /* Input field when focused */
  li:first-child { font-weight: bold; } /* First <li> in a list */
  li:last-child { font-style: italic; } /* Last <li> in a list */
  li:nth-child(odd) { background-color: #f0f0f0; } /* Odd list items (1st, 3rd, etc.) */
  p:not(.special) { color: gray; } /* All <p> elements *without* class="special" */
  ```

**e. Pseudo-elements**
- Style specific parts of an element. Start with a double colon (`::`).
  ```css
  p::first-line { font-weight: bold; } /* Style the first line of a paragraph */
  p::first-letter { font-size: 2em; float: left; margin-right: 5px; } /* Style the first letter */
  .tooltip::before { content: "ℹ️ "; } /* Insert content before the element's content */
  .tooltip::after { content: attr(data-tooltip); /* Display content from an attribute */ }
  ::selection { background-color: yellow; color: black; } /* Style selected text */
  ```

### 4. The Cascade, Specificity, and Inheritance

**a. The Cascade**
- CSS stands for *Cascading* Style Sheets. The cascade is the algorithm browsers use to determine which CSS rules apply if multiple rules target the same element. It considers:
    1.  **Origin and Importance**: Stylesheets come from different origins (browser default, user agent, author). `!important` flags can increase importance. Generally, author styles override user agent styles, which override browser defaults. `!important` author styles > `!important` user styles > normal author styles > normal user styles > browser defaults.
    2.  **Specificity**: More specific selectors override less specific ones.
    3.  **Source Order**: If specificity is equal, the rule defined last in the CSS wins.

**b. Specificity**
- A weight calculated for each selector to determine precedence.
- Calculation (roughly):
    - Inline styles: Highest (1,0,0,0 points - though not exactly calculated this way)
    - IDs: (0,1,0,0 points per ID)
    - Classes, pseudo-classes, attribute selectors: (0,0,1,0 points per selector)
    - Elements, pseudo-elements: (0,0,0,1 points per selector)
    - Universal selector (`*`) and combinators (`>`, `+`, `~`, space) have no specificity value (0,0,0,0).
- **Example**:
  ```css
  p { color: black; }                 /* Specificity: 0,0,0,1 */
  .castle-text { color: gray; }       /* Specificity: 0,0,1,0 */
  article p { color: blue; }          /* Specificity: 0,0,1,1 (element + element) */
  article p.description { color: red; } /* Specificity: 0,0,2,1 (element + class + element) */
  #main-hall p { color: green; }      /* Specificity: 0,1,0,1 (ID + element) */
  #main-hall p.description { color: purple; } /* Specificity: 0,1,1,1 (ID + class + element) */
  /* Inline style: <p style="color: orange;">...</p> overrides all above */
  ```
- **Tip**: Aim for low specificity where possible. Use classes primarily. Avoid overuse of IDs for styling and `!important`.

**c. Inheritance**
- Some CSS properties (mostly related to text like `color`, `font-family`, `font-size`, `line-height`, `text-align`) are passed down (inherited) from parent elements to their children.
- Properties related to layout and boxes (e.g., `width`, `height`, `padding`, `margin`, `border`) are generally *not* inherited.
- You can explicitly force inheritance using the `inherit` keyword or reset to the default using `initial` or `unset`.
  ```css
  body {
      font-family: Arial, sans-serif; /* Inherited by most elements */
      color: #333; /* Inherited */
      border: 1px solid black; /* Not inherited */
  }
  .special-section {
      color: blue; /* Overrides inherited color for this section and its children */
  }
  .special-section p {
      /* Inherits color: blue from parent */
      border: inherit; /* Explicitly inherit the border from the parent (if any) */
  }
  ```

### 5. Basic CSS Properties

**a. Text Properties**
```css
.castle-description {
    color: #333333;         /* Text color */
    font-family: "Georgia", serif; /* Font stack (primary, fallback) */
    font-size: 16px;        /* Absolute size */
    font-size: 1.1rem;      /* Relative size (recommended for accessibility) */
    font-weight: normal;    /* normal, bold, 100-900 */
    font-style: italic;     /* normal, italic, oblique */
    text-align: left;       /* left, right, center, justify */
    line-height: 1.6;       /* Multiplier of font-size (unitless recommended) */
    text-decoration: none;  /* none, underline, overline, line-through */
    text-transform: capitalize; /* none, capitalize, uppercase, lowercase */
    letter-spacing: 1px;    /* Space between letters */
    word-spacing: 4px;      /* Space between words */
}
```

**b. Color and Background**
```css
.banner {
    color: white;                 /* Text color */
    background-color: #8B4513;    /* Solid background color (SaddleBrown) */
    background-image: url('stone-texture.png'); /* Background image */
    background-repeat: repeat;    /* repeat, repeat-x, repeat-y, no-repeat */
    background-position: center;  /* Position the image */
    background-size: cover;       /* How the image fills the area */
    border: 2px dashed #5D2E0D;   /* Shorthand: width style color */
    border-radius: 10px;          /* Rounded corners */
    opacity: 0.9;                 /* Transparency (0=transparent, 1=opaque) */
}
```

**c. Dimensions and Spacing (Box Model)**
```css
.guard-tower {
    width: 150px;          /* Fixed width */
    max-width: 90%;        /* Maximum width relative to parent */
    height: 300px;         /* Fixed height */
    min-height: 100px;     /* Minimum height */
    margin: 10px 20px;     /* Shorthand: top/bottom left/right */
    /* margin: 10px 20px 15px 5px; /* top right bottom left */
    padding: 15px;         /* Shorthand: all four sides */
    /* padding: 10px 20px; /* top/bottom left/right */
}
```

### 6. The CSS Box Model

Every HTML element is a rectangular box. This box consists of:
- **Content**: The text, image, or other content. Its size is defined by `width` and `height`.
- **Padding**: Transparent space *inside* the border, between the content and the border.
- **Border**: A line surrounding the padding and content.
- **Margin**: Transparent space *outside* the border, separating the element from others.

```css
.treasure-chest {
    width: 200px;        /* Content width */
    height: 100px;       /* Content height */
    padding: 20px;       /* 20px space inside the border on all sides */
    border: 5px solid gold; /* 5px thick gold border */
    margin: 30px;        /* 30px space outside the border on all sides */
    background-color: brown; /* Background covers content + padding */
}
```
**Total Width** = `width` + `padding-left` + `padding-right` + `border-left` + `border-right`
**Total Height** = `height` + `padding-top` + `padding-bottom` + `border-top` + `border-bottom`

**`box-sizing` Property**:
- `content-box` (default): `width` and `height` apply only to the content area. Padding and border add to the total size.
- `border-box`: `width` and `height` include content, padding, *and* border. This often makes layout calculations easier.
  ```css
  /* Common practice to apply border-box globally */
  *, *::before, *::after {
      box-sizing: border-box;
  }
  .treasure-chest {
      box-sizing: border-box;
      width: 200px; /* Now this is the total width including padding and border */
      padding: 20px;
      border: 5px solid gold;
      /* Content area width = 200 - (2*20) - (2*5) = 150px */
  }
  ```

### 7. CSS Colors

Specify colors using various formats:

- **Named Colors**: `red`, `blue`, `lightgray`, `papayawhip` (around 140 standard names)
  ```css
  h1 { color: darkslateblue; }
  ```
- **Hexadecimal (Hex)**: `#RRGGBB` or `#RGB` (shorthand). Uses base-16 values (0-9, A-F).
  ```css
  body { background-color: #f0f8ff; } /* AliceBlue */
  p { color: #333; } /* Dark Gray (shorthand for #333333) */
  ```
- **RGB / RGBA**: `rgb(red, green, blue)` or `rgba(red, green, blue, alpha)`. Values 0-255. Alpha 0 (transparent) to 1 (opaque).
  ```css
  .warning { color: rgb(255, 0, 0); } /* Red */
  .overlay { background-color: rgba(0, 0, 0, 0.5); } /* Semi-transparent black */
  ```
- **HSL / HSLA**: `hsl(hue, saturation, lightness)` or `hsla(hue, saturation, lightness, alpha)`. Hue 0-360 (degrees on color wheel), Sat/Light 0-100%. Often more intuitive for adjustments.
  ```css
  .button { background-color: hsl(120, 70%, 50%); } /* Bright Green */
  .button:hover { background-color: hsl(120, 70%, 40%); } /* Darker Green */
  ```

### 8. CSS Units

Units define the size of properties like `width`, `font-size`, `margin`, etc.

**a. Absolute Units** (Fixed size, generally avoid for screen layouts except maybe borders)
- `px`: Pixels. Most common absolute unit.
- `pt`: Points (1/72 inch). Common in print.
- `cm`, `mm`, `in`: Physical units.

**b. Relative Units** (Size relative to something else - preferred for flexibility and accessibility)
- **Font-relative**:
    - `em`: Relative to the *parent element's* font size (or the element's own font-size for properties other than font-size). Can compound.
    - `rem`: Relative to the *root element's* (`<html>`) font size. More predictable than `em` for overall layout sizing. **Often the best choice for font sizes and spacing.**
- **Viewport-relative**:
    - `vw`: 1% of the viewport width.
    - `vh`: 1% of the viewport height.
    - `vmin`: 1% of the smaller viewport dimension (width or height).
    - `vmax`: 1% of the larger viewport dimension.
- **Percentage (`%`)**: Relative to the parent element's corresponding property value (e.g., `width: 50%` is half the parent's width).

```css
html {
    font-size: 16px; /* Base font size for rem calculations */
}
body {
    font-size: 1rem; /* Equivalent to 16px */
    line-height: 1.5; /* Relative to the element's font-size (1.5 * 16px = 24px) */
}
h1 {
    font-size: 2.5rem; /* 2.5 * 16px = 40px */
    margin-bottom: 1rem; /* 16px */
}
.sidebar {
    width: 25%; /* 25% of the parent container's width */
    padding: 1em; /* Padding relative to the sidebar's font-size */
}
.full-height-banner {
    height: 100vh; /* Takes up the full viewport height */
}
```

### 9. Display Property

Controls how an element is rendered and participates in layout. Key values:
- `block`: Starts on a new line, takes up full available width (e.g., `<h1>`, `<p>`, `<div>`). `width` and `height` apply.
- `inline`: Flows with text, does not start on a new line, only takes up as much width as necessary (e.g., `<a>`, `<span>`, `<strong>`). `width`, `height`, `margin-top/bottom` have no effect.
- `inline-block`: Flows with text like `inline`, but `width`, `height`, and `margin-top/bottom` *do* apply.
- `none`: Element is completely removed from the page and layout.
- (More advanced values like `flex`, `grid`, `table` will be covered later).

```css
span.tag {
    display: inline-block; /* Allows padding/margin/width on a span */
    background-color: lightblue;
    padding: 0.2em 0.5em;
    margin: 0.2em;
    border-radius: 3px;
}
.hidden-section {
    display: none; /* Hides the element entirely */
}
```

## 🛠️ Practical Example: Styling the Castle Homepage

Let's create `style.css` and link it to our `castle.html`.

**`style.css`:**
```css
/* === Global Styles & Resets === */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0; /* Basic reset */
    padding: 0; /* Basic reset */
}

html {
    font-size: 16px; /* Base font size for rem units */
}

body {
    font-family: 'Georgia', serif; /* Elegant serif font */
    line-height: 1.6;
    color: #333; /* Dark gray text */
    background-color: #f4f1ea; /* Parchment-like background */
}

/* === Layout Containers === */
.container {
    max-width: 960px; /* Limit content width */
    margin: 2rem auto; /* Center container with top/bottom margin */
    padding: 0 1rem; /* Padding on smaller screens */
}

/* === Header === */
.main-header {
    background-color: #5D4037; /* Dark Brown */
    color: #EFEBE9; /* Light Cream */
    padding: 1.5rem 0;
    text-align: center;
    border-bottom: 5px solid #A1887F; /* Lighter Brown border */
    margin-bottom: 2rem;
}

.main-header h1 {
    font-size: 2.8rem;
    font-weight: normal;
    letter-spacing: 1px;
}

/* === Main Content Sections === */
.castle-section {
    background-color: #FFF; /* White background for sections */
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid #D7CCC8; /* Light gray border */
    border-radius: 5px; /* Slightly rounded corners */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.castle-section h2 {
    font-size: 1.8rem;
    color: #6D4C41; /* Medium Brown */
    border-bottom: 2px solid #BCAAA4; /* Lighter Brown underline */
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
}

/* === Text Elements === */
p {
    margin-bottom: 1rem; /* Space between paragraphs */
}

a {
    color: #795548; /* Brown link color */
    text-decoration: none;
}

a:hover, a:focus {
    color: #4E342E; /* Darker brown on hover/focus */
    text-decoration: underline;
}

strong, b {
    font-weight: bold;
}

em, i {
    font-style: italic;
}

/* === Lists === */
ul, ol {
    margin-left: 1.5rem; /* Indent lists */
    margin-bottom: 1rem;
}

li {
    margin-bottom: 0.5rem; /* Space between list items */
}

/* === Images === */
img.castle-image {
    max-width: 100%; /* Make images responsive */
    height: auto; /* Maintain aspect ratio */
    display: block; /* Remove extra space below image */
    margin: 1rem auto; /* Center block images */
    border: 3px solid #A1887F;
    border-radius: 4px;
}

/* === Footer === */
.main-footer {
    text-align: center;
    padding: 1.5rem;
    margin-top: 2rem;
    background-color: #4E342E; /* Darker Brown */
    color: #EFEBE9; /* Light Cream */
    font-size: 0.9rem;
    border-top: 3px solid #795548;
}
```

**Link in HTML (`castle.html`):**
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Castle Grandeur - Home</title>
    <link rel="stylesheet" href="style.css"> </head>
```

## ✨ Best Practices

- **Organize Your CSS**: Group related styles, use comments (`/* comment */`) liberally. Consider organizing into sections (globals, layout, components, utilities).
- **Use Meaningful Class Names**: Choose names that describe the *content* or *function* (e.g., `.news-article`, `.login-button`) rather than the *appearance* (e.g., `.red-text`, `.big-box`). BEM (Block, Element, Modifier) is a popular naming convention.
- **Keep Specificity Low**: Rely on classes primarily. Avoid qualifying class selectors with element names (`.button` is better than `div.button`) unless necessary. Avoid ID selectors for styling if possible. Avoid `!important` unless absolutely necessary (e.g., overriding third-party styles).
- **DRY (Don't Repeat Yourself)**: If you find yourself writing the same declarations multiple times, group selectors or create reusable utility classes.
- **Use Relative Units**: Prefer `rem` for font sizes and spacing, `%` or viewport units for layout widths/heights for better scalability and accessibility.
- **Validate Your CSS**: Use online validators (like the W3C CSS Validator) to catch errors.

## 🔍 Debugging with Browser DevTools

All modern browsers come with Developer Tools (usually opened by pressing F12 or right-clicking an element and selecting "Inspect" or "Inspect Element").

- **Elements/Inspector Panel**: Shows the HTML structure. Selecting an element highlights it on the page.
- **Styles Panel**: Shows all CSS rules applied to the selected element, ordered by specificity. You can see which styles are overridden (struck through). You can also *temporarily edit or disable* styles directly in the browser to experiment!
- **Computed Panel**: Shows the final, calculated values for all CSS properties on the selected element after considering cascade, specificity, and inheritance. Useful for understanding the box model dimensions.

Learning to use DevTools is crucial for efficient CSS development and debugging.

## 🏋️ Practice Exercises

1.  **Experiment**: Change colors, fonts, and spacing in the `style.css` example. See how it affects the page.
2.  **New Selectors**: Add a new class `special-announcement` to a paragraph in your HTML. Style it in `style.css` with a different background color and bold text using a class selector.
3.  **Pseudo-classes**: Make all links turn green and have no underline when hovered over.
4.  **Specificity Challenge**: Add an ID `page-title` to your main `<h1>`. Try to override the header's text color using an ID selector in `style.css`. Then, try overriding *that* using an inline style directly on the `<h1>` tag. Observe the results in DevTools.
5.  **Box Model**: Add a `div` with the class `drawbridge`. Give it a fixed width, height, padding, border, and margin. Use DevTools to inspect its computed box model dimensions. Try changing its `box-sizing` to `border-box` and see how the content area changes.

## 🏰 Castle Builder's Note

Today we learned the art of castle decoration with CSS! We can now select specific stones, walls, or entire rooms and apply colors, textures, and spacing. Understanding selectors, the cascade, specificity, and the box model are fundamental to creating beautiful and functional web designs. Remember, clean and organized CSS is like a well-maintained castle – easier to manage and expand upon.

---

**Tomorrow:** We'll dive deeper into **CSS Layout**, learning techniques like Flexbox and Grid to arrange the rooms and structures within our castle precisely, ensuring it looks great on any device (Responsive Design).
