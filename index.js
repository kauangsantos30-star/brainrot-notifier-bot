const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');
const app = express();

app.use(express.json());

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const CHANNEL_ID = '1454106662721028246'; 

// TESTE AUTOMÁTICO AO LIGAR
client.once('ready', async () => {
    console.log(`✅ Bot logado como ${client.user.tag}`);
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        await channel.send("🚀 **O bot kauanu791 acabou de ligar e está pronto!**");
        console.log("✅ Mensagem de teste enviada com sucesso!");
    } catch (e) {
        console.log("❌ Erro ao enviar teste inicial: " + e.message);
    }
});

app.post('/webhook-brainrot', async (req, res) => {
    const { item, money, jobId, placeId } = req.body;
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        const embed = new EmbedBuilder()
            .setColor(0x9B59B6)
            .setTitle('💎 NOVO SECRET DETECTADO!')
            .addFields(
                { name: 'Item:', value: `${item}`, inline: false },
                { name: 'Money:', value: `$${money}`, inline: false },
                { name: '\u200B', value: `[CLIQUE PARA ENTRAR](https://www.roblox.com/games/${placeId}?jobId=${jobId})`, inline: false }
            )
            .setFooter({ text: 'kauanu791 • Filtro 5M+' });

        await channel.send({ embeds: [embed] });
        res.status(200).send('Enviado');
    } catch (error) {
        res.status(500).send('Erro');
    }
});

client.login(process.env.DISCORD_TOKEN);
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => { console.log(`🚀 Online na porta ${PORT}`); });

