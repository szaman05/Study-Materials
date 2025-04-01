# Day 6: Advanced JavaScript Concepts - Part I

> **Castle Metaphor**: Today we're upgrading our castle with more sophisticated building techniques. If basic JavaScript was about laying the foundation stones, advanced JavaScript is like adding ingenious architectural features - secret passages, efficient pulley systems, and specialized tools that make our castle more functional and impressive.

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Use modern ES6+ JavaScript features
- Understand and apply higher-order functions, closures, and callbacks
- Master advanced array methods to manipulate data efficiently
- Refactor code using modern JavaScript techniques
- Improve your castle features using advanced JavaScript concepts

## 🔑 Key Concepts

### Modern ES6+ Features

ES6 (ECMAScript 2015) and newer versions introduced several features that make JavaScript more powerful and expressive.

#### Arrow Functions

Arrow functions provide a shorter syntax for writing functions and don't bind their own `this` value.

```javascript
// Traditional function
function greetVisitor(name) {
    return `Welcome to the castle, ${name}!`;
}

// Arrow function
const greetVisitor = (name) => `Welcome to the castle, ${name}!`;

// With multiple parameters
const calculateRoomArea = (length, width) => length * width;

// With function body for multiple statements
const announceArrival = (visitor) => {
    const greeting = `Announcing the arrival of ${visitor}!`;
    console.log(greeting);
    return greeting;
};
```

#### Destructuring

Destructuring allows you to extract values from objects and arrays easily:

```javascript
// Object destructuring
const knight = {
    name: "Sir Lancelot",
    weapon: "Sword",
    skill: "Jousting"
};

const { name, weapon } = knight;
console.log(name);    // "Sir Lancelot"
console.log(weapon);  // "Sword"

// Array destructuring
const castleRooms = ["Great Hall", "Throne Room", "Kitchen"];
const [mainRoom, royalRoom, servantRoom] = castleRooms;
console.log(mainRoom);   // "Great Hall"
console.log(royalRoom);  // "Throne Room"

// With default values
const { age = 30 } = knight;
console.log(age);  // 30 (default value since knight.age is undefined)

// Function parameter destructuring
function describeCastle({ name, towers, moat }) {
    return `${name} has ${towers} towers and ${moat ? 'a' : 'no'} moat.`;
}

describeCastle({ name: "Camelot", towers: 5, moat: true });
// "Camelot has 5 towers and a moat."
```

#### Spread and Rest Operators

The `...` operator can be used as either spread or rest:

**Spread** - Expands an array or object:

```javascript
// Combining arrays
const guards = ["John", "Michael"];
const servants = ["Anne", "Thomas"];
const castleStaff = [...guards, ...servants];
console.log(castleStaff);  // ["John", "Michael", "Anne", "Thomas"]

// Copying arrays
const originalGuards = ["John", "Michael"];
const guardsCopy = [...originalGuards];

// With objects
const basicCastleFeatures = {
    name: "Black Castle",
    towers: 4
};

const enhancedCastle = {
    ...basicCastleFeatures,
    moat: true,
    drawbridge: true
};
console.log(enhancedCastle);
// { name: "Black Castle", towers: 4, moat: true, drawbridge: true }
```

**Rest** - Collects multiple elements into an array:

```javascript
// Rest in function parameters
function assignRooms(kingRoom, queenRoom, ...otherRooms) {
    console.log(`King stays in ${kingRoom}`);
    console.log(`Queen stays in ${queenRoom}`);
    console.log(`Others stay in: ${otherRooms.join(', ')}`);
}

assignRooms("Royal Chamber", "Queen's Suite", "Guest Room", "Tower Room", "Servant Quarter");
// King stays in Royal Chamber
// Queen stays in Queen's Suite
// Others stay in: Guest Room, Tower Room, Servant Quarter

// Rest in destructuring
const [head, ...tail] = [1, 2, 3, 4];
console.log(head);  // 1
console.log(tail);  // [2, 3, 4]
```

#### Template Literals

Template literals allow multiline strings and expression interpolation:

```javascript
const visitor = "Arthur";
const room = "Great Hall";

// Traditional string concatenation
const oldMessage = "Welcome, " + visitor + "! Please proceed to the " + room + ".";

// Template literal
const newMessage = `Welcome, ${visitor}! Please proceed to the ${room}.`;

// Multiline string
const announcement = `
  HEAR YE, HEAR YE!
  All castle residents are invited to
  the grand feast tonight at the Great Hall.
  Attendance is mandatory by order of the King.
`;

// Expression interpolation
const calculateTax = (amount, rate) => amount * rate;
const price = 100;
const taxRate = 0.07;

console.log(`Price with tax: $${price + (calculateTax(price, taxRate)).toFixed(2)}`);
// "Price with tax: $107.00"
```

### Advanced Functions

JavaScript functions have special capabilities that make them powerful tools in your code.

#### Higher-Order Functions

A higher-order function is a function that either:
1. Takes one or more functions as arguments
2. Returns a function as its result

```javascript
// Function that takes a function as an argument
function executeCastleTask(task, name) {
    console.log(`Starting task for ${name}...`);
    task(name);
    console.log("Task completed!");
}

// Pass a function as an argument
executeCastleTask(
    (name) => console.log(`${name} is cleaning the Great Hall`),
    "Servant Tom"
);

// Function that returns a function (Function Factory)
function createGreeter(greeting) {
    // This function is created and returned when createGreeter is called
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const royalGreeter = createGreeter("Your Majesty welcomes you");
const guardGreeter = createGreeter("Halt! State your business");

console.log(royalGreeter("Sir Lancelot"));  // "Your Majesty welcomes you, Sir Lancelot!"
console.log(guardGreeter("Traveling Merchant"));  // "Halt! State your business, Traveling Merchant!"
```

#### Closures

A closure is a function that remembers the variables from its outer scope, even after the outer function has finished executing.

```javascript
function createCounter(initialValue = 0) {
    let count = initialValue;  // This variable is "enclosed" in the returned function
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count,
        reset: () => { count = initialValue; return count; }
    };
}

const visitorCounter = createCounter();
console.log(visitorCounter.getValue());  // 0
visitorCounter.increment();
visitorCounter.increment();
console.log(visitorCounter.getValue());  // 2
visitorCounter.decrement();
console.log(visitorCounter.getValue());  // 1
visitorCounter.reset();
console.log(visitorCounter.getValue());  // 0

// A practical example: creating a castle treasure chest
function createTreasureChest() {
    const treasures = [];
    
    return {
        addTreasure: (item) => {
            treasures.push(item);
            return `Added ${item} to the chest.`;
        },
        listTreasures: () => {
            if (treasures.length === 0) return "Chest is empty!";
            return `Chest contains: ${treasures.join(', ')}`;
        }
    };
}

const royalChest = createTreasureChest();
console.log(royalChest.listTreasures());  // "Chest is empty!"
console.log(royalChest.addTreasure("Gold crown"));
console.log(royalChest.addTreasure("Ruby scepter"));
console.log(royalChest.listTreasures());  // "Chest contains: Gold crown, Ruby scepter"
```

#### Callbacks

A callback is a function passed as an argument to another function, to be executed later.

```javascript
// Simple callback example
function orderKitchenTask(dish, callback) {
    console.log(`Kitchen is preparing ${dish}...`);
    
    // Simulate cooking time
    setTimeout(() => {
        console.log(`${dish} is ready!`);
        callback(dish);
    }, 2000);
}

orderKitchenTask("Royal Feast", (meal) => {
    console.log(`Serving ${meal} to the royal table.`);
});
// Kitchen is preparing Royal Feast...
// (after 2 seconds)
// Royal Feast is ready!
// Serving Royal Feast to the royal table.

// Callbacks for event handling
document.getElementById("drawbridge-button").addEventListener("click", function() {
    console.log("Lowering the drawbridge...");
    // Code to lower the drawbridge
});
```

### Advanced Array Methods

JavaScript arrays have powerful built-in methods for data manipulation.

#### map()

The `map()` method creates a new array by applying a function to each element of the original array:

```javascript
const servantsAges = [22, 35, 18, 40, 27];

// Create a new array with ages after 5 years
const servantsAgesIn5Years = servantsAges.map(age => age + 5);
console.log(servantsAgesIn5Years); // [27, 40, 23, 45, 32]

// Transforming an array of objects
const knights = [
    { name: "Sir Lancelot", skill: 9 },
    { name: "Sir Gawain", skill: 8 },
    { name: "Sir Kay", skill: 7 }
];

const knightDescriptions = knights.map(knight => 
    `${knight.name} has a skill level of ${knight.skill}/10`
);
console.log(knightDescriptions);
// ["Sir Lancelot has a skill level of 9/10", 
// "Sir Gawain has a skill level of 8/10", 
// "Sir Kay has a skill level of 7/10"]
```

#### filter()

The `filter()` method creates a new array with elements that pass a test:

```javascript
const castleResidents = [
    { name: "Arthur", role: "King", age: 42 },
    { name: "Lancelot", role: "Knight", age: 35 },
    { name: "Merlin", role: "Wizard", age: 87 },
    { name: "Guinevere", role: "Queen", age: 38 },
    { name: "Galahad", role: "Knight", age: 25 }
];

// Filter knights only
const knights = castleResidents.filter(person => person.role === "Knight");
console.log(knights);
// [{ name: "Lancelot", role: "Knight", age: 35 }, 
//  { name: "Galahad", role: "Knight", age: 25 }]

// Filter residents older than 40
const elderResidents = castleResidents.filter(person => person.age > 40);
console.log(elderResidents);
// [{ name: "Arthur", role: "King", age: 42 }, 
//  { name: "Merlin", role: "Wizard", age: 87 }]

// Combining conditions
const youngKnights = castleResidents.filter(
    person => person.role === "Knight" && person.age < 30
);
console.log(youngKnights);
// [{ name: "Galahad", role: "Knight", age: 25 }]
```

#### reduce()

The `reduce()` method executes a reducer function on each element of the array, resulting in a single output value:

```javascript
const treasures = [
    { item: "Gold Crown", value: 500 },
    { item: "Silver Chalice", value: 200 },
    { item: "Bronze Shield", value: 100 },
    { item: "Ruby Necklace", value: 800 }
];

// Calculate the total value of all treasures
const totalTreasureValue = treasures.reduce(
    (total, treasure) => total + treasure.value, 
    0 // Initial value for total
);
console.log(totalTreasureValue); // 1600

// Group castle residents by role
const residentsByRole = castleResidents.reduce((groups, person) => {
    // If this role doesn't exist in our groups object yet, create it
    if (!groups[person.role]) {
        groups[person.role] = [];
    }
    
    // Add the person to the appropriate role group
    groups[person.role].push(person.name);
    
    return groups;
}, {});

console.log(residentsByRole);
// {
//   King: ["Arthur"],
//   Knight: ["Lancelot", "Galahad"],
//   Wizard: ["Merlin"],
//   Queen: ["Guinevere"]
// }

// Find the oldest resident
const oldestResident = castleResidents.reduce(
    (oldest, person) => person.age > oldest.age ? person : oldest, 
    castleResidents[0]
);
console.log(oldestResident);
// { name: "Merlin", role: "Wizard", age: 87 }
```

#### find() and findIndex()

The `find()` method returns the first element that satisfies a test, while `findIndex()` returns its index:

```javascript
// Find the wizard
const wizard = castleResidents.find(person => person.role === "Wizard");
console.log(wizard); // { name: "Merlin", role: "Wizard", age: 87 }

// Find index of the queen
const queenIndex = castleResidents.findIndex(person => person.role === "Queen");
console.log(queenIndex); // 3 (index of Guinevere in the array)
```

#### some() and every()

The `some()` method tests if at least one element passes a test, while `every()` tests if all elements pass:

```javascript
// Check if there's anyone over 80 years old
const hasElderlyResidents = castleResidents.some(person => person.age > 80);
console.log(hasElderlyResidents); // true (Merlin is 87)

// Check if all residents are at least 18 years old
const allAdults = castleResidents.every(person => person.age >= 18);
console.log(allAdults); // true
```

## 💪 Practical Exercise: Castle Staff Management System

Let's create a simple castle staff management system using the advanced JavaScript concepts we've learned.

### Step 1: Set Up Your Staff Data

```javascript
// Create an array of castle staff
const castleStaff = [
    { id: 1, name: "Thomas", role: "Guard", area: "Main Gate", yearsOfService: 5, salary: 300 },
    { id: 2, name: "Eleanor", role: "Cook", area: "Kitchen", yearsOfService: 12, salary: 400 },
    { id: 3, name: "Marcus", role: "Stable Master", area: "Stables", yearsOfService: 8, salary: 320 },
    { id: 4, name: "Beatrice", role: "Nurse", area: "Infirmary", yearsOfService: 3, salary: 350 },
    { id: 5, name: "Giles", role: "Guard", area: "Throne Room", yearsOfService: 7, salary: 310 },
    { id: 6, name: "Amelia", role: "Servant", area: "Royal Chambers", yearsOfService: 2, salary: 200 },
    { id: 7, name: "Frederick", role: "Butler", area: "Great Hall", yearsOfService: 15, salary: 500 },
    { id: 8, name: "Matilda", role: "Servant", area: "Library", yearsOfService: 4, salary: 210 },
    { id: 9, name: "Robert", role: "Guard", area: "Treasury", yearsOfService: 10, salary: 330 },
    { id: 10, name: "Sophia", role: "Gardener", area: "Gardens", yearsOfService: 6, salary: 280 }
];
```

### Step 2: Create a Staff Management Module Using Closures and Higher-Order Functions

```javascript
function createStaffManager(staff) {
    // The original staff array is enclosed in the closure
    const allStaff = [...staff];
    
    return {
        // Get all staff members
        getAllStaff: () => [...allStaff],
        
        // Filter staff by role
        getStaffByRole: (role) => allStaff.filter(member => member.role === role),
        
        // Filter staff by area
        getStaffByArea: (area) => allStaff.filter(member => member.area === area),
        
        // Find a specific staff member by ID
        findStaffMember: (id) => allStaff.find(member => member.id === id),
        
        // Add a new staff member
        addStaffMember: (member) => {
            // Generate a new ID
            const newId = Math.max(...allStaff.map(m => m.id)) + 1;
            const newMember = { ...member, id: newId };
            allStaff.push(newMember);
            return newMember;
        },
        
        // Remove a staff member
        removeStaffMember: (id) => {
            const index = allStaff.findIndex(member => member.id === id);
            if (index !== -1) {
                const removed = allStaff.splice(index, 1)[0];
                return { success: true, removed };
            }
            return { success: false };
        },
        
        // Calculate total salary of all staff
        getTotalSalary: () => allStaff.reduce((total, member) => total + member.salary, 0),
        
        // Calculate average years of service
        getAverageYearsOfService: () => {
            const total = allStaff.reduce((sum, member) => sum + member.yearsOfService, 0);
            return total / allStaff.length;
        },
        
        // Get staff that meet a custom criteria using a callback
        getStaffByCriteria: (criteriaFn) => allStaff.filter(criteriaFn),
        
        // Sort staff by a property
        sortStaffBy: (property, ascending = true) => {
            return [...allStaff].sort((a, b) => {
                if (ascending) {
                    return a[property] > b[property] ? 1 : -1;
                } else {
                    return a[property] < b[property] ? 1 : -1;
                }
            });
        },
        
        // Give a raise to staff members who meet certain criteria
        giveRaiseToCriteria: (criteriaFn, amount) => {
            allStaff.forEach(member => {
                if (criteriaFn(member)) {
                    member.salary += amount;
                }
            });
            return allStaff.filter(criteriaFn);
        }
    };
}
```

### Step 3: Use Your Staff Management System

```javascript
// Create a new staff manager
const staffManager = createStaffManager(castleStaff);

// Get all guards
const allGuards = staffManager.getStaffByRole("Guard");
console.log("Castle guards:", allGuards);

// Find staff in the Kitchen
const kitchenStaff = staffManager.getStaffByArea("Kitchen");
console.log("Kitchen staff:", kitchenStaff);

// Calculate total monthly salary expenses
const totalSalary = staffManager.getTotalSalary();
console.log(`Total monthly salary expenses: ${totalSalary} gold coins`);

// Find experienced staff (more than 10 years of service)
const experiencedStaff = staffManager.getStaffByCriteria(
    member => member.yearsOfService > 10
);
console.log("Experienced staff members:", experiencedStaff);

// Sort staff by salary (highest to lowest)
const staffBySalary = staffManager.sortStaffBy("salary", false);
console.log("Staff sorted by salary (highest first):", staffBySalary);

// Give a 50 gold coin raise to all guards
const guardsWithRaise = staffManager.giveRaiseToCriteria(
    member => member.role === "Guard", 
    50
);
console.log("Guards after receiving a raise:", guardsWithRaise);

// Add a new staff member
const newServant = staffManager.addStaffMember({
    name: "Oliver",
    role: "Servant",
    area: "Wine Cellar",
    yearsOfService: 1,
    salary: 190
});
console.log("New staff member added:", newServant);

// Get the updated list of all staff
const updatedStaff = staffManager.getAllStaff();
console.log("Updated staff list:", updatedStaff);
```

### Step 4: Implement a Staff Search Feature Using Map and Filter

```javascript
// Create a search function using higher-order functions
function createStaffSearcher(staffManager) {
    return function(query) {
        // Get all staff
        const allStaff = staffManager.getAllStaff();
        
        // If no query, return everyone
        if (!query || query.trim() === "") {
            return allStaff;
        }
        
        // Convert query to lowercase for case-insensitive search
        query = query.toLowerCase();
        
        // Filter staff that match the query
        const results = allStaff.filter(member => 
            member.name.toLowerCase().includes(query) ||
            member.role.toLowerCase().includes(query) ||
            member.area.toLowerCase().includes(query)
        );
        
        // Map to add a matchReason property showing why they matched
        return results.map(member => {
            const matchReason = [];
            
            if (member.name.toLowerCase().includes(query)) {
                matchReason.push("name");
            }
            if (member.role.toLowerCase().includes(query)) {
                matchReason.push("role");
            }
            if (member.area.toLowerCase().includes(query)) {
                matchReason.push("area");
            }
            
            return { 
                ...member, 
                matchReason: matchReason.join(", ")
            };
        });
    };
}

// Create a staff searcher
const searchStaff = createStaffSearcher(staffManager);

// Search for staff
console.log(searchStaff("guard")); // Find all guards
console.log(searchStaff("hall")); // Find anyone working in a hall
console.log(searchStaff("mat")); // Find anyone with "mat" in their name (like Matilda)
```

## 🔍 Challenge Tasks

1. **Staff Scheduler**: Create a function that generates weekly schedules for castle staff using array methods and higher-order functions. Each staff member should work 5 days a week, and critical areas must always be staffed.

2. **Promotion System**: Implement a promotion system that evaluates staff based on years of service, current role, and a "performance score" (you can add this property to staff members). Use closures to create separate promotion criteria for different departments.

3. **Staff Report Generator**: Create a function that generates comprehensive reports about castle staff. Use reduce() to compile statistics like the ratio of guards to other staff, average salary by role, etc.

4. **Chain of Command**: Implement a hierarchical chain of command system where staff members report to superiors. Use object destructuring and array methods to navigate and query the chain.

5. **Inventory Management**: Add an inventory management feature to your castle, using the array methods and object manipulations we've learned. Track items, their locations, and who is responsible for them.

## 📚 Additional Resources

- [MDN Web Docs: Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN Web Docs: Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [JavaScript.info: Array Methods](https://javascript.info/array-methods)
- [MDN Web Docs: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [JavaScript.info: Rest parameters and spread syntax](https://javascript.info/rest-parameters-spread)
- [Eloquent JavaScript: Higher-Order Functions](https://eloquentjavascript.net/05_higher_order.html)

## 🏰 Castle Builder's Note

Today we've upgraded our castle with advanced JavaScript techniques that make our code more efficient, readable, and powerful. Think of these concepts as specialized construction techniques that allow our castle to have more sophisticated features. Higher-order functions are like master craftsmen who can train others, closures are like magical rooms that remember what you've stored in them, and array methods are like specialized tools for organizing our castle's people and resources.

By mastering these techniques, you're not just writing better code - you're building a more impressive and functional castle with hidden mechanisms, efficient resource management, and specialized areas that work together seamlessly.

---

**Tomorrow:** We'll explore asynchronous JavaScript and error handling, allowing our castle to communicate with the outside world through royal messengers (APIs) and handle unexpected situations gracefully. 