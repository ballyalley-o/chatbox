

const User = function(name) {
    this.name = name;
    this.chatbox = null;
}

User.prototype = {
    send: function(message, to) {
      //send message to chatbox in input with classname messageTo1
      document.querySelector('.to1').innerHTML = `<span style="display: inline-block;"><h2>${this.name}:</h2>
                                                    <p>${message}</p></span>`;

      this.chatbox.send(message, this, to);
    },

    receive: function(message, from) {
        document.querySelector('.message').innerHTML = `${from.name}: ${message}`
    }
}

const Chatbox = function() {
    let users = {}

    return {
        register: function(user) {
            users[user.name] = user;
            user.chatroom = this;

        },

        send: function(message, from, to) {
            if (to) {
                to.receive(message, from);
                message.value = document.querySelector(
                  ".to1"
                ).innerHTML = `<p>${message}</p>`;
            } else {
                // broadcast message to all users
                for (key in users) {
                    if (users[key] !== from) {
                        users[key].receive(message, from);
                        users[key].value = document.querySelector('.to1').value = message;
                    }
                }
            }
        }
    }
}

const athena = new User('Athena');
const brielle = new User('Brielle');
const cece = new User('Cece');

const chatbox1 = new Chatbox();

chatbox1.register(athena);
chatbox1.register(brielle);
chatbox1.register(cece);








