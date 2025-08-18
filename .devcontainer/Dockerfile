FROM ubuntu:22.04

# System dependencies
RUN apt-get update && apt-get install -y \
	curl git build-essential pkg-config libssl-dev libudev-dev \
	python3 python3-pip ca-certificates gnupg \
	&& rm -rf /var/lib/apt/lists/*

# Install Rust explicitly
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain 1.86.0
ENV PATH=/root/.cargo/bin:$PATH

# Install Solana CLI
ENV VERSION=1.18.26
RUN curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash
ENV PATH=/root/.local/share/solana/install/active_release/bin:$PATH:$PATH

# Install Anchor CLI
RUN cargo install --git https://github.com/coral-xyz/anchor --tag v0.31.1 anchor-cli --locked

WORKDIR /workspace

# Check versions
RUN rustc --version && cargo --version && solana --version && anchor --version
