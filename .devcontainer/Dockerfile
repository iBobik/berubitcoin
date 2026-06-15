# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/devcontainers/typescript-node:4-24-trixie

WORKDIR /workspace

# tmux - for agent-browser to manage long running tasks like devserver
# chromium - for agent-browser to run browser tests
RUN apt-get update && apt-get install -y tmux chromium && apt-get clean

USER node

# OpenCode
RUN mkdir -p /home/node/.config/opencode && ln -s /workspace/.devcontainer/opencode.json /home/node/.config/opencode/opencode.json

RUN npm install -g opencode-ai@latest agent-browser gsd-opencode skills

RUN npx gsd-opencode install --global
RUN npx skills add vercel-labs/agent-browser --skill agent-browser dogfood --global --yes
