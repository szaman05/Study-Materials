# ZMN-ADMIN Memory System Commands

This document defines the specific commands and workflows for GitHub Copilot to interact with the ZMN-ADMIN project's memory system.

## Memory Command Format

All memory commands should use the following formats for consistency and reliability:

### Read Memory Commands

```
/recall memory                 # Recalls all stored memory
/recall entity [ENTITY_NAME]   # Recalls specific entity
/recall pattern [PATTERN_NAME] # Recalls specific pattern or preference
```

### Write Memory Commands

```
/store entity [ENTITY_NAME] [ENTITY_TYPE] [OBSERVATION]  # Create or update an entity
/store relation [FROM_ENTITY] [RELATION_TYPE] [TO_ENTITY] # Create a relationship
/store observation [ENTITY_NAME] [OBSERVATION]           # Add observation to entity
```

## Memory Workflow Protocol

1. **Start Each Task With Memory Recall**
   ```
   /recall memory
   ```
2. **Reference Memory in Responses**
   "According to stored memory, the project follows [pattern/convention]..."

3. **Update Memory After Task Completion**
   ```
   /store entity [...]
   /store relation [...]
   /store observation [...]
   ```

## Memory Entity Structure

### Code Entities

- **Components**

  ```
  /store entity [ComponentName] Component "Purpose: [purpose], Props: {[propName]: [type]}"
  ```

- **Server Actions**

  ```
  /store entity [ActionName] ServerAction "Parameters: [params], Returns: [returnType]"
  ```

- **Project Structure**

  ```
  /store entity [PatternName] ProjectPattern "[description]"
  ```

- **API Endpoints**
  ```
  /store entity [EndpointName] APIEndpoint "Method: [method], Path: [path], Purpose: [purpose]"
  ```

### User Preferences

```
/store entity [PreferenceName] UserPreference "[description]"
```

### Development Context

```
/store entity [ContextName] DevelopmentContext "[description]"
```

## Relationship Types

- **Components**

  ```
  /store relation [Component] uses [Technology]
  /store relation [Component] extends [BaseComponent]
  /store relation [Component] implements [Interface]
  ```

- **Structure**

  ```
  /store relation [Pattern] contains [Component]
  /store relation [Technology] integrates with [Technology]
  ```

- **Development**
  ```
  /store relation [Feature] depends on [Feature]
  /store relation [Component] connects to [APIEndpoint]
  ```

## Examples

### Reading Memory

```
/recall memory
```

Response should begin with: "Based on stored memory, I can see that..."

### Creating New Memory

```
/store entity AuthFlow Feature "Authentication flow with sign-in and sign-up forms"
/store relation AuthFlow uses Appwrite
/store observation AuthFlow "Uses server actions for form submission"
```

## Memory Usage Best Practices

1. Always recall relevant memory before answering questions
2. Reference specific entities and patterns from memory
3. Update memory after implementing new features or changes
4. Document user preferences explicitly when expressed
5. Maintain consistent entity naming conventions

This memory system serves as the foundation for maintaining continuity and consistency in the ZMN-ADMIN project's development.
