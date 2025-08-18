FROM rust:1.86-bullseye

# System deps
RUN apt-get update && apt-get install -y \
	curl git pkg-config libssl-dev libudev-dev python3 python3-pip \
	&& rm -rf /var/lib/apt/lists/*

# Install Solana CLI
ENV SOLANA_VERSION=1.18.26
RUN curl -sSfL https://release.anza.xyz/v${SOLANA_VERSION}/install | sh
ENV PATH=/root/.local/share/solana/install/active_release/bin:$PATH

# Install Anchor CLI
RUN cargo install --git https://github.com/coral-xyz/anchor --tag v0.31.1 anchor-cli --locked

WORKDIR /workspace

RUN rustc --version && cargo --version && solana --version && anchor --version
