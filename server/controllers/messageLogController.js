let messageLog = [
  {
      id: 0,
      user: 'SYSTEM',
      message: 'Welcome to chat. Keep it clean.'
  }
];

let id = 1;

module.exports = {
  getAll: (req, res) => {
      console.log('>>> Anonymous person got all messages!')

      res.status(200).send(messageLog);
  },
  addOne: (req, res) => {
      const { user, message } = req.body;

      console.log(`${user} says: ${message}`)

      const newMessage = {
          id,
          user,
          message
      }

      id++;

      messageLog.unshift(newMessage);

      res.status(200).send(messageLog);
  },
  editOne: (req, res) => {
      const { user, message } = req.body;
      const { messageId } = req.params;

      const tgtIndex = messageLog.findIndex((message) => message.id === +messageId);

      if(tgtIndex === -1) {
          console.log(`>>> ${user} is lost in the woods sadface.jpeg`)
          res.status(200).send('Message not found!')
      } else {
        console.log(`>>> ${user} changed ${messageLog[tgtIndex].user}'s message from "${messageLog[tgtIndex].message}" to "${message}"`)

          messageLog[tgtIndex].message = message;

          res.status(200).send(messageLog);
      }

  },
  deleteAll: (req, res) => {
      const { user } = req.params;

      messageLog = [];
      console.log(`>>> ${user} has nuked the message log!`)

      res.sendStatus(200);
  }
}