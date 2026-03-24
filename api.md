# SIMASTEMU API Documentation

Backend for SimasetMU apps development.

## Runtime Configuration

- Framework: NestJS 11
- App port: process.env.PORT
- Global validation pipe:
  - whitelist: true
  - forbidNonWhitelisted: true
  - transform: true

## Swagger Docs

- URL: /docs
- Protected with HTTP Basic Auth.
- Credentials source:
  - Username: process.env.DOCS_USER
  - Password: process.env.DOCS_PASSWORD

## Authentication

- Auth type: JWT Bearer token
- Sign-in returns accessToken
- JWT secret: process.env.JWT_KEY
- JWT expiry: 3600s

Authorization header format:

```http
Authorization: Bearer <accessToken>
```

## File Upload Rules

- Allowed MIME types: image/jpg, image/jpeg, image/png
- Single upload field: file
- Multi upload field: files
- Multi upload max count: 10
- Storage path format:
  - ${UPLOAD*DIR}/inventory/:type/:type*<generated>.<ext>

---

## Endpoints

## 1) Test GET

- Method: GET
- Suffix URL: /test
- Description: Returns a static health-like message.
- Auth: Not required

### Example Request

```bash
curl -X GET http://localhost:3000/test
```

### Response Example

```json
"GET success!"
```

---

## 2) Test POST

- Method: POST
- Suffix URL: /test
- Description: Echoes payload data with BACKEND prefix.
- Auth: Not required

### Request Body

```json
{
  "data": "hello"
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/test \
  -H "Content-Type: application/json" \
  -d '{
    "data": "hello"
  }'
```

### Response Example

```json
"BACKEND: hello"
```

---

## 3) Sign In

- Method: POST
- Suffix URL: /auth/sign-in
- Description: Authenticate user and return JWT.
- Auth: Not required

### Request Body

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secret123"
  }'
```

### Response Example

```json
{
  "accessToken": "eyJhbGciOiJI..."
}
```

### Common Error Examples

```json
{
  "statusCode": 400,
  "message": "User not found"
}
```

```json
{
  "statusCode": 403,
  "message": "Wrong password"
}
```

---

## 4) Sign Up

- Method: POST
- Suffix URL: /auth/sign-up
- Description: Register a new user account.
- Auth: Not required

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/auth/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secret123"
  }'
```

### Response Example

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Common Error Example

```json
{
  "statusCode": 400,
  "message": "Email already used."
}
```

---

## 5) Create Inventory

- Method: POST
- Suffix URL: /inventory/create
- Description: Create inventory item for authenticated user.
- Auth: Required (Bearer token)

### Request Body

ownerId must not be sent by client. It is injected from JWT subject.

```json
{
  "name": "Tanah Kavling A1",
  "spptNumber": "SPPT-001",
  "certificateNumber": "CERT-001",
  "latitude": -6.2001,
  "longitude": 106.8166,
  "sizeArea": 250,
  "landPrice": 150000000,
  "njopPrice": 120000000,
  "zonePrice": 140000000,
  "imageURLs": ["depan_1711111111111_uuid_img1.jpg"]
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/inventory/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{
    "name": "Tanah Kavling A1",
    "spptNumber": "SPPT-001",
    "certificateNumber": "CERT-001",
    "latitude": -6.2001,
    "longitude": 106.8166,
    "sizeArea": 250,
    "landPrice": 150000000,
    "njopPrice": 120000000,
    "zonePrice": 140000000,
    "imageURLs": ["depan_1711111111111_uuid_img1.jpg"]
  }'
```

### Response Example

```json
{
  "id": "f35f9556-7a74-4f95-9b6d-5c6a16f6f8fb",
  "ownerId": "9f656e8b-f131-4630-90f2-bf8487d2d77f",
  "name": "Tanah Kavling A1",
  "spptNumber": "SPPT-001",
  "certificateNumber": "CERT-001",
  "latitude": -6.2001,
  "longitude": 106.8166,
  "sizeArea": 250,
  "landPrice": 150000000,
  "njopPrice": 120000000,
  "zonePrice": 140000000,
  "imageURLs": ["depan_1711111111111_uuid_img1.jpg"],
  "createdAt": "2026-03-20T08:00:00.000Z",
  "updatedAt": "2026-03-20T08:00:00.000Z"
}
```

---

## 6) Read My Inventory

- Method: GET
- Suffix URL: /inventory/read
- Description: Get inventories belonging to authenticated user.
- Auth: Required (Bearer token)

### Example Request

```bash
curl -X GET http://localhost:3000/inventory/read \
  -H "Authorization: Bearer <accessToken>"
```

### Response Example

```json
[
  {
    "id": "f35f9556-7a74-4f95-9b6d-5c6a16f6f8fb",
    "ownerId": "9f656e8b-f131-4630-90f2-bf8487d2d77f",
    "name": "Tanah Kavling A1",
    "spptNumber": "SPPT-001",
    "certificateNumber": "CERT-001",
    "latitude": -6.2001,
    "longitude": 106.8166,
    "sizeArea": 250,
    "landPrice": 150000000,
    "njopPrice": 120000000,
    "zonePrice": 140000000,
    "imageURLs": ["depan_1711111111111_uuid_img1.jpg"],
    "createdAt": "2026-03-20T08:00:00.000Z",
    "updatedAt": "2026-03-20T08:00:00.000Z"
  }
]
```

---

## 7) Read All Inventory

- Method: GET
- Suffix URL: /inventory/readAll
- Description: Get all inventories from all users.
- Auth: Required (Bearer token)

### Example Request

```bash
curl -X GET http://localhost:3000/inventory/readAll \
  -H "Authorization: Bearer <accessToken>"
```

### Response Example

```json
[
  {
    "id": "f35f9556-7a74-4f95-9b6d-5c6a16f6f8fb",
    "ownerId": "9f656e8b-f131-4630-90f2-bf8487d2d77f",
    "name": "Tanah Kavling A1",
    "spptNumber": "SPPT-001",
    "certificateNumber": "CERT-001",
    "latitude": -6.2001,
    "longitude": 106.8166,
    "sizeArea": 250,
    "landPrice": 150000000,
    "njopPrice": 120000000,
    "zonePrice": 140000000,
    "imageURLs": ["depan_1711111111111_uuid_img1.jpg"],
    "createdAt": "2026-03-20T08:00:00.000Z",
    "updatedAt": "2026-03-20T08:00:00.000Z"
  }
]
```

---

## 8) Patch Inventory

- Method: PATCH
- Suffix URL: /inventory/patch
- Description: Partially update inventory fields.
- Auth: Required (Bearer token)

### Request Body

ownerId must match JWT subject, otherwise request is rejected with 403.

```json
{
  "id": "f35f9556-7a74-4f95-9b6d-5c6a16f6f8fb",
  "ownerId": "9f656e8b-f131-4630-90f2-bf8487d2d77f",
  "name": "Tanah Kavling A1 - Updated",
  "zonePrice": 145000000,
  "imageURLs": [
    "depan_1711111111111_uuid_img1.jpg",
    "belakang_1711111113333_uuid_img3.jpg"
  ]
}
```

### Example Request

```bash
curl -X PATCH http://localhost:3000/inventory/patch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{
    "id": "f35f9556-7a74-4f95-9b6d-5c6a16f6f8fb",
    "ownerId": "9f656e8b-f131-4630-90f2-bf8487d2d77f",
    "name": "Tanah Kavling A1 - Updated",
    "zonePrice": 145000000
  }'
```

### Response Example

```json
{
  "id": "f35f9556-7a74-4f95-9b6d-5c6a16f6f8fb",
  "ownerId": "9f656e8b-f131-4630-90f2-bf8487d2d77f",
  "name": "Tanah Kavling A1 - Updated",
  "spptNumber": "SPPT-001",
  "certificateNumber": "CERT-001",
  "latitude": -6.2001,
  "longitude": 106.8166,
  "sizeArea": 250,
  "landPrice": 150000000,
  "njopPrice": 120000000,
  "zonePrice": 145000000,
  "imageURLs": [
    "depan_1711111111111_uuid_img1.jpg",
    "belakang_1711111113333_uuid_img3.jpg"
  ],
  "createdAt": "2026-03-20T08:00:00.000Z",
  "updatedAt": "2026-03-20T09:00:00.000Z"
}
```

### Common Error Examples

```json
{
  "statusCode": 403,
  "message": "User did not own this inventory"
}
```

```json
{
  "statusCode": 404,
  "message": "Inventory with id <id> not found"
}
```

---

## 9) Delete Inventory

- Method: DELETE
- Suffix URL: /inventory/delete/:id
- Description: Delete inventory by ID.
- Auth: Required (Bearer token)

### Example Request

```bash
curl -X DELETE http://localhost:3000/inventory/delete/f35f9556-7a74-4f95-9b6d-5c6a16f6f8fb \
  -H "Authorization: Bearer <accessToken>"
```

### Response Example

```json
{
  "raw": [],
  "affected": 1
}
```

---

## 10) Get File

- Method: GET
- Suffix URL: /file/get/:path
- Description: Return uploaded file as stream.
- Auth: Not required

### Path Pattern

- :path must be the stored filename, for example:
  - depan_1711111111111_uuid_sample.jpg

### Example Request

```bash
curl -X GET "http://localhost:3000/file/get/depan_1711111111111_uuid_sample.jpg" --output image.jpg
```

### Response Example

- Binary stream (StreamableFile)

### Common Error Example

```json
{
  "statusCode": 404,
  "message": "File not found"
}
```

---

## 11) Upload Single File

- Method: POST
- Suffix URL: /file/upload/:type
- Description: Upload one image file.
- Auth: Required (Bearer token)
- Content-Type: multipart/form-data

### Form Fields

- file: image file (jpg, jpeg, png)

### Example Request

```bash
curl -X POST "http://localhost:3000/file/upload/depan" \
  -H "Authorization: Bearer <accessToken>" \
  -F "file=@./sample.jpg"
```

### Response Example

```json
[
  {
    "path": "depan_1711111111111_9b2f4d7a-1e84-4d8c-a2d2-1d0bd8f7b2c3_sample.jpg",
    "size": 182736
  }
]
```

---

## 12) Upload Multiple Files

- Method: POST
- Suffix URL: /file/uploads/:type
- Description: Upload up to 10 image files.
- Auth: Required (Bearer token)
- Content-Type: multipart/form-data

### Form Fields

- files: image files array (max 10)

### Example Request

```bash
curl -X POST "http://localhost:3000/file/uploads/depan" \
  -H "Authorization: Bearer <accessToken>" \
  -F "files=@./sample1.jpg" \
  -F "files=@./sample2.png"
```

### Response Example

```json
[
  {
    "path": "depan_1711111111111_9b2f4d7a-1e84-4d8c-a2d2-1d0bd8f7b2c3_sample1.jpg",
    "size": 182736
  },
  {
    "path": "depan_1711111112222_41814dd8-d4f4-4ff8-b67d-59815f3628b9_sample2.png",
    "size": 204892
  }
]
```

---

## Route Summary

- GET /test
- POST /test
- POST /auth/sign-in
- POST /auth/sign-up
- POST /inventory/create
- GET /inventory/read
- GET /inventory/readAll
- PATCH /inventory/patch
- DELETE /inventory/delete/:id
- GET /file/get/:path
- POST /file/upload/:type
- POST /file/uploads/:type
