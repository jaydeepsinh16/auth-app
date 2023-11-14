# NestJS Authentication with MongoDB

Welcome to the NestJS Authentication project with MongoDB! This project provides a solid foundation for implementing authentication features using NestJS and MongoDB. It includes a signup page, a login page, and a ready-to-use `AuthGuard` that can be easily attached to future APIs.

## Features

- **Signup Page:** Allows users to create an account securely.
- **Login Page:** Provides a secure login mechanism for registered users.
- **AuthGuard:** Implemented and ready for use in future APIs to ensure authenticated access.

## Getting Started

Follow these simple steps to run the project locally:

1. **Install Dependencies:**
```bash
npm install
```

2. **Run the Project:**
```bash
npm run start
```

# Usage

## Signup Page

- **Endpoint:** `/signup`
- **Method:** `POST`
- **Example Request:**
  ```bash
  curl -X POST http://localhost:3000/signup -d '{"username": "example", "password": "securepassword"}' -H 'Content-Type: application/json'

# Login Page

- **Endpoint:** `/login`
- **Method:** `POST`

**Example Request:**
```bash
curl -X POST http://localhost:3000/login -d '{"username": "example", "password": "securepassword"}' -H 'Content-Type: application/json'
```
# AuthGuard

The `AuthGuard` is ready for use in your future APIs. Simply attach it to the routes or controllers where you want to enforce authentication.

**Example:**
```typescript
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './path-to-auth-guard-module'; // Replace with the actual path

@Controller('api')
export class YourController {
  @Get('protected')
  @UseGuards(AuthGuard)
  protectedEndpoint() {
    // Your protected endpoint logic here
  }
}

Feel free to extend and customize the project based on your requirements. Happy coding!'
