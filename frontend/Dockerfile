# Use a lightweight Node base image
FROM node:24-alpine AS development

WORKDIR /app

# Copy dependency files for frontend
COPY package*.json ./

# To access files outside the frontend context, we handle the root context in compose,
# but for separate builds, we ensure the shared folder is mounted or explicitly copied.
RUN npm install

# Copy frontend source code
COPY . .

EXPOSE 5173

# Run Vite dev server and expose it to the network
CMD ["npm", "run", "dev", "--", "--host"]