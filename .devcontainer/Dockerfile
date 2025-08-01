FROM debian:bookworm

# Install system dependencies
RUN apt-get update && apt-get install -y \
	curl \
	git \
	build-essential \
	pkg-config \
	libssl-dev \
	libudev-dev \
	python3 \
	python3-pip \
	ca-certificates \
	gnupg \
	&& rm -rf /var/lib/apt/lists/*

# Optional: Install Node.js (if still needed later)
# RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
#     apt-get install -y nodejs && \
#     node -v && npm -v

# Install Solana CLI
RUN curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash

# Set working directory
WORKDIR /workspace

# Create default user
RUN useradd -ms /bin/bash vscode
USER vscode
