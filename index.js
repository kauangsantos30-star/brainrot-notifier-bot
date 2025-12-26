const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');
const app = express();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Já configurei seu ID aqui!
const CANAL_ID = '1454106662721028246'; 
const TOKEN = process.env.TOKEN;

app.use(express.json());

app.post('/webhook-brainrot', async (req, res) => {
    const { item, money, jobId, placeId } = req.body;
    
    // Filtro para pegar só o que for 5M pra cima
    const valor = parseFloat(money.replace(/[^0-9.]/g, ''));

    if (valor >= 5) {
        try {
            const canal = await client.channels.fetch(CANAL_ID);
            const embed = new EmbedBuilder()
                .setTitle("💎 NOVO SECRET DETECTADO!")
                .setDescription(`**Item:** ${item}\n**Money:** $${money}\n\n[CLIQUE PARA ENTRAR](https://www.roblox.com/games/start?placeId=${placeId}&gameInstanceId=${jobId})`)
                .setColor(0x800080)
                .setTimestamp()
                .setFooter({ text: "Liphyr Style • Filtro 5M+" });

            await canal.send({ embeds: [embed] });
            res.status(200).send("Enviado com sucesso!");
        } catch (e) {
            res.status(500).send("Erro ao enviar para o Discord");
        }
    } else {
        res.status(200).send("Item abaixo de 5M ignorado.");
    }
});

client.login(TOKEN);
app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando e pronto para receber os Secrets!");
});
