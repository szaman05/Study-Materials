# Day 3: CSS Layout & Responsive Design

> **Castle Metaphor**: Today we're arranging the rooms and corridors of our castle to create a logical layout. We'll also make sure our castle can magically adapt its size depending on who's viewing it, whether from a small handheld mirror or a large enchanted viewing glass.

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Understand the CSS Box Model in depth
- Create layouts using CSS Flexbox
- Build responsive designs that work on different screen sizes
- Implement a mobile-first approach to web design
- Use media queries to adapt layouts for different devices

## 🔑 Key Concepts

### The CSS Box Model (In Depth)

Every HTML element is treated as a rectangular box with four layers:

```
┌───────────────────────┐
│       Margin          │
│  ┌─────────────────┐  │
│  │     Border      │  │
│  │  ┌───────────┐  │  │
│  │  │  Padding  │  │  │
│  │  │ ┌───────┐ │  │  │
│  │  │ │Content│ │  │  │
│  │  │ └───────┘ │  │  │
│  │  └───────────┘  │  │
│  └─────────────────┘  │
└───────────────────────┘
```

**Content**: The actual text, images, or other media content inside the element.
**Padding**: The space between the content and the border.
**Border**: The line that surrounds the padding.
**Margin**: The space outside the border, separating the element from other elements.

```css
.castle-room {
    /* Content dimensions */
    width: 300px;
    height: 200px;
    
    /* Padding */
    padding-top: 20px;
    padding-right: 15px;
    padding-bottom: 20px;
    padding-left: 15px;
    /* Shorthand: padding: 20px 15px; (top/bottom right/left) */
    
    /* Border */
    border-width: 2px;
    border-style: solid;
    border-color: #8B4513;
    /* Shorthand: border: 2px solid #8B4513; */
    
    /* Margin */
    margin-top: 10px;
    margin-right: 5px;
    margin-bottom: 10px;
    margin-left: 5px;
    /* Shorthand: margin: 10px 5px; (top/bottom right/left) */
}
```

#### Box-Sizing

By default, when you set a width and height, those dimensions apply only to the content box. The padding and border are added on top of the specified width and height.

```css
.default-box {
    width: 300px;
    padding: 20px;
    border: 10px solid black;
    /* Total width: 300px + 40px (padding) + 20px (border) = 360px */
}
```

However, you can change this behavior with the `box-sizing` property:

```css
.border-box {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 10px solid black;
    /* Total width: 300px (including content, padding, and border) */
}
```

Many developers prefer to set this globally:

```css
* {
    box-sizing: border-box;
}
```

### CSS Flexbox

Flexbox is a one-dimensional layout model designed to arrange items in rows or columns. It's perfect for creating flexible layouts that adapt to different screen sizes.

#### Basic Concepts:

- **Flex Container**: The parent element with `display: flex;`
- **Flex Items**: The children of the flex container
- **Main Axis**: The primary axis (horizontal for row, vertical for column)
- **Cross Axis**: The perpendicular axis

#### Creating a Flex Container:

```css
.castle {
    display: flex;
    flex-direction: row; /* (default) or column */
    flex-wrap: wrap; /* or nowrap (default) */
    justify-content: space-between; /* Main axis alignment */
    align-items: center; /* Cross axis alignment */
}
```

#### Common Flexbox Properties:

For the container:
```css
.container {
    display: flex;
    flex-direction: row; /* row, row-reverse, column, column-reverse */
    flex-wrap: wrap; /* nowrap, wrap, wrap-reverse */
    justify-content: space-between; /* flex-start, flex-end, center, space-around, space-evenly */
    align-items: center; /* flex-start, flex-end, stretch, baseline */
    gap: 20px; /* Spacing between items */
}
```

For the items:
```css
.item {
    flex-grow: 1; /* How much item can grow */
    flex-shrink: 0; /* How much item can shrink */
    flex-basis: 200px; /* Default size */
    /* Shorthand: flex: 1 0 200px; */
    align-self: flex-start; /* Override alignment for this item */
    order: 2; /* Change order of item */
}
```

#### Example: Castle Rooms Layout

```html
<div class="castle-floor">
    <div class="room" id="great-hall">Great Hall</div>
    <div class="room" id="throne-room">Throne Room</div>
    <div class="room" id="kitchen">Kitchen</div>
</div>
```

```css
.castle-floor {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 15px;
}

.room {
    flex: 1;
    padding: 20px;
    border: 1px solid #8B4513;
    border-radius: 5px;
}

#great-hall {
    flex: 2; /* Takes up twice as much space */
}
```

### Responsive Design

Responsive design is an approach to web design that makes your web pages look good on all devices, from desktop computers to smartphones.

#### Key Principles:

1. **Fluid Layouts**: Use percentages instead of fixed pixel widths
2. **Flexible Images**: Make images scale with their containers
3. **Media Queries**: Apply different styles based on screen size

#### Fluid Layouts:

```css
.castle {
    width: 100%; /* Fill available space */
    max-width: 1200px; /* But no wider than this */
    margin: 0 auto; /* Center in viewport */
}

.room {
    width: 30%; /* Each room takes 30% of castle width */
}
```

#### Flexible Images:

```css
img {
    max-width: 100%;
    height: auto;
}
```

### Media Queries

Media queries allow you to apply different CSS based on the device's characteristics, primarily its screen size.

```css
/* Base styles for all devices */
.castle-floor {
    display: flex;
    flex-direction: column;
}

/* Tablet styles */
@media (min-width: 768px) {
    .castle-floor {
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    .room {
        width: 45%;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .room {
        width: 30%;
    }
}
```

#### Mobile-First Approach

Start with styles for mobile devices, then add media queries for larger screens. This approach ensures your site works on smaller devices by default.

```css
/* Mobile styles (default) */
.castle-nav {
    display: none; /* Hidden by default on mobile */
}

.menu-toggle {
    display: block; /* Show hamburger menu on mobile */
}

/* Tablet and larger */
@media (min-width: 768px) {
    .castle-nav {
        display: flex; /* Show navigation */
    }
    
    .menu-toggle {
        display: none; /* Hide hamburger menu */
    }
}
```

## 💪 Practical Exercise: Making Our Castle Responsive

Let's update our castle homepage to make it responsive using Flexbox and media queries.

1. First, let's modify our CSS in `styles.css` to include Flexbox and responsive design:

```css
/* Add this to your existing styles.css */

/* Reset box model */
* {
    box-sizing: border-box;
}

/* Mobile-first styles */
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
    background-color: #8B4513;
    color: #FFF;
    padding: 20px;
    text-align: center;
}

header h1 {
    margin: 0;
    font-size: 2em;
}

/* Main Content */
main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px;
}

/* Section Styles */
section {
    background-color: #FFF;
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 5px;
    border-left: 5px solid #8B4513;
}

/* Flexbox Layout for Castle Features */
.castle-features {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.feature-card {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #ddd;
}

/* Responsive Table */
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

/* Flexible Images */
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

/* Footer */
footer {
    text-align: center;
    padding: 10px;
    background-color: #333;
    color: #FFF;
    font-size: 0.8em;
}

/* Tablet Styles */
@media (min-width: 768px) {
    header h1 {
        font-size: 2.5em;
    }
    
    .castle-features {
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    .feature-card {
        flex-basis: calc(50% - 15px);
    }
    
    .about-castle {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    
    .about-castle img {
        max-width: 40%;
    }
}

/* Desktop Styles */
@media (min-width: 1024px) {
    .feature-card {
        flex-basis: calc(33.333% - 20px);
    }
    
    section {
        padding: 25px;
    }
}
```

2. Now let's update our HTML to work with our new responsive CSS:

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
        <section class="about-castle">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Edinburgh_Castle_from_the_North.JPG/320px-Edinburgh_Castle_from_the_North.JPG" alt="Castle Image">
            <div>
                <h2>About My Castle</h2>
                <p>This castle was founded in 2023 and is built with the finest HTML stones and CSS decorations. It features responsive architecture that adapts to visitors approaching on any device, from small hand mirrors to large viewing glasses.</p>
            </div>
        </section>
        
        <section>
            <h2>Castle Features</h2>
            <div class="castle-features">
                <div class="feature-card">
                    <h3>Strong Foundation</h3>
                    <p>Built with semantic HTML5 for a solid structure that will stand the test of time.</p>
                </div>
                <div class="feature-card">
                    <h3>Beautiful Design</h3>
                    <p>Decorated with CSS styles that create a visually appealing experience for all visitors.</p>
                </div>
                <div class="feature-card">
                    <h3>Responsive Layout</h3>
                    <p>The castle magically adjusts its size and layout depending on the visitor's viewing device.</p>
                </div>
                <div class="feature-card">
                    <h3>Interactive Elements</h3>
                    <p>Coming soon: JavaScript enchantments to add interactive features to our castle.</p>
                </div>
            </div>
        </section>
        
        <section>
            <h2>Castle Rooms</h2>
            <table>
                <tr>
                    <th>Room</th>
                    <th>Function</th>
                    <th>Size</th>
                </tr>
                <tr>
                    <td>Great Hall</td>
                    <td>Meetings and festivities</td>
                    <td>Large</td>
                </tr>
                <tr>
                    <td>Library</td>
                    <td>Knowledge and learning</td>
                    <td>Medium</td>
                </tr>
                <tr>
                    <td>Observatory</td>
                    <td>Stargazing and wonder</td>
                    <td>Small</td>
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

3. Open this in your browser and try resizing the window to see how the layout adapts!

## 🔍 Challenge Tasks

1. Add a responsive navigation bar at the top of the page that converts to a hamburger menu on mobile
2. Create a "photo gallery" section with a flexbox grid of castle images that reflows based on screen size
3. Implement a "card flip" effect using CSS for your feature cards (hint: look up CSS transform properties)
4. Make the table responsive so it becomes a list on mobile devices
5. Add CSS transitions to smooth out the responsive layout changes

## 📚 Additional Resources

- [MDN Web Docs: Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy](https://flexboxfroggy.com/) - A game for learning Flexbox
- [MDN Web Docs: Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
- [Responsive Web Design Fundamentals](https://web.dev/responsive-web-design-basics/) - Google Developers guide
- [Can I Use](https://caniuse.com/) - Browser compatibility tables for CSS

## 🏰 Castle Builder's Note

Today we learned how to organize our castle's layout with Flexbox and make it adapt to different viewing devices. A truly magical castle should look impressive whether viewed through a small pocket mirror or a grand hall's viewing glass! Responsive design ensures that all visitors have a great experience exploring your digital realm, regardless of the device they're using.

---

**Tomorrow:** We'll bring our castle to life with JavaScript fundamentals, adding interactive elements and dynamic behavior to our static structure. 