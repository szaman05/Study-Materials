# Day 1: Web Basics & HTML Foundations (v2)

> **Castle Metaphor**: Today, we're not just laying the foundation stones; we're meticulously planning the layout of our digital castle's ground floor. HTML is the blueprint and the core structure, defining every room, hallway, and doorway.

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Understand the role of HTML, CSS, and JavaScript in web development.
- Set up a basic local development environment using VS Code.
- Create a well-structured HTML document using standard boilerplate.
- Utilize fundamental HTML tags for text formatting, lists, links, and images.
- Understand and apply semantic HTML5 elements for better structure and accessibility.
- Validate your HTML code.

## 🔑 Key Concepts

### HTML: The Skeleton of the Web

**HTML (HyperText Markup Language)** is the *standard markup language* for creating web pages and web applications.

-   **Markup, Not Programming**: It describes the *structure* and *content*, not the logic or behavior.
-   **Elements & Tags**: HTML uses **elements** defined by **tags**.
    -   Tags are keywords enclosed in angle brackets: `<tagname>`.
    -   Most elements have an opening tag (`<p>`) and a closing tag (`</p>`).
    -   Content goes between the tags: `<p>This is paragraph content.</p>`.
    -   Some tags are **self-closing** (or void elements), like `<img>`, `<br>`, `<hr>`, `<input>`. They don't contain content directly: `<img src="castle.jpg" alt="My Castle">`.
-   **Attributes**: Tags can have **attributes**, which provide additional information about an element. They appear in the opening tag as `name="value"` pairs.
    -   Example: `<a href="https://example.com">Visit Example</a>` (`href` is the attribute).
    -   Example: `<img src="logo.png" alt="Company Logo">` (`src` and `alt` are attributes).

### The Basic HTML Document Structure

Every HTML document should follow this standard structure:

```html
<!DOCTYPE html> <!-- Declares the document type as HTML5 (essential!) -->
<html lang="en"> <!-- The root element. 'lang' specifies the page language (good for accessibility & SEO) -->

<head> <!-- Contains meta-information about the HTML document (not displayed on the page) -->
    <meta charset="UTF-8"> <!-- Specifies the character encoding (UTF-8 is standard and supports most characters) -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configures the viewport for responsive design on different devices -->
    <meta name="description" content="A brief description of the page content"> <!-- Optional: Description for search engines -->
    <title>My First Castle Page</title> <!-- The title shown in the browser tab or window title bar -->
    <!-- Links to CSS files and other metadata go here -->
</head>

<body> <!-- Contains ALL the visible content of the webpage -->

    <h1>Welcome to my Digital Castle</h1>
    <p>This is where I'll build my online presence!</p>
    <!-- More HTML elements go here -->

</body>

</html>
```

**Key parts explained:**
-   `<!DOCTYPE html>`: Crucial first line. Tells the browser to render the page in standards mode (using the latest HTML specifications). Without it, browsers might use "quirks mode," leading to unpredictable rendering.
-   `<html lang="en">`: The root element. The `lang` attribute helps screen readers pronounce words correctly and assists search engines. Use appropriate language codes (e.g., "es" for Spanish, "fr" for French).
-   `<head>`: The "brain" of the page. Contains metadata, links to stylesheets (`<link>`), scripts (`<script>`), and the `<title>`.
-   `<meta charset="UTF-8">`: Ensures text displays correctly across different languages and symbols. Always include this.
-   `<meta name="viewport" ...>`: Essential for **responsive web design**. It tells the browser how to control the page's dimensions and scaling on different device sizes (especially mobile).
-   `<title>`: Important for usability (users see it in tabs/bookmarks) and SEO (search engines use it).
-   `<body>`: Where the actual content lives – text, images, links, lists, etc.

## 🧱 Essential HTML Elements & Tags

### Text Formatting

-   **Headings**: `<h1>` to `<h6>`. Define hierarchical structure. Use `<h1>` for the main page title, `<h2>` for major sections, etc. Don't skip levels (e.g., don't go from `<h2>` to `<h4>`).
    ```html
    <h1>Castle Main Hall</h1>
    <h2>Throne Room</h2>
    <h3>Royal Seat</h3>
    ```
-   **Paragraphs**: `<p>`. Defines blocks of text. Browsers automatically add some space before and after paragraphs.
    ```html
    <p>The castle walls are thick and sturdy, built centuries ago.</p>
    <p>Legends speak of hidden passages within these walls.</p>
    ```
-   **Emphasis**:
    -   `<em>`: Emphasized text (typically italicized). Represents stress emphasis.
    -   `<strong>`: Important text (typically bold). Represents strong importance.
    ```html
    <p>You <em>must</em> see the treasury. It holds <strong>priceless</strong> artifacts.</p>
    ```
-   **Line Breaks**: `<br>`. Inserts a single line break. Use sparingly; prefer CSS for spacing.
-   **Horizontal Rule**: `<hr>`. Represents a thematic break (e.g., a scene change) – often displayed as a horizontal line.

### Lists

-   **Unordered List**: `<ul>` (bullets). For items where order doesn't matter. Contains `<li>` (list item) elements.
    ```html
    <h2>Castle Amenities</h2>
    <ul>
        <li>Grand Library</li>
        <li>Armory</li>
        <li>Stable</li>
    </ul>
    ```
-   **Ordered List**: `<ol>` (numbers/letters). For items where order is important (e.g., steps). Contains `<li>` elements.
    ```html
    <h2>Steps to Enter</h2>
    <ol>
        <li>Approach the drawbridge</li>
        <li>State your purpose</li>
        <li>Await entry</li>
    </ol>
    ```
-   **List Item**: `<li>`. Must be a direct child of `<ul>` or `<ol>`.

### Links

-   **Anchor Tag**: `<a>`. Creates hyperlinks.
    -   `href` attribute: Specifies the URL (destination). Can be absolute (`https://google.com`) or relative (`/about.html`, `contact.html`).
    -   Content between `<a>` and `</a>` is the clickable text/image.
    ```html
    <p>Visit the <a href="/gallery.html">Castle Gallery</a> or the <a href="https://en.wikipedia.org/wiki/Castle" target="_blank">Wikipedia page on Castles</a>.</p>
    <!-- target="_blank" opens the link in a new tab -->
    ```
    -   Linking to page sections: Use `href="#sectionId"` and give the target element an `id="sectionId"`.
    ```html
    <a href="#contact">Jump to Contact Info</a>
    ...
    <section id="contact">...</section>
    ```

### Images

-   **Image Tag**: `<img>`. Embeds images. It's a self-closing tag.
    -   `src` attribute (required): Path to the image file (URL or local path).
    -   `alt` attribute (required): Alternative text. Describes the image for screen readers (accessibility) and if the image fails to load. **Crucial for accessibility!**
    -   `width` and `height` attributes (optional but recommended): Specify dimensions to prevent layout shifts while the image loads.
    ```html
    <img src="images/castle-gate.jpg" alt="The main gate of the digital castle" width="600" height="400">
    ```

### Basic Structure & Grouping

-   `<div>`: Generic block-level container. Used for grouping content for styling or layout purposes (often with CSS). Has no semantic meaning on its own.
-   `<span>`: Generic inline container. Used for grouping small parts of text or inline elements, often for styling. Has no semantic meaning.
    ```html
    <div class="profile">
        <h2>Sir Reginald</h2>
        <p>Title: <span class="knight-title">Knight Commander</span></p>
    </div>
    ```

### Semantic HTML5 Elements: Building Meaningful Structures

HTML5 introduced elements that describe their content's meaning, improving accessibility, SEO, and code readability. Use them instead of generic `<div>`s whenever appropriate.

```html
<body>
    <header> <!-- Introductory content for the page or a section. Often contains logo, title, navigation. -->
        <h1>My Digital Castle</h1>
        <nav> <!-- Contains navigation links -->
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about.html">About</a></li>
                <li><a href="/contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main> <!-- Represents the dominant content of the <body>. Should be unique per page. -->
        <article> <!-- Self-contained piece of content (e.g., blog post, news story, forum post) -->
            <h2>The Legend of the Castle Ghost</h2>
            <p>Many tales are told...</p>
            <section> <!-- Represents a thematic grouping of content, typically with a heading. -->
                <h3>Eyewitness Accounts</h3>
                <p>Old Man Hemlock claims...</p>
            </section>
            <section>
                <h3>Historical Records</h3>
                <p>The castle archives mention...</p>
            </section>
        </article>

        <aside> <!-- Represents content tangentially related to the main content (e.g., sidebar, pull quotes, ads) -->
            <h4>Castle Events</h4>
            <p>Jousting tournament next Tuesday!</p>
        </aside>
    </main>

    <footer> <!-- Represents the footer for the page or a section. Often contains copyright, contact info, links. -->
        <p>&copy; 2024 My Digital Castle. All rights reserved.</p>
        <p><a href="#top">Back to top</a></p>
    </footer>
</body>
```

**Why Semantic HTML?**
-   **Accessibility**: Screen readers can better understand the page structure and navigate it (e.g., jump directly to the `<main>` content).
-   **SEO**: Search engines can better understand the context and importance of different parts of your content.
-   **Maintainability**: Code is easier to read and understand for developers (including your future self).
-   **Styling Hooks**: Provides meaningful hooks for CSS without relying solely on classes or IDs.

## 🏰 Castle Builder's Note

You've now laid a solid, well-structured foundation for your digital castle using HTML. Every tag, every attribute, every semantic element contributes to its strength and meaning. Keep practicing, validate your work, and remember that clean, semantic HTML is the bedrock of any great website.

---
