# Section 3: Project Architecture - Freelance Marketplace

This section details the architecture of our microservices-based freelance marketplace application. It covers the structure, communication flow, design decisions, functional and non-functional requirements, and other essential aspects that guide the development process.

## 1. Application Overview

We are building a freelance marketplace where:

-   **Sellers** can create gigs.
-   **Buyers** can purchase gigs or custom gigs.
-   Users start as buyers and can opt to become sellers.
-   Communication between buyers and sellers is facilitated.

*Note: We will focus on essential features for learning purposes, not every feature of a full-fledged marketplace.*

**Detailed Explanation:** [Project Description](./11.%20Project%20description.md)

## 2. Functional Requirements

Functional requirements define the specific features, behaviors, and capabilities that the system must possess.

-   **User Authentication**: Users can create accounts, log in, and reset passwords.
-   **User Profiles**: Users start as buyers and can create a seller's profile. Users can update their profiles.
-   **Search and Filters**: Buyers can search for gigs and sellers by name or username.
-   **Messaging System**: Facilitates communication between buyers and sellers.
-   **Ratings and Reviews**: Buyers can review sellers after job completion. Sellers can review buyers.
-   **Payment Gateway**: Sellers can use different payment options (initially Stripe).
-   **View Orders**: Buyers and sellers can view active, completed, or canceled gigs.
-   **Order Cancellation**: Only sellers can cancel orders; buyers must request cancellation through messaging.

**Detailed Explanation:** [Functional Requirements](./12.%20Functional%20requirements.md)

## 3. Non-Functional Requirements

Non-functional requirements describe how the system should perform, focusing on quality attributes and constraints.

-   **Scalability**: The system should scale to accommodate increased load during peak times.
-   **Availability**: The system should be available 99.99% of the time.
-   **Reliability**: The system should be dependable and handle multiple requests.
-   **Maintainability**: Code should follow standards and be well-documented.
-   **Usability**: The system should be easy to use with minimal loading time.

**Detailed Explanation:** [Non-Functional Requirements](./13.%20Non-functional%20requirements.md)

## 4. Design Decisions

Key design decisions made for building our microservices:

-   **API Gateway**: All client requests go through the API gateway for security. Communication is HTTP-based with synchronous request-response and real-time communication using Socket.IO.
-   **Inter-Process Communication**: Event-driven communication between microservices using RabbitMQ. No direct HTTP requests between services.
-   **Token Management**: JSON Web Tokens (JWT) are generated and managed by the API gateway (except for the auth service, which generates tokens but doesn't store them).
-   **Service Accessibility**: Microservices, except the API gateway, are not accessible from outside for security reasons.
-   **Error Handling**: Client errors are sent to the API gateway, while server errors are logged to Elasticsearch and monitored via Kibana.

**Detailed Explanation:** [Design Decisions](./14.%20Design%20decisions.md)

## 5. Project Architecture

The project architecture includes the following key components:

-   **Client**: Mobile or web application communicating with the API gateway.
-   **API Gateway**: Central point for all client requests, managing communication with microservices.
-   **Elasticsearch and Kibana**: Elasticsearch stores gig and log data; Kibana provides a visualization dashboard.
-   **RabbitMQ**: Used for event-driven communication between microservices.
-   **Microservices**:
    -   Notification Service: Handles sending emails.
    -   Auth Service: Manages user authentication (MySQL).
    -   User Service: Manages profiles (MongoDB, Redis).
    -   Gig Service: Handles CRUD operations for gigs (Elasticsearch, MongoDB).
    -   Chat Service: Manages messaging (MongoDB).
    -   Order Service: Manages orders and payments (MongoDB).
    -   Review Service: Manages reviews and ratings (PostgreSQL).

**Detailed Explanation:** [Project Architecture](./15.%20Project%20architecture.md)

## 6. Inter-Process Communication

-   **Client to API Gateway**: HTTP/HTTPS and Socket.IO.
-   **API Gateway to Microservices**: HTTP/HTTPS.
-   **Microservices to Microservices**: Event-driven communication with RabbitMQ.

**Event Flow:**

-   Notification Service: Receives events from Auth, Order, and Chat services.
-   Auth Service: Sends events to Notification and User services.
-   User Service: Sends events to Gig service; receives events from Auth, Order, Gig, and Review services.
-   Gig Service: Sends events to User service; receives events from User service.
-   Chat Service: Sends events to Notification service.
-   Order Service: Sends events to User and Notification services; receives events from Review service.
-   Review Service: Sends events to User and Order services.

**Detailed Explanation:** [Inter-Process Communication](./16.%20Inter-process%20communication.md)
