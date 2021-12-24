const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("permissions")
        .setDescription("Check permissions of a user, role or channel")
        .addSubcommand(subcommand => subcommand
            .setName("channel")
            .setDescription("Get permissions of a channel.")
            .addChannelOption(option => option
                .setName("target")
                .setDescription("The channel to check")
                .setRequired(true),
            ),
        )
        .addSubcommand(subcommand => subcommand
            .setName("role")
            .setDescription("Get permissions of a role")
            .addRoleOption(option => option
                .setName("target")
                .setDescription("The role to check")
                .setRequired(true),   
            ), 
        )
        .addSubcommand(subcommand => subcommand
            .setName("user")
            .setDescription("Get permissions of a user")
            .addUserOption(option => option
                .setName("target")
                .setDescription("The user to check")
                .setRequired(true),    
            ),
        ),

    async execute (interaction) {
        // Code to run when executed.
        let option = interaction.options.getSubcommand();

        if (option === "channel") {
            let target = interaction.options.getChannel("target");
            let permissions = target.permissionOverwrites;

            let permEmbed = new Discord.MessageEmbed()
            .setcolor()

            console.log(permissions);
            interaction.reply({content: `The permissions of the channel **${target.name}** are as follows.\nPermissions: \`${JSON.stringify(permissions[0].permissionOverwrites)}\`\nNSFW: \`${JSON.stringify(permissions[0].nsfw)}\``});
        } else if (option === "user") {
            let target = interaction.options.getMember("target");
            let permissions = target.permissions.toArray().sort().join(" ");
            let roles = target.roles.cache.map(role => role.name.toString()).join(" ");
            console.log(permissions);
            interaction.reply({content: `The permissions of the user **${target.displayName}** are as follows:\n\`${permissions}\`\nRoles: \`${roles}\``});
        } else if (option === "role") {
            let target = interaction.options.getRole("target");
            let permissions = target.permissions.toArray().sort().join(" ");
            console.log(permissions);
            interaction.reply({content: `The permissions of the role **${target.name}** are as follows:\n\`${permissions}\``});
        } else {
            interaction.reply({content: "There was no selected operation to perform.", ephemeral: true});
        }
    }
};