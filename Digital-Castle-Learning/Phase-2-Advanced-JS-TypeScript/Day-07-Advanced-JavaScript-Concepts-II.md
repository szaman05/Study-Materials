# Day 7: Advanced JavaScript Concepts - Part II

> **Castle Metaphor**: Today we're adding a magical communication system to our castle. If our previous JavaScript work was about building the castle itself, asynchronous JavaScript is like sending royal messengers to distant lands and patiently waiting for their return. We'll also learn how to handle unexpected threats (errors) and establish diplomatic relations with other kingdoms (APIs).

## 🎯 Learning Objectives

By the end of today, you'll be able to:
- Understand asynchronous JavaScript and its importance
- Work with Promises to handle asynchronous operations
- Use async/await for cleaner asynchronous code
- Implement proper error handling with try/catch
- Fetch data from external APIs
- Create a message system that communicates with external services

## 🔑 Key Concepts

### Asynchronous JavaScript

JavaScript is single-threaded, meaning it can only execute one operation at a time. However, many operations in web development take time to complete, such as:

- Fetching data from a server
- Loading files
- Waiting for user input
- Timed operations

Asynchronous programming allows JavaScript to perform these time-consuming tasks without blocking the main thread, keeping your castle responsive and efficient.

#### Synchronous vs. Asynchronous

```javascript
// Synchronous code (blocking)
console.log("The king enters the throne room.");
// This function would block everything until it completes
const royalDecree = getRoyalDecreeSync(); // Imagine this takes 5 seconds
console.log("The decree is announced:", royalDecree);
console.log("The audience reacts.");

// Asynchronous code (non-blocking)
console.log("The king enters the throne room.");
// This runs in the background and won't block the next lines
getRoyalDecreeAsync().then(decree => {
    console.log("The decree is announced:", decree);
});
console.log("The audience waits for the decree.");
```

In the synchronous example, the entire castle would freeze for 5 seconds while waiting for the royal decree. In the asynchronous example, the audience can continue to wait while the decree is being prepared.

### Callbacks and Callback Hell

Before Promises, asynchronous operations were handled with callbacks - functions passed as arguments to be executed later.

```javascript
// Simple callback example
sendMessageToKnight("Prepare for battle", (response) => {
    console.log("Knight's response:", response);
});

// This can lead to "callback hell" when operations depend on each other
sendMessageToKing("Request for supplies", (kingsResponse) => {
    console.log("King says:", kingsResponse);
    
    if (kingsResponse === "Approved") {
        sendMessageToSteward("Prepare supplies", (stewardResponse) => {
            console.log("Steward says:", stewardResponse);
            
            sendMessageToServants("Deliver supplies", (servantsResponse) => {
                console.log("Servants say:", servantsResponse);
                
                // This nesting gets unwieldy quickly...
                sendMessageToKnight("Supplies are on the way", (knightResponse) => {
                    console.log("Knight says:", knightResponse);
                });
            });
        });
    }
});
```

This "callback hell" or "pyramid of doom" makes code hard to read and maintain. Promises help solve this problem.

### Promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation. It can be in one of three states:

- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: The operation completed successfully
- **Rejected**: The operation failed

```javascript
// Creating a Promise
function sendRoyalMessage(recipient, message) {
    return new Promise((resolve, reject) => {
        // Simulating message delivery with setTimeout
        setTimeout(() => {
            // 90% chance of success
            if (Math.random() > 0.1) {
                resolve(`Message to ${recipient} delivered: "${message}"`);
            } else {
                reject(`Failed to deliver message to ${recipient}`);
            }
        }, 1000); // Takes 1 second
    });
}

// Using the Promise
sendRoyalMessage("Duke of Northshire", "You are invited to the royal ball")
    .then(result => {
        console.log("Success:", result);
        // This will run if the message is delivered
    })
    .catch(error => {
        console.error("Error:", error);
        // This will run if the message fails to deliver
    })
    .finally(() => {
        console.log("Messenger has returned to the castle");
        // This will run regardless of success or failure
    });
```

#### Promise Chaining

Promises can be chained to handle sequences of asynchronous operations:

```javascript
// A sequence of royal messages
sendRoyalMessage("Royal Guard", "Prepare the escort")
    .then(result => {
        console.log(result);
        return sendRoyalMessage("Stable Master", "Prepare the royal carriage");
    })
    .then(result => {
        console.log(result);
        return sendRoyalMessage("Court Advisor", "Prepare diplomatic documents");
    })
    .then(result => {
        console.log(result);
        return "All preparations complete";
    })
    .then(finalResult => {
        console.log("Final status:", finalResult);
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });
```

#### Promise.all and Promise.race

`Promise.all` allows you to run multiple Promises in parallel and wait for all of them to complete:

```javascript
// Send messages to multiple recipients simultaneously
const messagePromises = [
    sendRoyalMessage("General", "Mobilize the troops"),
    sendRoyalMessage("Chancellor", "Prepare the treasury"),
    sendRoyalMessage("Archbishop", "Schedule a blessing ceremony")
];

Promise.all(messagePromises)
    .then(results => {
        console.log("All messages delivered successfully:");
        results.forEach(result => console.log(`- ${result}`));
        console.log("The royal plan can proceed.");
    })
    .catch(error => {
        console.error("One or more messages failed:", error);
        console.log("The royal plan is delayed.");
    });
```

`Promise.race` resolves or rejects as soon as one of the promises resolves or rejects:

```javascript
// Send messages to multiple scouts and use the first response
const scoutPromises = [
    sendRoyalMessage("Northern Scout", "Report enemy movements")
        .then(() => "Enemies approaching from the North"),
    sendRoyalMessage("Eastern Scout", "Report enemy movements")
        .then(() => "No enemies in the East"),
    sendRoyalMessage("Western Scout", "Report enemy movements")
        .then(() => "Small enemy group in the West")
];

Promise.race(scoutPromises)
    .then(firstReport => {
        console.log("First scout report received:", firstReport);
        console.log("Taking immediate action based on this report");
    })
    .catch(error => {
        console.error("Error receiving scout reports:", error);
    });
```

### Async/Await

Async/await is syntactic sugar on top of Promises, making asynchronous code look and behave more like synchronous code.

```javascript
// Function declaration with async
async function organizeBanquet() {
    try {
        // await pauses execution until the Promise resolves
        const kitchenResponse = await sendRoyalMessage("Head Chef", "Prepare the feast");
        console.log(kitchenResponse);
        
        const servantResponse = await sendRoyalMessage("Head Servant", "Decorate the great hall");
        console.log(servantResponse);
        
        const minstrelResponse = await sendRoyalMessage("Court Minstrel", "Prepare entertainment");
        console.log(minstrelResponse);
        
        return "Banquet preparations complete!";
    } catch (error) {
        console.error("Banquet preparation failed:", error);
        return "Banquet cancelled due to preparation issues";
    }
}

// Using the async function
organizeBanquet().then(result => {
    console.log(result);
    console.log("The King is pleased.");
});
```

#### Async with Arrow Functions

```javascript
// Arrow function with async
const summonAdvisors = async () => {
    try {
        const advisors = ["Wizard", "General", "Treasurer", "Diplomat"];
        
        // Using map with async/await and Promise.all for parallel execution
        const responses = await Promise.all(
            advisors.map(advisor => sendRoyalMessage(advisor, "Attend the council meeting"))
        );
        
        responses.forEach(response => console.log(response));
        return "All advisors have been summoned";
    } catch (error) {
        console.error("Failed to summon all advisors:", error);
        throw new Error("Council meeting cannot proceed");
    }
};
```

### Error Handling

Proper error handling is crucial for building robust applications.

#### try/catch Statements

The `try/catch` statement allows you to test a block of code for errors and handle them gracefully:

```javascript
function divideKingdomTreasure(gold, regions) {
    try {
        if (typeof gold !== 'number' || typeof regions !== 'number') {
            throw new TypeError("Both gold and regions must be numbers");
        }
        
        if (regions === 0) {
            throw new Error("Cannot divide by zero regions");
        }
        
        if (gold < 0 || regions < 0) {
            throw new RangeError("Gold and regions must be positive numbers");
        }
        
        return gold / regions;
    } catch (error) {
        if (error instanceof TypeError) {
            console.error("Type Error:", error.message);
            return "Invalid input types";
        } else if (error instanceof RangeError) {
            console.error("Range Error:", error.message);
            return "Values out of acceptable range";
        } else {
            console.error("General Error:", error.message);
            return "Failed to divide treasure";
        }
    } finally {
        console.log("Treasure calculation attempt completed");
    }
}

console.log(divideKingdomTreasure(1000, 5)); // 200
console.log(divideKingdomTreasure(1000, 0)); // "Failed to divide treasure"
console.log(divideKingdomTreasure("lots", 5)); // "Invalid input types"
```

#### Error Types

JavaScript has several built-in error types:

- **Error**: Generic error
- **SyntaxError**: Error in JavaScript syntax
- **TypeError**: Value is not of the expected type
- **ReferenceError**: Reference to a non-existent variable
- **RangeError**: Number outside the acceptable range
- **URIError**: Error in encoding/decoding URIs

```javascript
// Custom error types
class KingdomError extends Error {
    constructor(message) {
        super(message);
        this.name = "KingdomError";
    }
}

class ResourceShortageError extends KingdomError {
    constructor(resource) {
        super(`The kingdom is experiencing a shortage of ${resource}`);
        this.resource = resource;
    }
}

try {
    const goldReserves = 50;
    if (goldReserves < 100) {
        throw new ResourceShortageError("gold");
    }
} catch (error) {
    if (error instanceof ResourceShortageError) {
        console.error(`${error.name}: ${error.message}`);
        console.log(`Emergency action: Mining operations increased for ${error.resource}`);
    } else {
        console.error("Unknown error:", error);
    }
}
```

### Working with APIs using Fetch

The Fetch API provides an interface for fetching resources across the network, essentially sending messengers to other kingdoms.

#### Basic Fetch Request

```javascript
// Basic GET request
fetch('https://api.example.com/kingdoms')
    .then(response => {
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        console.log("Kingdoms data:", data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
```

#### Fetch with Options

```javascript
// POST request with options
const newKingdom = {
    name: "Camelot",
    ruler: "King Arthur",
    population: 50000,
    military: {
        knights: 200,
        soldiers: 5000
    }
};

fetch('https://api.example.com/kingdoms', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer royal_token_123'
    },
    body: JSON.stringify(newKingdom)
})
.then(response => response.json())
.then(data => {
    console.log("Kingdom created:", data);
})
.catch(error => {
    console.error("Failed to create kingdom:", error);
});
```

#### Async/Await with Fetch

```javascript
async function getKingdomResources(kingdomId) {
    try {
        const response = await fetch(`https://api.example.com/kingdoms/${kingdomId}/resources`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to get resources for kingdom ${kingdomId}:`, error);
        throw error; // Re-throw to let the caller handle it
    }
}

// Using the function
getKingdomResources('camelot')
    .then(resources => {
        console.log("Camelot resources:", resources);
        
        if (resources.gold < 1000) {
            console.log("Gold reserves are low. Increase taxation.");
        }
        
        if (resources.food < 5000) {
            console.log("Food supplies are low. Increase farming.");
        }
    })
    .catch(error => {
        console.error("Resource management error:", error);
    });
```

## 💪 Practical Exercise: Castle Messenger System

Let's build a castle messenger system that sends messages to different parts of your kingdom and receives responses.

### Step 1: Set Up the Messenger System

```javascript
// Helper function to simulate network delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Create the messenger system
class CastleMessenger {
    constructor() {
        // Map of locations and their message handlers
        this.locations = new Map();
        
        // Message log
        this.messageLog = [];
        
        // Register default locations
        this.registerLocation("Throne Room", message => {
            if (message.includes("urgent")) {
                return "The King will address this immediately!";
            } else {
                return "The King acknowledges your message.";
            }
        });
        
        this.registerLocation("Kitchen", message => {
            if (message.includes("feast") || message.includes("food")) {
                return "The feast preparations will begin at once!";
            } else {
                return "The Head Chef is currently busy.";
            }
        });
        
        this.registerLocation("Barracks", message => {
            if (message.includes("attack") || message.includes("defend")) {
                return "The army is mobilizing immediately!";
            } else {
                return "The General will review your request.";
            }
        });
    }
    
    // Register a new location with its message handler
    registerLocation(locationName, responseHandler) {
        this.locations.set(locationName, responseHandler);
    }
    
    // Send a message to a location
    async sendMessage(targetLocation, message, priority = "normal") {
        // Log the outgoing message
        const outgoingMessage = {
            id: this.messageLog.length + 1,
            timestamp: new Date().toISOString(),
            direction: "outgoing",
            targetLocation,
            message,
            priority
        };
        
        this.messageLog.push(outgoingMessage);
        
        try {
            // Check if the location exists
            if (!this.locations.has(targetLocation)) {
                throw new Error(`Unknown location: ${targetLocation}`);
            }
            
            // Simulate network delay based on priority
            const delayTime = priority === "urgent" ? 500 : 2000;
            await delay(delayTime);
            
            // Get the response handler for this location
            const responseHandler = this.locations.get(targetLocation);
            
            // Get the response
            const responseText = responseHandler(message);
            
            // Log the incoming response
            const response = {
                id: this.messageLog.length + 1,
                timestamp: new Date().toISOString(),
                direction: "incoming",
                sourceLocation: targetLocation,
                message: responseText,
                inResponseTo: outgoingMessage.id
            };
            
            this.messageLog.push(response);
            
            return {
                success: true,
                messageId: outgoingMessage.id,
                responseId: response.id,
                response: responseText
            };
        } catch (error) {
            // Log the error
            const errorLog = {
                id: this.messageLog.length + 1,
                timestamp: new Date().toISOString(),
                direction: "error",
                targetLocation,
                originalMessage: message,
                error: error.message
            };
            
            this.messageLog.push(errorLog);
            
            return {
                success: false,
                messageId: outgoingMessage.id,
                error: error.message
            };
        }
    }
    
    // Get message history
    getMessageHistory(count = 10) {
        return this.messageLog.slice(-count);
    }
    
    // Get message history for a specific location
    getLocationHistory(locationName, count = 10) {
        return this.messageLog
            .filter(msg => 
                msg.targetLocation === locationName || 
                msg.sourceLocation === locationName
            )
            .slice(-count);
    }
}
```

### Step 2: Extend the Messenger System with External Communication

```javascript
// Add external API communication capabilities
class EnhancedCastleMessenger extends CastleMessenger {
    constructor(apiKey = null) {
        super();
        this.apiKey = apiKey;
        
        // Register diplomatic channels
        this.registerLocation("Diplomatic Channel", message => {
            return "Your diplomatic request has been received.";
        });
    }
    
    // Send message to external kingdom API
    async sendDiplomaticMessage(kingdom, message) {
        try {
            console.log(`Sending diplomatic message to ${kingdom}: "${message}"`);
            
            // In a real application, you would use fetch here
            // For this exercise, we'll simulate a response
            await delay(3000); // Diplomatic messages take longer
            
            let response;
            if (kingdom === "Northland") {
                response = "Northland appreciates your message and offers an alliance.";
            } else if (kingdom === "Eastern Empire") {
                response = "The Eastern Empire acknowledges your communication.";
            } else if (kingdom === "Southern Isles") {
                response = "The Southern Isles wish to establish a trade agreement.";
            } else {
                response = "The kingdom has received your message.";
            }
            
            // Log both the outgoing and incoming diplomatic messages
            this.messageLog.push({
                id: this.messageLog.length + 1,
                timestamp: new Date().toISOString(),
                direction: "outgoing",
                targetLocation: `Kingdom of ${kingdom}`,
                message,
                diplomatic: true
            });
            
            this.messageLog.push({
                id: this.messageLog.length + 1,
                timestamp: new Date().toISOString(),
                direction: "incoming",
                sourceLocation: `Kingdom of ${kingdom}`,
                message: response,
                diplomatic: true
            });
            
            return {
                success: true,
                kingdom,
                response
            };
        } catch (error) {
            console.error(`Diplomatic error with ${kingdom}:`, error);
            
            this.messageLog.push({
                id: this.messageLog.length + 1,
                timestamp: new Date().toISOString(),
                direction: "error",
                targetLocation: `Kingdom of ${kingdom}`,
                message,
                error: error.message,
                diplomatic: true
            });
            
            return {
                success: false,
                kingdom,
                error: error.message
            };
        }
    }
    
    // Fetch weather information for the kingdom
    async getKingdomWeather() {
        try {
            console.log("Fetching kingdom weather...");
            
            // In a real app, you would use fetch with a real weather API like:
            // const response = await fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=YourCastle');
            
            // For this exercise, we'll simulate a response
            await delay(1500);
            
            const weatherConditions = [
                "Sunny and clear", "Partly cloudy", "Heavy rain", 
                "Thunderstorms", "Foggy", "Light snow", "Windy"
            ];
            
            const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
            const temperature = Math.floor(Math.random() * 30) + 5; // 5 to 35
            
            const weatherData = {
                condition: randomCondition,
                temperature: temperature,
                timestamp: new Date().toISOString()
            };
            
            this.messageLog.push({
                id: this.messageLog.length + 1,
                timestamp: new Date().toISOString(),
                direction: "incoming",
                sourceLocation: "Weather Tower",
                message: `Current weather: ${randomCondition}, ${temperature}°C`,
                systemMessage: true
            });
            
            return {
                success: true,
                weather: weatherData
            };
        } catch (error) {
            console.error("Weather fetch error:", error);
            
            this.messageLog.push({
                id: this.messageLog.length + 1,
                timestamp: new Date().toISOString(),
                direction: "error",
                sourceLocation: "Weather Tower",
                error: error.message,
                systemMessage: true
            });
            
            return {
                success: false,
                error: error.message
            };
        }
    }
}
```

### Step 3: Use the Messenger System with Async/Await

```javascript
// Using the messenger system with async/await
async function runCastleOperations() {
    try {
        // Create a new messenger
        const messenger = new EnhancedCastleMessenger("your_api_key");
        
        // Add custom location
        messenger.registerLocation("Royal Library", message => {
            if (message.includes("research")) {
                return "The scholars are looking into this matter.";
            } else {
                return "The Royal Librarian has noted your request.";
            }
        });
        
        console.log("Castle messenger system initialized!");
        
        // Send an urgent message to the Throne Room
        console.log("Sending urgent message to the Throne Room...");
        const throneRoomResponse = await messenger.sendMessage(
            "Throne Room",
            "Enemy forces spotted near the northern border! This is urgent!",
            "urgent"
        );
        console.log("Response:", throneRoomResponse.response);
        
        // Send a message to the Kitchen
        console.log("\nSending message to the Kitchen...");
        const kitchenResponse = await messenger.sendMessage(
            "Kitchen",
            "Prepare a feast for 100 guests tomorrow evening."
        );
        console.log("Response:", kitchenResponse.response);
        
        // Send a message to the Barracks
        console.log("\nSending message to the Barracks...");
        const barracksResponse = await messenger.sendMessage(
            "Barracks",
            "Prepare defenses along the northern wall."
        );
        console.log("Response:", barracksResponse.response);
        
        // Send a message to the Royal Library
        console.log("\nSending message to the Royal Library...");
        const libraryResponse = await messenger.sendMessage(
            "Royal Library",
            "Research ancient defensive strategies for castle sieges."
        );
        console.log("Response:", libraryResponse.response);
        
        // Use Promise.all to send multiple messages at once
        console.log("\nSending multiple messages simultaneously...");
        const messagePromises = [
            messenger.sendMessage("Throne Room", "Daily report: All is well in the kingdom."),
            messenger.sendMessage("Kitchen", "The King requests his favorite dessert tonight."),
            messenger.sendMessage("Barracks", "Schedule training for new recruits.")
        ];
        
        const messageResponses = await Promise.all(messagePromises);
        messageResponses.forEach(response => {
            console.log(`- Response: ${response.response}`);
        });
        
        // Send a diplomatic message
        console.log("\nSending diplomatic message to Northland...");
        const diplomaticResponse = await messenger.sendDiplomaticMessage(
            "Northland",
            "We propose a trade agreement between our kingdoms."
        );
        console.log("Diplomatic response:", diplomaticResponse.response);
        
        // Check the weather
        console.log("\nChecking kingdom weather...");
        const weather = await messenger.getKingdomWeather();
        console.log(`Current weather: ${weather.weather.condition}, ${weather.weather.temperature}°C`);
        
        // Get message history
        console.log("\nRecent message history:");
        const history = messenger.getMessageHistory(5);
        history.forEach(msg => {
            const direction = msg.direction.padEnd(8);
            const location = (msg.targetLocation || msg.sourceLocation).padEnd(15);
            console.log(`[${direction}] ${location} | ${msg.message}`);
        });
        
        console.log("\nCastle operations completed successfully!");
    } catch (error) {
        console.error("Error in castle operations:", error);
    }
}

// Run the castle operations
runCastleOperations();
```

## 🔍 Challenge Tasks

1. **Error Recovery System**: Enhance the messenger system to automatically retry failed messages up to 3 times, with increasing delays between attempts.

2. **Message Priority Queue**: Implement a priority queue for messages, ensuring that "urgent" messages are always processed before "normal" ones, even if they were sent later.

3. **Inter-Kingdom Treaty System**: Create a system that negotiates treaties with other kingdoms through a series of diplomatic message exchanges, handling different response scenarios.

4. **Royal Alert System**: Implement a system that monitors various castle metrics (using simulated data or a real API) and sends alerts to the appropriate castle staff when thresholds are exceeded.

5. **Scheduled Messages**: Add functionality to schedule messages to be sent at specific times in the future, using JavaScript's timing functions and Promises.

## 📚 Additional Resources

- [MDN Web Docs: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [MDN Web Docs: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN Web Docs: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN Web Docs: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JavaScript.info: Promises, async/await](https://javascript.info/async)
- [JavaScript.info: Error handling with promises](https://javascript.info/promise-error-handling)
- [Eloquent JavaScript: Asynchronous Programming](https://eloquentjavascript.net/11_async.html)

## 🏰 Castle Builder's Note

Today we've implemented a magical communication system for our castle, allowing it to send messengers to distant lands and receive valuable information. Just as a real castle needs to coordinate with allies, gather intelligence, and respond to threats, our digital castle now has the ability to communicate asynchronously with other systems.

Asynchronous JavaScript might seem complex at first, but it's an essential skill for any web developer. With Promises and async/await, you can write clean, efficient code that handles time-consuming operations without freezing your entire application. This makes your castle more responsive and capable of handling multiple tasks simultaneously.

Error handling is equally important - every good castle has contingency plans for when things go wrong. By properly catching and handling errors, you ensure that your castle can gracefully recover from unexpected situations.

---

**Tomorrow:** We'll explore JavaScript modules and development tools, helping us organize our castle into manageable, specialized sections that work together harmoniously. 