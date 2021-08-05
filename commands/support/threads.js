module.exports = {
    name: "threads",
    description: "Manage threads",
    args: true,
    usage: "<add/remove>",
    async execute(Discord, bot, connection, message, args, useprefix) {
        if(args[0].toLowerCase()=="add") {
            // create thread
            let threadName = "New Thread!";
            let threadDescription = "A new thread to chat in!";

            await message.reply("What is the desired name of the thread?");
            try {
                threadName = await message.channel.awaitMessages(m => m.author.id == message.author.id,{ time: 30000, max: 1, errors: ['time'] });
            } catch {
                message.reply("No response was said in time.");
            };
            
            // await message.reply("What is the desired description of the thread?");
            // threadDescription = await message.channel.awaitMessages(m => m.author.id == message.author.id,{ time: 30000, max: 1, errors: ['time'] }).catch(message.reply("No response was said in time."));

            message.channel.threads.create({
                name: threadName,
                autoArchiveDuration: 60,
                reason: `${message.author.user.username} requested the channel be created.`,
            })
            .then(threadChannel => threadChannel.send(threadDescription))
            .then(threadChannel => console.log(`Thread made: ${threadChannel.id}`))
            .catch(err => console.error(err.message));
        };
    },
};