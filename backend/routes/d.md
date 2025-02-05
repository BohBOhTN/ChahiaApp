// User Routes Documentation

## Register a new user
**Endpoint:** `POST /register`

**Description:** Registers a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
- `201 Created`: Returns the created user object.
- `400 Bad Request`: Returns an error message.

## Login a user
**Endpoint:** `POST /login`

**Description:** Logs in a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
- `200 OK`: Returns a JWT token.
- `401 Unauthorized`: Returns an error message.
- `400 Bad Request`: Returns an error message.

## Create a new user (admin only)
**Endpoint:** `POST /`

**Description:** Creates a new user. Only accessible by users with the 'manager' role.

**Request Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
- `201 Created`: Returns the created user object.
- `400 Bad Request`: Returns an error message.
- `401 Unauthorized`: Returns an error message.
- `403 Forbidden`: Returns an error message.

## Get all users (admin only)
**Endpoint:** `GET /`

**Description:** Retrieves all users. Only accessible by users with the 'manager' role.

**Request Headers:**
- `Authorization: Bearer <token>`

**Response:**
- `200 OK`: Returns an array of user objects.
- `400 Bad Request`: Returns an error message.
- `401 Unauthorized`: Returns an error message.
- `403 Forbidden`: Returns an error message.

## Get a user by ID (admin only)
**Endpoint:** `GET /:id`

**Description:** Retrieves a user by ID. Only accessible by users with the 'manager' role.

**Request Headers:**
- `Authorization: Bearer <token>`

**Response:**
- `200 OK`: Returns the user object.
- `404 Not Found`: Returns an error message.
- `400 Bad Request`: Returns an error message.
- `401 Unauthorized`: Returns an error message.
- `403 Forbidden`: Returns an error message.

## Update a user by ID (admin only)
**Endpoint:** `PUT /:id`

**Description:** Updates a user by ID. Only accessible by users with the 'manager' role.

**Request Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "email": "newemail@example.com",
  "password": "newpassword123",
  "role": "newrole"
}
```

**Response:**
- `200 OK`: Returns the updated user object.
- `404 Not Found`: Returns an error message.
- `400 Bad Request`: Returns an error message.
- `401 Unauthorized`: Returns an error message.
- `403 Forbidden`: Returns an error message.

## Delete a user by ID (admin only)
**Endpoint:** `DELETE /:id`

**Description:** Deletes a user by ID. Only accessible by users with the 'manager' role.

**Request Headers:**
- `Authorization: Bearer <token>`

**Response:**
- `204 No Content`: Indicates successful deletion.
- `404 Not Found`: Returns an error message.
- `400 Bad Request`: Returns an error message.
- `401 Unauthorized`: Returns an error message.
- `403 Forbidden`: Returns an error message.
