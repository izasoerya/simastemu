#!/bin/sh

set -e

echo "Running database migration..."
npm run typeorm -- migration:run

echo "Starting application..."
exec "$@"