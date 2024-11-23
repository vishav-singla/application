FROM node

# Set the working directory
WORKDIR /app

# Install dependencies and LibreOffice components
RUN apt-get update && apt-get install -y \
    libreoffice \
    unoconv \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Ensure `unoconv` and LibreOffice have correct permissions
RUN chmod +x /usr/bin/unoconv

# Install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy application files to the container
COPY . .

# Expose the application port
EXPOSE 8080

# Run LibreOffice in headless mode on startup
RUN mkdir -p /run/user/1000 && chmod -R 777 /run/user/1000
CMD libreoffice --headless --invisible --nologo --accept="socket,host=127.0.0.1,port=2002;urp;" & \
    node index.js
