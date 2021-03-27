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
            data: {
                validation: {
                    args: Jade.object({
                        text: Jade.string().required(),
                    }),
                    failAction: 'error',
                },
                handler: async (message, { args: { text }, flags: { channel } }) => {

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
            },
        });
    },
};
