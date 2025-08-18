FROM ubuntu:22.04

# System dependencies
RUN apt-get update && apt-get install -y \
	curl git build-essential pkg-config libssl-dev libudev-dev \
	python3 python3-pip ca-certificates gnupg \
	&& rm -rf /var/lib/apt/lists/*

# Install Rust explicitly
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y --default-toolchain 1.86.0

# Install Solana CLI
ENV SOLANA_VERSION=1.18.26
ENV PATH=/root/.cargo/bin:/root/.local/share/solana/install/active_release/bin:$PATH
RUN curl -sSfL https://release.anza.xyz/v${SOLANA_VERSION}/install | sh

# Install Anchor CLI
RUN cargo install --git https://github.com/coral-xyz/anchor --tag v0.31.1 anchor-cli --locked

WORKDIR /workspace

# Check versions
RUN rustc --version && cargo --version && solana --version && anchor --version
