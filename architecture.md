# Cloud Clipboard Architecture

```mermaid
graph TB
    A[Frontend - React] --> B[Backend API - Express.js]
    B --> C[MongoDB Atlas]
    B --> D[JWT Authentication]
    D --> E[bcrypt Password Hashing]
    C --> F[User Collection]
    C --> G[Clip Collection]
    G --> H[TTL Index for Expiry]
    
    style A fill:#4CAF50,stroke:#388E3C
    style B fill:#2196F3,stroke:#0D47A1
    style C fill:#FF9800,stroke:#E65100
    style D fill:#9C27B0,stroke:#4A148C
    style E fill:#9C27B0,stroke:#4A148C
    style F fill:#FF9800,stroke:#E65100
    style G fill:#FF9800,stroke:#E65100
    style H fill:#FF9800,stroke:#E65100
```

## Component Descriptions

### Frontend (React)
- User interface for authentication (login/signup)
- Form for creating new clips
- View for displaying clip content
- Interface for viewing access logs

### Backend API (Express.js)
- RESTful API endpoints for authentication and clip management
- JWT-based authentication middleware
- Business logic for clip creation and retrieval
- Integration with MongoDB for data persistence

### Database (MongoDB Atlas)
- **User Collection**: Stores user information (email, hashed password)
- **Clip Collection**: Stores clip data (content, type, share code, expiry)
- **TTL Index**: Automatically deletes expired clips

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **bcrypt**: Password hashing for secure storage
- **CORS**: Cross-origin resource sharing protection