FROM node:18

WORKDIR /app

# Copy package.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest (src + prisma + others)
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
