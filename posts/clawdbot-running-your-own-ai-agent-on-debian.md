---
title: "Clawdbot: Running Your Own AI Agent on Debian"
date: "2026-01-27"
path: "/clawdbot-running-your-own-ai-agent-on-debian"
excerpt: "We're entering an era where personal AI infrastructure becomes as fundamental as personal computing was in the 1980s. Clawdbot is an open-source AI assistant that runs entirely on your own infrastructure, connecting to messaging platforms you already use while maintaining persistent memory and the ability to execute real actions on your behalf."
feature_image: "/images/clawdbot-running-your-own-ai-agent-on-debian/clawdbot-cover.png"
featured: true
---

The rise of agentic AI has been one of the most fascinating developments in the post-ChatGPT era. We've moved from conversational interfaces that answer questions to autonomous systems that can take action—reading your emails, managing your calendar, executing code, and interfacing with the physical world through APIs and automation.

Anthropic's recent announcement of Claude Cowork signals that the major players see this as the next frontier. But what's particularly interesting is the parallel emergence of open, self-hosted alternatives that put these capabilities directly in the hands of individuals.

Clawdbot is one such project. It's an open-source AI assistant that runs entirely on your own infrastructure, connecting to messaging platforms you already use, such as Discord, Telegram, WhatsApp, Signal, while maintaining persistent memory and the ability to execute real actions on your behalf.

We're entering an era where personal AI infrastructure becomes as fundamental as personal computing was in the 1980s. The wild west period of AI agents has begun.

## The Architecture of a Personal Agent

What makes Clawdbot interesting isn't just that it's self-hosted, it's the architecture. The system consists of a Gateway that runs continuously, managing sessions, memory, and connections to various channels. The agent itself is stateless; persistence comes from markdown files in a workspace directory and session logs on disk.

This design choice is significant. Your agent's "soul" — its personality, memories, and context—lives in plain text files you control. Want to back it up? It's just a git repository. Want to migrate to a new machine? Clone the repo and re-authenticate your channels.

The Gateway binds to localhost by default, exposing no external ports. All communication flows through the messaging platforms themselves, which act as the transport layer. This is a sensible security model: rather than exposing a new attack surface, it piggybacks on the authentication and encryption of established platforms.

## Setting Up the Foundation

Getting Clawdbot running on Debian requires a modern Node.js runtime (v24+) and a few supporting tools. The process is straightforward but worth documenting for those who want to replicate it.

### System Preparation

On a fresh Debian 13 (Trixie) installation, begin with the essentials:

```bash
apt update && apt upgrade -y
apt install -y ca-certificates curl gnupg git
```

Node.js 24 is required for the runtime:

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt install -y nodejs
```

For browser automation capabilities—allowing your agent to navigate websites, fill forms, and take screenshots—install Chromium:

```bash
apt install -y chromium
```

Docker is optional but valuable. It enables the agent to spin up containers on demand, which opens possibilities for isolated execution environments and running arbitrary services:

```bash
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" > /etc/apt/sources.list.d/docker.list

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl enable --now docker
```

Finally, install Clawdbot itself:

```bash
npm install -g clawdbot@latest
```

### User Configuration

It's advisable to run Clawdbot as a dedicated non-root user. After creating the user and adding them to the docker group, switch to that account and run the onboarding wizard:

```bash
clawdbot onboard --install-daemon
```

This creates the workspace at `~/clawd`, generates the initial configuration, and sets up a systemd service for auto-start on boot.

The configuration lives at `~/.clawdbot/clawdbot.json`. At minimum, you'll need to configure your model provider (Anthropic, OpenAI, or others) and at least one messaging channel.

### Connecting to Discord

Discord integration requires creating a bot application in the Discord Developer Portal. The key steps:

1. Create a new application and add a bot user
2. Enable "Message Content Intent" and "Server Members Intent"
3. Generate an invite URL with appropriate scopes and permissions
4. Add the bot to your server

Then configure Clawdbot with your bot token and server details:

```json
{
  "channels": {
    "discord": {
      "token": "YOUR_BOT_TOKEN",
      "groupPolicy": "allowlist",
      "guilds": {
        "YOUR_SERVER_ID": {
          "requireMention": false
        }
      }
    }
  }
}
```

For headless browser automation:

```json
{
  "browser": {
    "enabled": true,
    "headless": true
  }
}
```

Run `clawdbot doctor --fix` to validate your configuration, then `clawdbot gateway restart` to apply changes.

## Security: The Critical Consideration

Here's where things get serious. You're running an AI agent with shell access on your machine. It can execute arbitrary commands, read files, make network requests. The security model matters enormously.

Clawdbot ships with sane defaults, but it's worth understanding what they are and verifying them:

```bash
clawdbot security audit --deep
```

The key hardening steps I applied:

**Restrict channel access.** The default `groupPolicy: "open"` allows anyone in any server to trigger your bot. Change this to `allowlist` and explicitly specify which servers are permitted.

**Set a strong Gateway token.** The default token may be weak. Generate a proper one:

```bash
openssl rand -hex 32
```

**Lock down file permissions.** The credentials directory and config file should be readable only by the owner:

```bash
chmod 700 ~/.clawdbot/credentials
chmod 600 ~/.clawdbot/clawdbot.json
```

**Verify network exposure.** All Clawdbot services should bind to localhost only:

```bash
ss -tlnp | grep LISTEN
```

After hardening, the security audit should show zero critical issues.

## Workspace Persistence with Git

One of the elegant aspects of Clawdbot's design is that the agent's memory and personality are just files. This makes backup and portability trivial.

I set up automated daily backups to a private GitHub repository using a deploy key—an SSH key scoped to a single repository, following the principle of least privilege:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/clawdbot_deploy -C "clawdbot-workspace-deploy" -N ""
```

Configure SSH to use this key for GitHub, add the public key as a deploy key on your repository, and initialize the workspace as a git repo.

Clawdbot's built-in cron system can then handle the daily sync automatically, committing and pushing any changes to the workspace each night.

## The Bigger Picture

What strikes me about this moment is the parallel to the early days of personal computing. In the 1970s, computers were institutional, you accessed them through terminals connected to mainframes. The personal computer revolution put general-purpose computing directly in individuals' hands.

We're at a similar inflection point with AI. The dominant model today is cloud-based: you interact with AI through APIs controlled by a handful of companies. But projects like Clawdbot represent a different path, one where the intelligence runs on infrastructure you control, maintains context you own, and operates according to rules you define.

This comes with responsibilities. Running your own AI agent means you're responsible for its security, its behavior, and its access. The attack surface is real: prompt injection, credential exposure, unintended command execution. The security model is still evolving, and mistakes will be made.

But the potential is significant. A personal AI that truly knows your context, has access to your tools, and can take action on your behalf is qualitatively different from a chatbot you visit in a browser. It's the difference between a search engine and an assistant.

We're in the early days. The tooling is rough. The security practices are still being established. But the trajectory is clear: AI agents are moving from the cloud to the edge, from institutional to personal, from walled gardens and out into the open.
