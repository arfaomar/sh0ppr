# **sh0ppr**

A modern, user-friendly shopping list management app powered by **Next.js v14.2.18** with **App Router**, **Drizzle ORM**, and **PostgreSQL**. Organize your shopping, export lists to PDFs, and visually enhance your articles with images fetched from the Pixabay API.
<br></br>
<br></br>
<br></br>
**FWE-WS-24-25-1112678**

---

## **Table of Contents**
1. [Overview](#overview)
2. [Features](#features)
3. [Freestyle Features](#freestyle-features)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Database Setup](#database-setup)
    - [Running the Application](#running-the-application)
    - [Other Useful Commands](#other-useful-commands)
5. [REST API Reference](#rest-api-reference)
6. [Testing](#testing)
7. [Database structure](#database-structure)

---

## **Overview**

**sh0ppr** is a shopping list management application made using **Next.js** `v14.2.18`(App Router), **Drizzle ORM** for database abstraction, and **PostgreSQL** for data storage.
sh0ppr users can:
- Create, edit, and delete shopping lists.
- Add, edit, and delete articles within lists.
- Export shopping lists to PDFs.
- Enhance lists visually with images fetched dynamically using the Pixabay API.

The app's clean interface ensures an intuitive experience with light/dark mode support and is built with modern web technologies.

---

## **Features**

### **Core Features**
- **Shopping List Management**:
    - CRUD (Create, Read, Update, Delete) operations for shopping lists.
- **Article Management**:
    - CRUD operations for articles and articles within shopping lists.
- **Search Functionality**:
    - Find shopping lists by name, description, or article name.
- **Light/Dark Mode**:
    - Seamlessly toggle between light and dark themes.

---

## **Freestyle Features**

### 1. **PDF Export**
- **Description**: Generate shopping lists as PDF files for offline sharing.
- **Technology Used**: [React-PDF](https://react-pdf.org/) is used to create high-quality, formatted PDFs.

### 2. **Pixabay API Integration**
- **Description**: Fetch images for articles based on their names to enhance the user experience.
- **Technology Used**: [Pixabay API](https://pixabay.com/api/docs/) for real-time image retrieval.

---

## **Getting Started**

### **Prerequisites**
Before starting, ensure the following are installed:
- **Node.js** (Latest LTS version)
- **npm**
- **Docker** (required for database setup)

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### **Database Setup**
1. Create a `.env.local` file in the root directory and configure it using the `.env.example` as a reference.
2. Start the PostgreSQL container:
   ```bash
   docker-compose --env-file ./.env.local up -d
   ```
3. Apply the database schema:
   ```bash
   npx drizzle-kit push
   ```

### **Running the Application**
1. Build the application (Note: Ignore warnings about a missing custom 404 page):
    ```bash
   next build
   ```
   or
   ```bash
   npm run build
   ```
2. Start the application:
   ```bash
   next start
   ```
    or
    ```bash
   node .next/standalone/server.js
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### **Other Useful Commands**
- Start DB Container:
  ```bash
  docker start postgres_db
  ```
- Stop DB Container:
  ```bash
  docker stop postgres_db
  ```
- Remove DB Container:
  ```bash
  docker-compose down --remove-orphans
  ```
- Run in Development Mode:
    ```bash
    npm run dev
    ```
---

## **REST API Reference**

### **Article Routes**
- `GET /api/article/`: Retrieve all articles.
- `POST /api/article/`: Create a new article.
- `GET /api/article/:id`: Retrieve an article by ID.
- `PATCH /api/article/:id`: Update an article by ID.
- `DELETE /api/article/:id`: Delete an article by ID.

### **Shopping List Routes**
- `GET /api/shoppinglist/`: Retrieve all shopping lists.
- `POST /api/shoppinglist/`: Create a new shopping list.
- `GET /api/shoppinglist/:uuid`: Retrieve a shopping list by UUID.
- `PATCH /api/shoppinglist/:uuid`: Update a shopping list by UUID.
- `DELETE /api/shoppinglist/:uuid`: Delete a shopping list by UUID.

### **Shopping List Article Routes**
- `GET /api/shoppinglist/:uuid/articles`: Retrieve articles in a shopping list.
- `POST /api/shoppinglist/:uuid/articles`: Add an article to a shopping list.
- `DELETE /api/shoppinglist/:uuid/articles/:id`: Remove an article from a shopping list.

For detailed API documentation, visit `/api-doc` after starting the application.

---

## **Testing**

### **Automated API Testing**
1. Install dependencies:
   ```bash
   sudo apt install curl jq
   ```
2. Execute the provided `api_test.sh` script:
   ```bash
   ./api_test.sh
   ```

### **Manual Testing**
- Use **Postman** or **cURL** to test API endpoints.
- Verify CRUD operations for shopping lists and articles.

---

## Database structure

```plantuml
entity shopping_list {
    * UUID id
    varchar(50) name
    varchar(50) description
    timestamp creation_date [default now]
}

entity article {
    * serial id
    varchar(50) name
    varchar(50) description
}

entity article_in_shopping_list {
    # UUID shopping_list_id [FK -> ShoppingList.id]
    # integer article_id [FK -> Article.id]
    smallint amount [CHECK > 0]
    boolean status [default false]
}

shopping_list "1" --> "0..*" article_in_shopping_list : contains
article "1" --> "0..*" article_in_shopping_list : linked to
```