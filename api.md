# SIMASTEMU API Documentation

## Base URL

- Local (docker-compose): `http://localhost:3000`
- No global prefix is configured in app bootstrap, so each route is used as-is.

## Full Configuration

### Runtime and Core Behavior

- Framework: NestJS 11
- Node image (dev): `node:20-alpine`
- Port: `process.env.PORT` (app listens on this port)
- Global validation pipe:
  - `whitelist: true`
  - `forbidNonWhitelisted: true`
  - `transform: true`
- Global exception filter response format:

```json
{
  "statusCode": 400,
  "timestamp": "2026-03-20T08:00:00.000Z",
  "path": "/inventory/create",
  "message": "Bad request"
}
```

### Environment Variables

Set these in `.env.development` / `.env.production` (loaded by `NODE_ENV`):

- `PORT`: API port (example: `3000`)
- `NODE_ENV`: `development` or `production`
- `JWT_KEY`: JWT signing and verification secret
- `UPLOAD_DIR`: upload base directory (example: `./uploads`)
- `DB_HOST`: PostgreSQL host (`db` in docker compose)
- `DB_PORT`: PostgreSQL port (example: `5432`)
- `DB_USERNAME`: DB user
- `DB_PASSWORD`: DB password
- `DB_NAME`: DB name
- `DB_NAME_TEST`: test DB name (used in `src/config/configuration.ts`)
- `DB_SYNC`: `true` or `false` for TypeORM synchronize
- PostgreSQL container also consumes `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` via env file.

### Database (TypeORM)

- Engine: PostgreSQL
- `autoLoadEntities: true`
- Migrations run on app startup: `migrationsRun: true`
- Migration build path: `dist/migrations/*.js`
- Entities build path: `dist/**/*.entity.js`

### Authentication

- Auth type: JWT Bearer token
- Sign-in response provides `accessToken`
- JWT sign options:
  - `secret`: `process.env.JWT_KEY`
  - `expiresIn`: `3600s`
- Protected routes require header:

```http
Authorization: Bearer <accessToken>
```

### File Upload Rules

- Allowed MIME types: `image/jpg`, `image/jpeg`, `image/png`
- Single upload field name: `file`
- Multi upload field name: `files`
- Multi upload max count: `10`
- Storage path format:
  - `${UPLOAD_DIR}/inventory/:type/:type_<timestamp_uuid_originalname>.<ext>`

---

## Endpoints

## 1) Health/Test Endpoint

- Method: `GET`
- Suffix URL: `/`
- Description: Simple hello response from app service.
- Auth: Not required

### Example Request

```bash
curl -X GET http://localhost:3000/
```

### Response Example

```json
"GET success!"
```

---

## 2) Sign In

- Method: `POST`
- Suffix URL: `/auth/sign-in`
- Description: Authenticate existing user and return JWT token.
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

### Common Error Example

```json
{
  "statusCode": 403,
  "timestamp": "2026-03-20T08:00:00.000Z",
  "path": "/auth/sign-in",
  "message": "Wrong password"
}
```

---

## 3) Sign Up

- Method: `POST`
- Suffix URL: `/auth/sign-up`
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
  "timestamp": "2026-03-20T08:00:00.000Z",
  "path": "/auth/sign-up",
  "message": "Email already used."
}
```

---

## 4) Create Inventory

- Method: `POST`
- Suffix URL: `/inventory/create`
- Description: Create inventory item for authenticated user.
- Auth: Required (Bearer token)

### Request Body

```json
{
  "name": "Tanah Kavling A1",
  "ownerName": "John Doe",
  "spptNumber": "SPPT-001",
  "certificateNumber": "CERT-001",
  "latitude": -6.2001,
  "longitude": 106.8166,
  "sizeArea": 250,
  "landPrice": 150000000,
  "njopPrice": 120000000,
  "zonePrice": 140000000,
  "imageURLs": [
    "depan_1711111111111_uuid_img1.jpg",
    "samping_1711111112222_uuid_img2.jpg"
  ]
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/inventory/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{
    "name": "Tanah Kavling A1",
    "ownerName": "John Doe",
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
  "name": "Tanah Kavling A1",
  "ownerName": "John Doe",
  "spptNumber": "SPPT-001",
  "certificateNumber": "CERT-001",
  "latitude": -6.2001,
  "longitude": 106.8166,
  "sizeArea": 250,
  "landPrice": 150000000,
  "njopPrice": 120000000,
  "zonePrice": 140000000,
  "imageURLs": ["depan_1711111111111_uuid_img1.jpg"],
  "user": {
    "uid": "9f656e8b-f131-4630-90f2-bf8487d2d77f"
  },
  "createdAt": "2026-03-20T08:00:00.000Z",
  "updatedAt": "2026-03-20T08:00:00.000Z"
}
```

---

## 5) Read My Inventory

- Method: `GET`
- Suffix URL: `/inventory/read`
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
    "name": "Tanah Kavling A1",
    "ownerName": "John Doe",
    "spptNumber": "SPPT-001",
    "certificateNumber": "CERT-001",
    "latitude": -6.2001,
    "longitude": 106.8166,
    "sizeArea": 250,
    "landPrice": 150000000,
    "njopPrice": 120000000,
    "zonePrice": 140000000,
    "imageURLs": ["depan_1711111111111_uuid_img1.jpg"],
    "user": {
      "uid": "9f656e8b-f131-4630-90f2-bf8487d2d77f"
    },
    "createdAt": "2026-03-20T08:00:00.000Z",
    "updatedAt": "2026-03-20T08:00:00.000Z"
  }
]
```

---

## 6) Read All Inventory

- Method: `GET`
- Suffix URL: `/inventory/readAll`
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
    "name": "Tanah Kavling A1",
    "ownerName": "John Doe",
    "spptNumber": "SPPT-001",
    "certificateNumber": "CERT-001",
    "latitude": -6.2001,
    "longitude": 106.8166,
    "sizeArea": 250,
    "landPrice": 150000000,
    "njopPrice": 120000000,
    "zonePrice": 140000000,
    "imageURLs": ["depan_1711111111111_uuid_img1.jpg"],
    "user": {
      "uid": "9f656e8b-f131-4630-90f2-bf8487d2d77f"
    },
    "createdAt": "2026-03-20T08:00:00.000Z",
    "updatedAt": "2026-03-20T08:00:00.000Z"
  }
]
```

---

## 7) Patch Inventory

- Method: `PATCH`
- Suffix URL: `/inventory/patch`
- Description: Partially update inventory fields.
- Auth: Required (Bearer token)

### Request Body

```json
{
  "id": "f35f9556-7a74-4f95-9b6d-5c6a16f6f8fb",
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
    "name": "Tanah Kavling A1 - Updated",
    "zonePrice": 145000000
  }'
```

### Response Example

```json
{
  "id": "f35f9556-7a74-4f95-9b6d-5c6a16f6f8fb",
  "name": "Tanah Kavling A1 - Updated",
  "ownerName": "John Doe",
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
  "user": {
    "uid": "9f656e8b-f131-4630-90f2-bf8487d2d77f"
  },
  "createdAt": "2026-03-20T08:00:00.000Z",
  "updatedAt": "2026-03-20T09:00:00.000Z"
}
```

### Behavior Note

Current controller check compares `body.id` with JWT subject (`req.user.sub`) before patching. If they differ, it returns `BadRequestException("Unathorized")`.

---

## 8) Delete Inventory

- Method: `DELETE`
- Suffix URL: `/inventory/delete/:id`
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

## 9) Get File

- Method: `GET`
- Suffix URL: `/file/get/:path`
- Description: Read uploaded file stream from storage.
- Auth: Not required

### Path Pattern

- `:path` follows generated filename pattern: `:type_<timestamp_uuid_originalname>.<ext>`

### Example Request

```bash
curl -X GET "http://localhost:3000/file/get/depan_1711111111111_uuid_example.jpg" --output image.jpg
```

### Response Example

- Binary stream (`StreamableFile`) with file content.

### Common Error Example

```json
{
  "statusCode": 404,
  "timestamp": "2026-03-20T08:00:00.000Z",
  "path": "/file/get/depan_1711111111111_uuid_example.jpg",
  "message": "File not found"
}
```

---

## 10) Upload Single File

- Method: `POST`
- Suffix URL: `/file/upload/:type`
- Description: Upload one image file.
- Auth: Required (Bearer token)
- Content-Type: `multipart/form-data`

### Form Fields

- `file`: image file (`jpg`, `jpeg`, `png`)

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

## 11) Upload Multiple Files

- Method: `POST`
- Suffix URL: `/file/uploads/:type`
- Description: Upload up to 10 image files.
- Auth: Required (Bearer token)
- Content-Type: `multipart/form-data`

### Form Fields

- `files`: image files (array, max 10)

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

## Route Summary (Suffix URL)

- `GET /auth/`
- `POST /auth/sign-in`
- `POST /auth/sign-up`
- `POST /inventory/create`
- `GET /inventory/read`
- `GET /inventory/readAll`
- `PATCH /inventory/patch`
- `DELETE /inventory/delete/:id`
- `GET /file/get/:path`
- `POST /file/upload/:type`
- `POST /file/uploads/:type`
