const SHA256 = require("crypto-js/sha256");
const { Transactions } = require("./Transaction");
class Block {
  constructor(timestamp, transactions = [], previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    let temp = "";
    for (const tx of this.transactions) {
      temp += tx.calculateHash();
    }
    return SHA256(
      this.previousHash + this.timestamp + JSON.stringify(this.data) + temp
    ).toString();
  }

  hasValidTransaction() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }
    return true;
  }
}

module.exports.Block = Block;
