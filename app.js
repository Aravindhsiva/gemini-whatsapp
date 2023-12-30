import venom from 'venom-bot';
import textOnly from "./text-gen.js";

venom
    .create({
        session: 'gemini-session' //name of session
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });


function start(client) {
    client.onMessage(async (message) => {
        if (message.isGroupMsg === false) {
            let response = await textOnly(message.body);
            if (response) {
                client
                    .sendText(message.from, response)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
            } else {
                client
                    .sendText(message.from, "Error While responding")
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
            }
        }
    });
}
