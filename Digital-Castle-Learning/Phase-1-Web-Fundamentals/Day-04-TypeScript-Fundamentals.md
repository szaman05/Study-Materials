# Day 4: TypeScript Fundamentals

> **Castle Metaphor**: Today we begin adding magical blueprints to our castle. If HTML is the structure and CSS is the appearance, TypeScript is the enchanted planning system that ensures every component of our castle is precisely specified, preventing structural issues before construction even begins. These magical blueprints add an extra layer of safety and clarity to our castle's design.

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Understand what TypeScript is and its advantages over JavaScript
- Set up a TypeScript development environment
- Work with basic TypeScript types and type annotations
- Create and use interfaces to define object shapes
- Convert JavaScript code to TypeScript
- Compile TypeScript code to JavaScript
- Add basic type safety to your castle components

## 🔑 Key Concepts

### What is TypeScript?

TypeScript is a strongly typed programming language that builds on JavaScript. It adds static types to JavaScript, helping you detect errors early in your development process rather than at runtime. TypeScript code is transformed (compiled) into JavaScript code before it runs in the browser.

Key advantages of TypeScript:
- **Type Safety**: Catch type-related errors during development
- **Better Tooling**: Enhanced code completion, navigation, and refactoring
- **Self-Documenting Code**: Types serve as documentation
- **Enhanced Readability**: Types make code intent clearer
- **Modern JavaScript Features**: Use latest JavaScript features that work across browsers

### Setting Up TypeScript

To start using TypeScript, you need to install it and set up a basic project:

```bash
# Install TypeScript globally
npm install -g typescript

# Create a new directory for your TypeScript project
mkdir my-typescript-castle
cd my-typescript-castle

# Initialize a new package.json file
npm init -y

# Install TypeScript locally for your project
npm install --save-dev typescript

# Create a TypeScript configuration file
npx tsc --init
```

This creates a `tsconfig.json` file that configures how TypeScript compiles your code:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Basic TypeScript Types

TypeScript introduces a type system on top of JavaScript. Here are the basic types:

#### Primitive Types

```typescript
// Type annotations are added after variable names with a colon
let castleName: string = "Digital Fortress";
let towerCount: number = 4;
let hasDrawbridge: boolean = true;

// TypeScript can infer types from initialization
let moatDepth = 10; // TypeScript infers this as a number
```

#### Arrays

```typescript
// Arrays of specific types
let guardNames: string[] = ["John", "Michael", "Emily"];
let towerHeights: number[] = [50, 45, 60, 55];

// Alternative array syntax
let knightRanks: Array<number> = [1, 2, 3, 4, 5];
```

#### Tuples

Tuples are arrays with a fixed number of elements with specific types:

```typescript
// Define a tuple type for [name, age, role]
let knight: [string, number, string] = ["Sir Lancelot", 35, "Knight"];

// Access elements by index
console.log(knight[0]); // "Sir Lancelot"
console.log(knight[1]); // 35
```

#### Enums

Enums allow you to define a set of named constants:

```typescript
// Define castle areas as an enum
enum CastleArea {
  GreatHall,       // 0
  ThroneRoom,      // 1
  Kitchen,         // 2
  Courtyard,       // 3
  Dungeon          // 4
}

// Use enum values
let royalMeeting: CastleArea = CastleArea.ThroneRoom;
console.log(royalMeeting); // 1

// You can also assign custom values
enum GuardPosition {
  MainGate = "main-gate",
  TowerNorth = "tower-north",
  TowerSouth = "tower-south",
  Dungeon = "dungeon"
}

let guardPost: GuardPosition = GuardPosition.MainGate;
console.log(guardPost); // "main-gate"
```

#### Any and Unknown

When you're unsure about a type or working with dynamic content:

```typescript
// Any type (avoid when possible as it disables type checking)
let mysteriousTreasure: any = "Gold Coins";
mysteriousTreasure = 500; // OK
mysteriousTreasure = { type: "Gold", amount: 500 }; // OK

// Unknown type (safer alternative to any)
let mysteriousVisitor: unknown = "Mysterious Knight";

// You must check the type before using an unknown value
if (typeof mysteriousVisitor === "string") {
    console.log(mysteriousVisitor.toUpperCase()); // OK
}
```

#### Union Types

Union types allow a variable to have multiple types:

```typescript
// A variable that can be either a string or a number
let treasureAmount: string | number = "five chests";
treasureAmount = 5; // This is also valid

// A function that can accept different types
function displayTreasure(treasure: string | number): void {
    console.log(`The treasure is: ${treasure}`);
}

displayTreasure("Gold"); // OK
displayTreasure(1000);   // OK
```

#### Type Aliases

Type aliases create custom types for reuse:

```typescript
// Create a type alias for castle residents
type CastleResident = {
    name: string;
    role: string;
    age: number;
    yearsOfService?: number; // Optional property (note the ?)
};

// Use the type
let kingArthur: CastleResident = {
    name: "Arthur Pendragon",
    role: "King",
    age: 42
};

let sirLancelot: CastleResident = {
    name: "Lancelot",
    role: "Knight",
    age: 35,
    yearsOfService: 10
};
```

### Interfaces

Interfaces define the shape that objects must conform to:

```typescript
// Define an interface for castle rooms
interface CastleRoom {
    name: string;
    size: number;
    purpose: string;
    level: number;
    occupants?: string[]; // Optional property
}

// Create objects that implement the interface
const throneRoom: CastleRoom = {
    name: "Throne Room",
    size: 500,
    purpose: "Royal audiences and court sessions",
    level: 2,
    occupants: ["King Arthur", "Royal Guards"]
};

const kitchen: CastleRoom = {
    name: "Royal Kitchen",
    size: 300,
    purpose: "Food preparation",
    level: 1
};
```

#### Interface Extension

Interfaces can extend other interfaces:

```typescript
// Base interface for all castle staff
interface CastleStaff {
    name: string;
    role: string;
    yearsOfService: number;
}

// Extended interface for guards with additional properties
interface Guard extends CastleStaff {
    post: string;
    weapon: string;
    shift: "day" | "night"; // Union type limited to these specific strings
}

// Create an object implementing the Guard interface
const guardThomas: Guard = {
    name: "Thomas",
    role: "Guard",
    yearsOfService: 5,
    post: "Main Gate",
    weapon: "Sword",
    shift: "day"
};
```

### Functions in TypeScript

TypeScript enhances functions with parameter and return type annotations:

```typescript
// Function with parameter types and return type
function calculateTowerHeight(levels: number, levelHeight: number): number {
    return levels * levelHeight;
}

// Arrow function with types
const calculateRoomArea = (length: number, width: number): number => length * width;

// Function with optional parameter (note the ?)
function greetVisitor(name: string, title?: string): string {
    if (title) {
        return `Welcome to the castle, ${title} ${name}!`;
    }
    return `Welcome to the castle, ${name}!`;
}

// Function with default parameter value
function assignGuard(area: string, guardName: string = "Recruit"): string {
    return `${guardName} assigned to ${area}`;
}

// Function with rest parameters
function assembleKnights(leader: string, ...knights: string[]): string {
    return `${leader} leads ${knights.join(", ")}`;
}

console.log(assembleKnights("Arthur", "Lancelot", "Gawain", "Percival"));
// "Arthur leads Lancelot, Gawain, Percival"
```

#### Function Types

```typescript
// Define a function type
type GreetingFunction = (name: string) => string;

// Use the function type
let royalGreeting: GreetingFunction;
royalGreeting = (name) => `Your Majesty welcomes you, ${name}!`;

// Function that takes another function as a parameter
function executeGreeting(visitor: string, greetFn: GreetingFunction): void {
    console.log(greetFn(visitor));
}

executeGreeting("Sir Lancelot", royalGreeting);
```

### Converting JavaScript to TypeScript

To convert existing JavaScript to TypeScript:

1. Rename `.js` files to `.ts`
2. Add type annotations to variables, parameters, and return types
3. Create interfaces for object structures
4. Use union types when a variable can have multiple types
5. Gradually increase TypeScript's strictness in `tsconfig.json`

Example JavaScript code:
```javascript
// Castle staff manager in JavaScript
function createStaffManager(staff) {
    return {
        getAllStaff() {
            return [...staff];
        },
        
        getStaffByRole(role) {
            return staff.filter(member => member.role === role);
        },
        
        addStaffMember(member) {
            staff.push(member);
            return member;
        }
    };
}

const castleStaff = [
    { name: "Thomas", role: "Guard", age: 30 },
    { name: "Eleanor", role: "Cook", age: 45 },
    { name: "Marcus", role: "Stable Master", age: 50 }
];

const staffManager = createStaffManager(castleStaff);
```

Converted to TypeScript:
```typescript
// Define the staff member interface
interface StaffMember {
    name: string;
    role: string;
    age: number;
    yearsOfService?: number;
}

// Define the staff manager interface
interface StaffManager {
    getAllStaff(): StaffMember[];
    getStaffByRole(role: string): StaffMember[];
    addStaffMember(member: StaffMember): StaffMember;
}

// Castle staff manager in TypeScript
function createStaffManager(staff: StaffMember[]): StaffManager {
    return {
        getAllStaff(): StaffMember[] {
            return [...staff];
        },
        
        getStaffByRole(role: string): StaffMember[] {
            return staff.filter(member => member.role === role);
        },
        
        addStaffMember(member: StaffMember): StaffMember {
            staff.push(member);
            return member;
        }
    };
}

const castleStaff: StaffMember[] = [
    { name: "Thomas", role: "Guard", age: 30 },
    { name: "Eleanor", role: "Cook", age: 45 },
    { name: "Marcus", role: "Stable Master", age: 50 }
];

const staffManager: StaffManager = createStaffManager(castleStaff);
```

### Compiling TypeScript

To compile TypeScript to JavaScript, use the TypeScript compiler (`tsc`):

```bash
# Compile a single file
tsc filename.ts

# Compile the entire project based on tsconfig.json
tsc

# Compile in watch mode (automatically recompile when files change)
tsc --watch
```

## 💪 Practical Exercise: Castle Staff Registry with TypeScript

Let's create a TypeScript application to manage the castle staff. Create a new file called `castle-staff.ts`:

```typescript
// Define the types
interface CastlePerson {
    id: number;
    name: string;
    age: number;
}

// Staff member types using union type and string literals
type StaffRole = "Guard" | "Cook" | "Servant" | "Stable Master" | "Advisor" | "Knight";

// Staff member interface extending the base person
interface StaffMember extends CastlePerson {
    role: StaffRole;
    area: string;
    yearsOfService: number;
    skills: string[];
}

// Royal family member interface extending the base person
interface RoyalFamilyMember extends CastlePerson {
    title: string;
    importance: number;
}

// Union type for all castle residents
type CastleResident = StaffMember | RoyalFamilyMember;

// Function to check if a resident is staff (type guard)
function isStaffMember(resident: CastleResident): resident is StaffMember {
    return (resident as StaffMember).role !== undefined;
}

// Castle registry class
class CastleRegistry {
    private residents: CastleResident[] = [];
    private nextId: number = 1;

    // Add a resident to the registry
    public addResident(resident: Omit<CastleResident, "id">): CastleResident {
        const newResident = { 
            ...resident,
            id: this.nextId++
        };
        this.residents.push(newResident);
        return newResident;
    }

    // Get all residents
    public getAllResidents(): CastleResident[] {
        return [...this.residents];
    }

    // Get all staff members
    public getAllStaff(): StaffMember[] {
        return this.residents.filter(isStaffMember);
    }

    // Get all royal family members
    public getAllRoyalFamily(): RoyalFamilyMember[] {
        return this.residents.filter(resident => !isStaffMember(resident)) as RoyalFamilyMember[];
    }

    // Find a resident by ID
    public findResidentById(id: number): CastleResident | undefined {
        return this.residents.find(resident => resident.id === id);
    }

    // Find staff by role
    public findStaffByRole(role: StaffRole): StaffMember[] {
        return this.getAllStaff().filter(staff => staff.role === role);
    }

    // Get staff count by area
    public getStaffCountByArea(): Record<string, number> {
        const counts: Record<string, number> = {};
        
        for (const resident of this.getAllStaff()) {
            counts[resident.area] = (counts[resident.area] || 0) + 1;
        }
        
        return counts;
    }
}

// Create a castle registry
const registry = new CastleRegistry();

// Add royal family members
registry.addResident({
    name: "Arthur",
    age: 42,
    title: "King",
    importance: 10
});

registry.addResident({
    name: "Guinevere",
    age: 38,
    title: "Queen",
    importance: 9
});

// Add staff members
registry.addResident({
    name: "Lancelot",
    age: 35,
    role: "Knight",
    area: "Royal Guard",
    yearsOfService: 10,
    skills: ["Swordfighting", "Jousting", "Horseback Riding"]
});

registry.addResident({
    name: "Eleanor",
    age: 45,
    role: "Cook",
    area: "Kitchen",
    yearsOfService: 12,
    skills: ["Cooking", "Baking", "Menu Planning"]
});

registry.addResident({
    name: "Thomas",
    age: 30,
    role: "Guard",
    area: "Main Gate",
    yearsOfService: 5,
    skills: ["Vigilance", "Swordfighting"]
});

registry.addResident({
    name: "Marcus",
    age: 50,
    role: "Stable Master",
    area: "Stables",
    yearsOfService: 20,
    skills: ["Horse Care", "Riding", "Training"]
});

// Display all residents
console.log("All Castle Residents:");
console.log(registry.getAllResidents());

// Display all staff members
console.log("\nCastle Staff:");
console.log(registry.getAllStaff());

// Display royal family
console.log("\nRoyal Family:");
console.log(registry.getAllRoyalFamily());

// Find staff by role
console.log("\nKnights:");
console.log(registry.findStaffByRole("Knight"));

// Get staff count by area
console.log("\nStaff Count by Area:");
console.log(registry.getStaffCountByArea());
```

Now compile and run your TypeScript code:

```bash
# Compile the TypeScript file
tsc castle-staff.ts

# Run the compiled JavaScript
node castle-staff.js
```

This will create a JavaScript file (`castle-staff.js`) that you can run with Node.js.

### Adding a Simple Web Interface

Let's create a simple HTML page to display our castle staff registry. Create an `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Castle Staff Registry</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        h1 {
            color: #8B4513;
            text-align: center;
        }
        .section {
            background-color: white;
            border-left: 5px solid #8B4513;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border-bottom: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .royal {
            background-color: #fff8e1;
        }
        .staff {
            background-color: #f1f8e9;
        }
    </style>
</head>
<body>
    <h1>Castle Staff Registry</h1>
    
    <div class="section">
        <h2>Royal Family</h2>
        <table id="royal-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Title</th>
                    <th>Importance</th>
                </tr>
            </thead>
            <tbody>
                <!-- Royal family data will go here -->
            </tbody>
        </table>
    </div>
    
    <div class="section">
        <h2>Castle Staff</h2>
        <table id="staff-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Role</th>
                    <th>Area</th>
                    <th>Years of Service</th>
                    <th>Skills</th>
                </tr>
            </thead>
            <tbody>
                <!-- Staff data will go here -->
            </tbody>
        </table>
    </div>
    
    <div class="section">
        <h2>Staff Count by Area</h2>
        <div id="area-stats"></div>
    </div>

    <script src="castle-staff.js"></script>
    <script>
        // Code to display the registry data will go here
    </script>
</body>
</html>
```

Now modify the TypeScript file to interact with the HTML:

```typescript
// ... [Keep all the previous code] ...

// Display staff in the HTML (add at the end of your file)
function displayRegistryInHTML() {
    // Get the tables
    const royalTable = document.getElementById('royal-table')?.querySelector('tbody');
    const staffTable = document.getElementById('staff-table')?.querySelector('tbody');
    const areaStats = document.getElementById('area-stats');
    
    if (!royalTable || !staffTable || !areaStats) {
        console.error("Could not find tables in HTML");
        return;
    }
    
    // Clear previous content
    royalTable.innerHTML = '';
    staffTable.innerHTML = '';
    
    // Add royal family members to the table
    for (const royal of registry.getAllRoyalFamily()) {
        const row = document.createElement('tr');
        row.className = 'royal';
        row.innerHTML = `
            <td>${royal.id}</td>
            <td>${royal.name}</td>
            <td>${royal.age}</td>
            <td>${royal.title}</td>
            <td>${royal.importance}</td>
        `;
        royalTable.appendChild(row);
    }
    
    // Add staff members to the table
    for (const staff of registry.getAllStaff()) {
        const row = document.createElement('tr');
        row.className = 'staff';
        row.innerHTML = `
            <td>${staff.id}</td>
            <td>${staff.name}</td>
            <td>${staff.age}</td>
            <td>${staff.role}</td>
            <td>${staff.area}</td>
            <td>${staff.yearsOfService}</td>
            <td>${staff.skills.join(", ")}</td>
        `;
        staffTable.appendChild(row);
    }
    
    // Display area statistics
    const counts = registry.getStaffCountByArea();
    let statsHTML = '<ul>';
    
    for (const [area, count] of Object.entries(counts)) {
        statsHTML += `<li><strong>${area}:</strong> ${count} staff members</li>`;
    }
    
    statsHTML += '</ul>';
    areaStats.innerHTML = statsHTML;
}

// Call the display function when the DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', displayRegistryInHTML);
}
```

Compile the updated TypeScript file:

```bash
tsc castle-staff.ts
```

Now you can open the `index.html` file in your browser to see the castle staff registry in action!

## 🔍 Challenge Tasks

1. **Staff Search Feature**: Add a search function to the registry that allows searching for staff members by name, role, or skill.

2. **Staff Assignments**: Create a system to assign staff to specific tasks or events, ensuring that you use TypeScript interfaces to model the tasks and assignments.

3. **Royal Decrees**: Implement a system for the royal family to issue decrees that affect certain staff members based on their roles or areas.

4. **Staff Performance**: Add a performance rating system with different metrics for different roles, using TypeScript's union types and discriminated unions.

5. **Visitor Registry**: Create a separate registry for castle visitors with proper TypeScript types and interfaces, and implement a method to check if a visitor is allowed in certain castle areas.

## 📚 Additional Resources

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play) - Try TypeScript in your browser
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/) - A free online book
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Microsoft's TypeScript Courses](https://docs.microsoft.com/en-us/learn/paths/build-javascript-applications-typescript/)

## 🏰 Castle Builder's Note

Today we added magical blueprints to our castle with TypeScript! While JavaScript allows for quick construction, TypeScript adds an extra layer of safety by checking our plans before building. Think of it as having enchanted architects who can spot structural problems before construction even begins.

TypeScript might seem like extra work initially, but it pays off tremendously as your castle grows larger and more complex. The magical type system helps prevent collapsing towers and crumbling walls by ensuring that each component is built exactly to specification.

Don't worry if TypeScript feels a bit overwhelming at first. Remember that every TypeScript program is also a JavaScript program, so you can adopt TypeScript gradually, adding more type safety as you become more comfortable with it.

---

**Tomorrow:** We'll learn how to manipulate the Document Object Model (DOM) with TypeScript, adding even more safety and structure to our castle's interactive elements. 