#!/bin/sh
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 5  # Simple wait or use a more sophisticated check

# Run migrations
echo "Running migrations..."
npx prisma migrate deploy

# Run seed
echo "Running DB seed..."
npx tsx /app/db/seed.ts  # Using absolute path to ensure correct location

# Start the application
echo "Starting Next.js application..."
exec node server.js