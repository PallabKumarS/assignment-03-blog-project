# Blog Platform Backend

A backend system for a blogging platform where users can create, update, and delete their blogs. The platform supports two roles: Admin and User. Admins have special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Live URL

### [Live Link](https://pks-blog-assignment.vercel.app/)

## Features

- User Roles: Admin and User
  - Admin: Manage users and blogs
  - User: CRUD operations on personal blogs
- Secure Authentication and Role-Based Access Control
- Public API for reading blogs with search, sorting, and filtering functionalities
- Comprehensive Error Handling

## Technologies

- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose

## Models

### User Model

- `name`: string – The full name of the user.
- `email`: string – The email address of the user, used for authentication and communication.
- `password`: string – The password for the user, securely stored.
- `role`: "admin" | "user" – The role of the user, determining their access level. Default is "user".
- `isBlocked`: boolean – A flag indicating whether the user is blocked or not. Default is false.
- `createdAt`: Date – The timestamp when the user was created.
- `updatedAt`: Date – The timestamp of the last update to the user.

### Blog Model

- `title`: string – The title of the blog post.
- `content`: string – The main body or content of the blog post.
- `author`: ObjectId – A reference to the User model, indicating the author of the blog post.
- `isPublished`: boolean – A flag indicating whether the blog post is published. Default is true.
- `createdAt`: Date – The timestamp when the blog post was created.
- `updatedAt`: Date – The timestamp of the last update to the blog post.

## API Endpoints

### 1. Authentication

#### 1.1 Register User

- **Endpoint**: `POST /api/auth/register`
- **Description**: Registers a new user with the platform.
- **Request Body**:

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

- Response:

Success (201):

{
"success": true,
"message": "User registered successfully",
"statusCode": 201,
"data": {
"id": "string",
"name": "string",
"email": "string"
}
}

-Failure (400):

{
"success": false,
"message": "Validation error",
"statusCode": 400,
"error": { "details" },
"stack": "error stack"
}

#### 1.2 Login User

- **Endpoint** : `POST /api/auth/login`

- **Description**: Authenticates a user with their email and password and generates a JWT token.

- **Request Body** :

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

- **Response** :
- Success (200):

```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```

- Failure (401):

```json
{
  "success": false,
  "message": "Invalid credentials",
  "statusCode": 401,
  "error": { "details" },
  "stack": "error stack"
}
```

### 2. Blog Management

#### 2.1 Create Blog

- **Endpoint**: `POST /api/blogs`
- **Description**: Allows a logged-in user to create a blog by providing a title and content.
- Request Header: Authorization: Bearer <token>
- **Request Body**:

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

- **Response** :
- Success (201):

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

#### 2.2 Update Blog

- **Endpoint**: `PUT /api/blogs/:id`
- **Description**: Allows a logged-in user to update their own blog by providing a title and content.
- Request Header: Authorization: Bearer <token>
- **Request Body**:
- success (200):

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

- **Response** :
- success (200):

```json
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}
```

#### 2.3 Delete Blog

- **Endpoint**: `DELETE /api/blogs/:id`
- **Description**: Allows a logged-in user to delete their own blog.
- Request Header: Authorization: Bearer <token>
- **Response** :
- success (200):

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

#### 2.4 Get All Blogs

- **Endpoint**: `GET /api/blogs`
- **Description**: Provides a public API to fetch all blogs with options for searching, sorting, and filtering.
- **Query Parameters** :

- search: Search blogs by title or content (e.g., search=blogtitle).

- sortBy: Sort blogs by specific fields such as createdAt or title (e.g., sortBy=title).

- sortOrder: Defines the sorting order. Accepts values asc or desc (e.g., sortOrder=desc).

- filter: Filter blogs by author ID (e.g., author=authorId).

/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18

- **Response** :
- success (200):

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": { "details" }
    }
  ]
}
```

### 3 Admin Actions

#### 3.1 Block User

- **Endpoint**: `PUT /api/admin/:userId/block`
- **Description**: Allows an admin to block a user by their ID.
- Request Header: Authorization: Bearer <token>
- **Response** :
- success (200):

```json
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

#### 3.2 Delete Blog

- **Endpoint**: `DELETE /api/admin/blogs/:id`
- **Description**: Allows an admin to delete a blog by its ID.
- Request Header: Authorization: Bearer <token>
- **Response** :
- success (200):

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

### Error Handling

```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400, // or other relevant HTTP status code
  "error": { "details": "Additional error details, if applicable" },
  "stack": "error stack trace, if available"
}
```

### Setup and Configuration

```json
git clone ([Link](https://github.com/PallabKumarS/assignment-03-blog-project))
```

```json
cd assignment-03-blog-project
```

```json
npm install
```

```json
npm run dev
```
