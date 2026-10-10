/**
 * Discord Bot mit Cloudflare Workers
 * Basic Commands: ping, hello, help
 */

import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';

// Command Definitionen
const commands = {
  ping: {
    name: 'ping',
    description: 'Antworte mit Pong!',
    type: 1, // CHAT_INPUT
  },
  hello: {
    name: 'hello',
    description: 'Sagt Hallo zurueck',
    type: 1,
  },
  help: {
    name: 'help',
    description: 'Zeigt alle verfuegbaren Commands an',
    type: 1,
  },
};

// Command Handler
async function handleCommand(interaction) {
  const commandName = interaction.data.name;
  
  switch (commandName) {
    case 'ping':
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'Pong! 🏓',
        },
      };
    case 'hello':
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Hallo, <@${interaction.member.user.id}>! 👋`,
        },
      };
    case 'help':
      const commandList = Object.values(commands)
        .map(cmd => `**/${cmd.name}** - ${cmd.description}`)
        .join('\n');
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `📋 **Verfügbare Commands:**\n${commandList}`,
        },
      };
    default:
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: '❌ Unbekanntes Command!',
        },
      };
  }
}

// Verifiziere Discord Request
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Nur POST Requests für Interactions
    if (request.method !== 'POST') {
      return new Response('Not Found', { status: 404 });
    }

    // Verifiziere den Request mit dem Public Key
    const signature = request.headers.get('X-Signature-Ed25519');
    const timestamp = request.headers.get('X-Signature-Timestamp');
    const body = await request.text();
    
    const isValidRequest = verifyKey(
      body,
      signature,
      timestamp,
      env.DISCORD_PUBLIC_KEY
    );
    
    if (!isValidRequest) {
      return new Response('Bad request signature', { status: 401 });
    }

    const interaction = JSON.parse(body);
    
    // Handle Ping (für Discord zu prüfen ob der Bot lebt)
    if (interaction.type === InteractionType.PING) {
      return new Response(JSON.stringify({ type: 1 }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Handle Application Commands
    if (interaction.type === InteractionType.APPLICATION_COMMAND) {
      const response = await handleCommand(interaction);
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response('OK', { status: 200 });
  },
};
