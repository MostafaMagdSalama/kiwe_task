# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install
RUN npm install -g typescript

# Copy the rest of the application
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["node", "dist/app.js"]
