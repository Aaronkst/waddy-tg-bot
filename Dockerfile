FROM node:alpine

# Create app directory
WORKDIR /app

# Copy Repository
COPY ./ /app

# Init pnpm
RUN npm install -g pnpm

# Install packages with pnpm
RUN pnpm install

# Set env to production
ENV NODE_ENV production

# Build the app
RUN pnpm build

# Start the app
CMD pnpm start

# bind to port 3000
EXPOSE 3000
