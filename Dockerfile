FROM node:alpine

# Create app directory
WORKDIR /app

# Copy Repository
COPY ./ /app

# Install packages with yarn
RUN pnpm install

# Set env to production
ENV NODE_ENV production

# Build the app
RUN pnpm build

# Start the app
CMD pnpm start

# bind to port 3000
EXPOSE 3000
