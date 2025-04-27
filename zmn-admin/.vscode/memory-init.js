// ZMN-ADMIN Memory System Initialization Script

/**
 * This script outputs the memory system status header at the beginning of each chat
 * It should be referenced in your VS Code settings to run automatically
 */

const fs = require("fs");
const path = require("path");

function updateTimestamp() {
  try {
    // Path to the memory status file
    const statusFilePath = path.join(__dirname, "memory-init-status.md");

    // Read the current content
    let content = fs.readFileSync(statusFilePath, "utf8");

    // Replace the timestamp placeholder with current timestamp
    const now = new Date();
    const timestamp = now.toISOString().replace("T", " ").substring(0, 19);

    content = content.replace("{TIMESTAMP}", timestamp);

    // Write the updated content back to a temporary file that will be displayed
    const tempFilePath = path.join(__dirname, "memory-init-display.md");
    fs.writeFileSync(tempFilePath, content);

    // Output to console for the chat to pick up
    console.log("\n--- ZMN-ADMIN MEMORY SYSTEM INITIALIZED ---\n");
    console.log("Memory system active and ready to use.");
    console.log('Use "/recall memory" to view current project knowledge.');
    console.log("\n----------------------------------------\n");

    return true;
  } catch (error) {
    console.error("Failed to initialize memory system:", error);
    return false;
  }
}

// Run immediately when the script is executed
updateTimestamp();

module.exports = { updateTimestamp };
