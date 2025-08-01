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

# Install Solana CLI
RUN curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash

# Add Cargo to PATH for later Dockerfile steps
ENV PATH="/root/.cargo/bin:${PATH}"

# Install Anchor CLI
RUN cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

# Set working directory
WORKDIR /workspace

# Create default user
RUN useradd -ms /bin/bash vscode
USER vscode
