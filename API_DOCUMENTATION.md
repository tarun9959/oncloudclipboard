# Cloud Clipboard API Documentation

## Authentication

All API endpoints except `/api/auth/signup` and `/api/auth/signin` require authentication using JWT tokens.

To authenticate, include the Authorization header with your requests:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### User Authentication

#### Signup
- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Auth Required**: No
- **Data Params**:
  ```json
  {
    "email": "[valid email]",
    "password": "[string, min 6 characters]"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "_id": "[user id]",
      "email": "[user email]",
      "token": "[jwt token]"
    }
    ```
- **Error Response**:
  - **Code**: 400 BAD REQUEST
  - **Content**: `{ "message": "User already exists" }`
  - **Code**: 500 SERVER ERROR
  - **Content**: `{ "message": "Server error" }`

#### Signin
- **URL**: `/api/auth/signin`
- **Method**: `POST`
- **Auth Required**: No
- **Data Params**:
  ```json
  {
    "email": "[valid email]",
    "password": "[string]"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "_id": "[user id]",
      "email": "[user email]",
      "token": "[jwt token]"
    }
    ```
- **Error Response**:
  - **Code**: 401 UNAUTHORIZED
  - **Content**: `{ "message": "Invalid email or password" }`
  - **Code**: 500 SERVER ERROR
  - **Content**: `{ "message": "Server error" }`

### Clip Management

#### Create Clip
- **URL**: `/api/clip/add`
- **Method**: `POST`
- **Auth Required**: Yes
- **Data Params**:
  ```json
  {
    "type": "[Text|Link|Code]",
    "content": "[string]",
    "expiryMinutes": "[number, minutes until expiry]"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "_id": "[clip id]",
      "type": "[clip type]",
      "content": "[clip content]",
      "code": "[share code]",
      "expiresAt": "[ISO date]",
      "createdAt": "[ISO date]"
    }
    ```
- **Error Response**:
  - **Code**: 400 BAD REQUEST
  - **Content**: `{ "message": "Type, content, and expiry minutes are required" }`
  - **Code**: 400 BAD REQUEST
  - **Content**: `{ "message": "Invalid clip type" }`
  - **Code**: 500 SERVER ERROR
  - **Content**: `{ "message": "Could not generate unique share code" }`
  - **Code**: 500 SERVER ERROR
  - **Content**: `{ "message": "Server error" }`

#### Get Clip by Share Code
- **URL**: `/api/clip/:code`
- **Method**: `GET`
- **Auth Required**: No
- **URL Params**:
  - `code=[string]` (share code)
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "_id": "[clip id]",
      "type": "[clip type]",
      "content": "[clip content]",
      "code": "[share code]",
      "expiresAt": "[ISO date]",
      "accessLogs": [
        {
          "viewerEmail": "[email or null]",
          "accessedAt": "[ISO date]"
        }
      ],
      "createdAt": "[ISO date]"
    }
    ```
- **Error Response**:
  - **Code**: 404 NOT FOUND
  - **Content**: `{ "message": "Clip not found" }`
  - **Code**: 404 NOT FOUND
  - **Content**: `{ "message": "Clip has expired" }`
  - **Code**: 500 SERVER ERROR
  - **Content**: `{ "message": "Server error" }`

#### Get Clip Access Logs
- **URL**: `/api/clip/:id/logs`
- **Method**: `GET`
- **Auth Required**: Yes
- **URL Params**:
  - `id=[string]` (clip ID)
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "_id": "[clip id]",
      "code": "[share code]",
      "accessLogs": [
        {
          "viewerEmail": "[email or null]",
          "accessedAt": "[ISO date]"
        }
      ]
    }
    ```
- **Error Response**:
  - **Code**: 404 NOT FOUND
  - **Content**: `{ "message": "Clip not found" }`
  - **Code**: 500 SERVER ERROR
  - **Content**: `{ "message": "Server error" }`

## Data Models

### User
```json
{
  "_id": "[MongoDB ObjectId]",
  "email": "[string, unique]",
  "password": "[string, hashed]",
  "createdAt": "[ISO date]",
  "updatedAt": "[ISO date]"
}
```

### Clip
```json
{
  "_id": "[MongoDB ObjectId]",
  "type": "[Text|Link|Code]",
  "content": "[string]",
  "code": "[string, unique, 6-8 characters]",
  "expiresAt": "[ISO date, TTL indexed]",
  "accessLogs": [
    {
      "viewerEmail": "[string or null]",
      "accessedAt": "[ISO date]"
    }
  ],
  "createdAt": "[ISO date]",
  "updatedAt": "[ISO date]"
}
```

## Error Responses

All error responses follow this format:
```json
{
  "message": "[error description]"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error