// const token = process.env.token;
const token = process.env.betatoken;
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: "registercommands",
    description: "JCoNet only command!",
    args: false,
    async execute(Discord, bot, connection, message, args, useprefix) {
        await message.delete();

        const rest = new REST({ version: '9' }).setToken(process.env.betatoken);
        rest.get(Routes.applicationGuildCommands(process.env.botbetaid,process.env.testserver)).then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            return Promise.all(promises);
        });

    },
};