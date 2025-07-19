# ---- Base Stage ----
FROM node:20-alpine AS base
WORKDIR /usr/src/app

# ---- Dependencies Stage ----
# This stage installs all dependencies, including devDependencies needed for the build.
# This layer is cached to speed up future builds.
FROM base AS deps

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies using 'npm ci' for clean, reproducible builds
RUN npm ci

# ---- Build Stage ----
# This stage builds the TypeScript application.
FROM deps AS builder

# Copy the entire source code
# The .dockerignore file will prevent unnecessary files from being copied
COPY . .

# Build the application using the build script from package.json
RUN npm run build

# ---- Production Stage ----
# This is the final, minimal image for production.
FROM base AS production

# Copy only the production dependencies from the 'deps' stage.
# This keeps the final image smaller.
COPY --from=deps /usr/src/app/package*.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy the compiled application from the 'builder' stage.
# Your tsconfig.json specifies the output directory is 'dist'
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/data-source.ts ./

# Create a non-root user and group for better security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the port the application will run on (default is 3000)
EXPOSE 3000

# The command to start the application in production mode
# This matches your 'start:prod' script.
CMD ["node", "dist/src/main"]