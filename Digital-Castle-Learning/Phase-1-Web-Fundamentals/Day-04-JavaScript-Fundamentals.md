# Day 4: JavaScript Fundamentals

> **Castle Metaphor**: Today we begin adding magical interactions to our castle. If HTML is the structure and CSS is the appearance, JavaScript is the enchantment that brings our castle to life with moving elements, interactive features, and dynamic behaviors.

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Understand what JavaScript is and how it works in the browser
- Use variables to store and manipulate data
- Work with different data types (strings, numbers, booleans, etc.)
- Create and use functions
- Implement conditional logic with if/else statements
- Create simple loops to repeat actions
- Add basic interactivity to your castle webpage

## 🔑 Key Concepts

### What is JavaScript?

JavaScript is a programming language that allows you to implement complex features on web pages. It's what transforms static webpages into dynamic, interactive applications.

JavaScript can:
- Respond to user actions (clicks, key presses, form submissions)
- Update content dynamically without refreshing the page
- Store and retrieve data
- Send requests to servers
- Create animations and visual effects
- And much, much more!

### Adding JavaScript to HTML

There are three ways to add JavaScript to an HTML document:

**1. Inline JavaScript**:
```html
<button onclick="alert('Welcome to my castle!')">Greet Visitor</button>
```

**2. Internal JavaScript** (using `<script>` tags):
```html
<script>
    function greetVisitor() {
        alert('Welcome to my castle!');
    }
</script>
```

**3. External JavaScript** (recommended):
```html
<script src="script.js"></script>
```

With a separate `script.js` file containing your JavaScript code.

### JavaScript Syntax Basics

JavaScript statements end with a semicolon (optional but recommended):
```javascript
let greeting = "Welcome to my castle!";
console.log(greeting);
```

Comments can be added to explain your code:
```javascript
// This is a single-line comment

/*
This is a
multi-line comment
*/
```

### Variables and Data Types

Variables are containers for storing data values.

**Declaring Variables**:
```javascript
// Modern way to declare variables (recommended)
let visitorName = "Arthur";  // Can be reassigned
const castleName = "Digital Fortress";  // Cannot be reassigned

// Older way (avoid using var in modern code)
var kingName = "Richard";  // Function-scoped variable
```

**Common Data Types**:

1. **String** - Text:
```javascript
let roomName = "Great Hall";
let quote = 'The castle stands tall.';
let description = `${castleName} was built in 2023.`; // Template literal (allows embedding variables)
```

2. **Number** - Numeric values:
```javascript
let towers = 4;
let height = 150.5; // Heights in meters
```

3. **Boolean** - True/False values:
```javascript
let drawbridgeOpen = true;
let moatFilled = false;
```

4. **Array** - Lists of values:
```javascript
let castleRooms = ["Great Hall", "Throne Room", "Kitchen", "Dungeon"];
// Access array elements with index (starting at 0)
console.log(castleRooms[0]); // "Great Hall"
```

5. **Object** - Collections of related data:
```javascript
let knight = {
    name: "Sir Lancelot",
    age: 35,
    weapon: "Sword",
    isRoyalGuard: true
};
// Access object properties
console.log(knight.name); // "Sir Lancelot"
```

6. **Null and Undefined**:
```javascript
let treasureLocation = null; // Intentionally empty value
let dragonName; // Undefined (variable declared but not assigned)
```

### Operators

**Arithmetic Operators**:
```javascript
let knights = 10 + 5;      // Addition: 15
let guards = 20 - 5;       // Subtraction: 15
let rooms = 3 * 4;         // Multiplication: 12
let towersPerWall = 12 / 4; // Division: 3
let remainder = 10 % 3;    // Modulus (remainder): 1
```

**Comparison Operators**:
```javascript
5 > 3       // Greater than: true
5 < 3       // Less than: false
5 >= 5      // Greater than or equal to: true
5 <= 4      // Less than or equal to: false
5 === 5     // Equal (strict): true
5 == "5"    // Equal (loose, converts types): true
5 !== "5"   // Not equal (strict): true
```

**Logical Operators**:
```javascript
(5 > 3) && (10 > 5)  // AND: true (both conditions true)
(5 > 3) || (10 < 5)  // OR: true (at least one condition true)
!(5 > 3)             // NOT: false (inverts boolean)
```

### Control Structures

**Conditional Statements**:

1. **if/else**:
```javascript
let visitorRole = "knight";

if (visitorRole === "king") {
    console.log("Welcome, Your Majesty!");
} else if (visitorRole === "knight") {
    console.log("Welcome, brave knight!");
} else {
    console.log("Welcome, visitor!");
}
```

2. **switch statement**:
```javascript
let room = "Throne Room";

switch (room) {
    case "Great Hall":
        console.log("The largest room in the castle.");
        break;
    case "Throne Room":
        console.log("Where the king holds court.");
        break;
    case "Kitchen":
        console.log("Where the feasts are prepared.");
        break;
    default:
        console.log("A room in the castle.");
}
```

**Loops**:

1. **for loop**:
```javascript
// Loop from 0 to 4
for (let i = 0; i < 5; i++) {
    console.log(`Tower ${i + 1} is secure.`);
}
```

2. **for...of loop** (for arrays):
```javascript
let castleRooms = ["Great Hall", "Throne Room", "Kitchen"];

for (let room of castleRooms) {
    console.log(`Now entering the ${room}.`);
}
```

3. **while loop**:
```javascript
let guardsOnDuty = 5;

while (guardsOnDuty > 0) {
    console.log(`${guardsOnDuty} guards remaining on duty.`);
    guardsOnDuty--;
}
```

### Functions

Functions are reusable blocks of code that perform specific tasks:

**Declaring Functions**:

1. **Function Declaration**:
```javascript
function announceVisitor(visitorName) {
    return `Now announcing the arrival of ${visitorName}!`;
}

// Calling the function
let announcement = announceVisitor("Sir Lancelot");
console.log(announcement);
```

2. **Function Expression**:
```javascript
const calculateTowerHeight = function(levels, levelHeight) {
    return levels * levelHeight;
};

let northTowerHeight = calculateTowerHeight(5, 10);
console.log(`The North Tower is ${northTowerHeight} meters tall.`);
```

3. **Arrow Function** (modern, shorter syntax):
```javascript
const greet = (visitorName) => {
    return `Welcome to the castle, ${visitorName}!`;
};

// Even shorter for simple returns
const multiply = (a, b) => a * b;
```

### Basic DOM Manipulation

The Document Object Model (DOM) is a programming interface for HTML documents. JavaScript can change all the HTML elements, attributes, and CSS styles in the page.

**Selecting Elements**:
```javascript
// By ID
const mainTower = document.getElementById("main-tower");

// By class name (returns a collection)
const rooms = document.getElementsByClassName("room");

// By tag name (returns a collection)
const paragraphs = document.getElementsByTagName("p");

// Using CSS selectors (modern)
const banner = document.querySelector(".castle-banner");
const allButtons = document.querySelectorAll("button");
```

**Changing Content**:
```javascript
// Change text content
document.getElementById("castle-name").textContent = "Camelot";

// Change HTML content
document.getElementById("announcement").innerHTML = "<strong>Welcome</strong> to the castle!";
```

**Changing Styles**:
```javascript
const tower = document.getElementById("north-tower");
tower.style.backgroundColor = "gray";
tower.style.height = "200px";
```

**Adding Event Listeners**:
```javascript
const drawbridge = document.getElementById("drawbridge");

drawbridge.addEventListener("click", function() {
    alert("Lowering the drawbridge!");
});

// Or with arrow function
drawbridge.addEventListener("mouseover", () => {
    drawbridge.style.backgroundColor = "brown";
});
```

## 💪 Practical Exercise: Interactive Castle Features

Let's enhance our castle website with some interactive JavaScript features. Create a new file called `script.js` in your project folder and add the following code:

```javascript
// script.js - Castle interactivity

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Welcome Message
    const visitorName = prompt("What is your name, traveler?") || "Mysterious Visitor";
    const welcomeMessage = document.getElementById("welcome-message");
    
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome to our castle, ${visitorName}!`;
    }
    
    // 2. Toggle Room Information
    const roomTitles = document.querySelectorAll(".room-title");
    
    roomTitles.forEach(title => {
        title.addEventListener("click", function() {
            // Find the description that follows this title
            const description = this.nextElementSibling;
            
            // Toggle the visibility
            if (description.style.display === "none" || description.style.display === "") {
                description.style.display = "block";
                this.style.backgroundColor = "#8B4513";
                this.style.color = "white";
            } else {
                description.style.display = "none";
                this.style.backgroundColor = "";
                this.style.color = "";
            }
        });
    });
    
    // 3. Castle Time
    function updateCastleTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        const castleTimeElement = document.getElementById("castle-time");
        if (castleTimeElement) {
            castleTimeElement.textContent = timeString;
        }
    }
    
    // Update the time immediately and then every second
    updateCastleTime();
    setInterval(updateCastleTime, 1000);
    
    // 4. Feature Toggle
    const featureToggles = document.querySelectorAll(".feature-toggle");
    
    featureToggles.forEach(toggle => {
        toggle.addEventListener("change", function() {
            const featureId = this.getAttribute("data-feature");
            const featureElement = document.getElementById(featureId);
            
            if (featureElement) {
                featureElement.style.display = this.checked ? "block" : "none";
            }
        });
    });
});
```

Now, let's update our HTML to include the JavaScript and create the elements our script interacts with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Digital Castle</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>
    <header>
        <h1>Welcome to My Digital Castle</h1>
        <p id="welcome-message">A place where imagination meets technology</p>
        <div class="castle-clock">
            Castle Time: <span id="castle-time">00:00:00</span>
        </div>
    </header>
    
    <main>
        <section class="about-castle">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Edinburgh_Castle_from_the_North.JPG/320px-Edinburgh_Castle_from_the_North.JPG" alt="Castle Image">
            <div>
                <h2>About My Castle</h2>
                <p>This castle was founded in 2023 and is built with the finest HTML stones, CSS decorations, and JavaScript enchantments.</p>
            </div>
        </section>
        
        <section>
            <h2>Castle Rooms</h2>
            <p>Click on a room name to learn more about it:</p>
            
            <div class="room">
                <h3 class="room-title">Great Hall</h3>
                <div class="room-description" style="display: none;">
                    <p>The Great Hall is the largest room in the castle, used for feasts, ceremonies, and gatherings. Its high ceiling is adorned with chandeliers and banners.</p>
                </div>
            </div>
            
            <div class="room">
                <h3 class="room-title">Throne Room</h3>
                <div class="room-description" style="display: none;">
                    <p>The Throne Room is where the castle lord holds court and makes important decisions. The magnificent throne is carved from ancient oak.</p>
                </div>
            </div>
            
            <div class="room">
                <h3 class="room-title">Observatory</h3>
                <div class="room-description" style="display: none;">
                    <p>Located in the highest tower, the Observatory provides a panoramic view of the surrounding lands and is equipped with telescopes for stargazing.</p>
                </div>
            </div>
        </section>
        
        <section>
            <h2>Castle Features</h2>
            <p>Toggle features to show or hide them:</p>
            
            <div class="feature-controls">
                <label>
                    <input type="checkbox" class="feature-toggle" data-feature="moat"> Moat
                </label>
                <label>
                    <input type="checkbox" class="feature-toggle" data-feature="drawbridge"> Drawbridge
                </label>
                <label>
                    <input type="checkbox" class="feature-toggle" data-feature="garden"> Garden
                </label>
            </div>
            
            <div class="castle-features">
                <div class="feature" id="moat" style="display: none;">
                    <h3>Castle Moat</h3>
                    <p>A deep water-filled trench surrounding the castle, providing defense against invaders.</p>
                </div>
                
                <div class="feature" id="drawbridge" style="display: none;">
                    <h3>Drawbridge</h3>
                    <p>A wooden bridge that can be raised or lowered to control access to the castle's main entrance.</p>
                </div>
                
                <div class="feature" id="garden" style="display: none;">
                    <h3>Castle Garden</h3>
                    <p>A beautiful garden with exotic plants, fountains, and statues, providing a peaceful retreat.</p>
                </div>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 My Digital Castle. All rights reserved.</p>
        <p>Contact the castle keeper: <a href="mailto:keeper@digitalcastle.example">keeper@digitalcastle.example</a></p>
    </footer>
</body>
</html>
```

Let's also add some additional CSS in `styles.css` to style our interactive elements:

```css
/* Add these styles to your existing styles.css */

/* Castle Clock */
.castle-clock {
    background-color: #333;
    color: #f0f0f0;
    padding: 5px 10px;
    border-radius: 5px;
    font-family: monospace;
    display: inline-block;
    margin-top: 10px;
}

/* Room Styles */
.room {
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
}

.room-title {
    margin: 0;
    padding: 10px;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: background-color 0.3s;
}

.room-title:hover {
    background-color: #e0e0e0;
}

.room-description {
    padding: 15px;
    border-top: 1px solid #ddd;
}

/* Feature Controls */
.feature-controls {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
}

.feature-controls label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}

.feature {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
    animation: fadeIn 0.5s;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

## 🔍 Challenge Tasks

1. Create a castle visitor counter that increases each time the page is loaded (hint: use `localStorage`)
2. Add a day/night mode toggle that changes the color scheme of the entire castle
3. Implement a simple quiz about castles with at least three questions
4. Create an interactive castle map where clicking on different areas shows information about that part of the castle
5. Add a form that "sends a message to the castle keeper" (just display the message on the page, no actual sending required)

## 📚 Additional Resources

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [JavaScript.info](https://javascript.info/) - Modern JavaScript Tutorial
- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/)
- [FreeCodeCamp Basic JavaScript](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#basic-javascript)
- [JavaScript 30](https://javascript30.com/) - 30 Days of JavaScript Challenges
- [Eloquent JavaScript](https://eloquentjavascript.net/) - Free online book

## 🏰 Castle Builder's Note

Today we added the first magical enchantments to our castle! JavaScript brings interactivity and dynamic behavior to what was previously a static structure. While HTML and CSS define how the castle looks, JavaScript defines how it behaves and responds to visitors. With these three technologies working together, you can create truly magical digital experiences.

---

**Tomorrow:** We'll dive deeper into JavaScript and learn how to manipulate the Document Object Model (DOM) to create even more interactive elements for our castle. 