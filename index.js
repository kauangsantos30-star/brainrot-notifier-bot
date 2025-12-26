const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');
const app = express();

app.use(express.json());

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// ID do seu canal de texto no Discord
const CHANNEL_ID = '1321798544922054696'; 

app.post('/webhook-brainrot', async (req, res) => {
    const { item, money, jobId, placeId } = req.body;

    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        if (!channel) return res.status(404).send('Canal não encontrado');

        const embed = new EmbedBuilder()
            .setColor(0x9B59B6)
            .setTitle('💎 NOVO SECRET DETECTADO!')
            .addFields(
                { name: 'Item:', value: `${item}`, inline: false },
                { name: 'Money:', value: `$${money}`, inline: false },
                { name: '\u200B', value: `[CLIQUE PARA ENTRAR](https://www.roblox.com/games/${placeId}?jobId=${jobId})`, inline: false }
            )
            // Rodapé personalizado com seu nome
            .setFooter({ text: 'kauanu791 • Filtro 5M+ | Hoje às ' + new Date().toLocaleTimeString('pt-BR') });

        await channel.send({ embeds: [embed] });
        res.status(200).send('Enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        res.status(500).send('Erro interno no servidor');
    }
});

client.once('ready', () => {
    console.log(`✅ Bot logado com sucesso como ${client.user.tag}`);
});

// SEU TOKEN JÁ INSERIDO ABAIXO
client.login('MTQ1NDEwMzQxNDc2MTA2MjQ0MQ.GV4itC.C4emE4wPssZiIgPJlQgaRn5U6TlAtAoPWJaBI4');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

