FROM node:18-bullseye

# Install dependencies
# RUN apt-get update && apt-get install -y \
# 	curl \
# 	git \
# 	build-essential \
# 	pkg-config \
# 	libssl-dev \
# 	libudev-dev \
# 	python3 \
# 	python3-pip \
# 	&& rm -rf /var/lib/apt/lists/*

# Install Rust
# RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
# ENV PATH="/root/.cargo/bin:${PATH}"

# Copy and run the Solana install script
# COPY solana-install.sh /tmp/solana-install.sh
# RUN bash /tmp/solana-install.sh && \
# 	/root/.local/share/solana/install/active_release/bin/solana config set --url https://api.devnet.solana.com
# ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

# Install Anchor
# RUN cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

# Set working directory
# WORKDIR /workspace

# # Create default user
# RUN useradd -ms /bin/bash vscode
# USER vscode
