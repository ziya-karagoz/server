const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { Block } = require("./Block");
const io = new Server(server);
const { BlockChain } = require("./BlockChain");
const Transaction = require("./Transaction");
const path = require("path");

const blockChain = new BlockChain();

/*
function getChain(socket) {
  let block = Object.assign(new Block(), JSON.parse(chain));
  let asd = block.transactions.map((tra) =>
    Object.assign(new Transaction(), tra)
  );
  block.transactions = asd;
  blockChain.chain.push(block);
  if (tempBlockChain.isChainValid()) {
    io.emit("send-trans", chain);
  } else {
    block.chain.pop();
  }
}
*/

io.on("connection", (socket) => {
  socket.emit("request-chain", JSON.stringify(blockChain.chain));
  socket.on("get-chain", (chain) => {
    let tempChain = JSON.parse(chain);
    let newChain = [];

    let newBlock = null;
    let newTrans = null;

    for (let i = 0; i < tempChain.length; i++) {
      newBlock = Object.assign(new Block(), tempChain[i]);
      let tempTrans = [];
      for (let j = 0; j < newBlock.transactions.length; j++) {
        newTrans = Object.assign(new Transaction(), newBlock.transactions[j]);
        tempTrans.push(newTrans);
      }
      newBlock.transactions = tempTrans;
      newChain.push(newBlock);
    }

    let tempBlockChain = new BlockChain();
    tempBlockChain.chain = newChain;
    if (
      tempBlockChain.isChainValid() &&
      tempBlockChain.chain.length > blockChain.chain.length
    ) {
      blockChain.chain = newChain;
      io.emit("send-chain", JSON.stringify(blockChain.chain));
    }
  });
  socket.on("disconnect", (msg) => {
    console.log("Kullanici cikis yapti");
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(__dirname + "../client/build/index.html")
  );
}

server.listen(process.env.PORT || 5000);

/*
    let trans = [];
    for (let j = 0; j < block.transactions.length; j++) {
      trans.push(Object.assign(new Transaction(), block.transactions[j]));
    }
    block.transactions = trans;
    */

/*
    let tempChain = JSON.parse(chain);
    let newChain = [];

    let newBlock = null;
    let newTrans = null;

    for (let i = 0; i < tempChain.length; i++) {
      newBlock = Object.assign(new Block(), tempChain[i]);
      let tempTrans = [];
      for (let j = 0; j < newBlock.transactions.length; j++) {
        newTrans = Object.assign(new Transaction(), newBlock.transactions[j]);
        tempTrans.push(newTrans);
      }
      newBlock.transactions = tempTrans;
      newChain.push(newBlock);
    }

    let tempBlockChain = new BlockChain();
    tempBlockChain.chain = newChain;
    if (
      tempBlockChain.isChainValid() &&
      tempBlockChain.chain.length > blockChain.chain.length
    ) {
      blockChain.chain = newChain;
      io.emit("send-chain", JSON.stringify(blockChain.chain));
    }
    */
