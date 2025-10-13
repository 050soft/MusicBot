# Build
FROM node:20 AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src ./src
RUN npm run build

# Run
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/build ./buld
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose port (for later)
# EXPOSE 3000

# Start bot
CMD ["node", "build/index.js"]
