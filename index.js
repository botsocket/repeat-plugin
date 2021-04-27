'use strict';

const Jade = require('@botsocket/jade');

module.exports = {
    name: 'repeat',
    register: (client) => {

        client.command({
            name: 'repeat',
            alias: ['say'],
            args: ['text'],
            flags: ['channel'],
            validate: {
                args: Jade.obj({
                    text: Jade.string().required(),
                }),
            },
            handler: async (message, { args: { text }, flags: { channel } }) => {

                if (!message.member.hasPermission('ADMINISTRATOR')) {
                    return message.reply(`You are missing the \`ADMINISTRATOR\` permission.`);
                }

                let c = message.channel;

                if (channel) {

                    if (message.client.channels.cache.has(channel)) {

                        c = message.client.channels.cache.get(channel);
                    }
                    else {

                        const match = channel.match(/<#(\d{17,19})>/);
                        if (message.client.channels.cache.has(match[1])) {
                            c = message.client.channels.cache.get(match[1]);
                        }
                    }
                }

                try {
                    await c.send(text);
                }
                catch {}
            },
        });
    },
};
