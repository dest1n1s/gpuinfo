# Use the official Node.js image as the base image
FROM imbios/bun-node:latest as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and bun.lockb files to the working directory
COPY package.json bun.lockb ./

# Install the app dependencies
RUN bun install

# Copy the rest of the app files to the working directory
COPY . .

RUN bun run build

FROM imbios/bun-node:latest as runner

WORKDIR /app
COPY --from=builder /app/package.json /app/bun.lockb /app/tsconfig.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/build ./build
RUN bun install --production

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose the port on which the app will run
EXPOSE 3000

# Start the app
CMD ["bun", "run", "start"]
