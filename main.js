const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const { Transaction } = require("./Transaction");
const { BlockChain } = require("./BlockChain");

const chain = new BlockChain();

const ziyaKeys = ec.keyFromPrivate(
  "86abc91f1cd74bcfccc5b0508f6d7e019d114e2e99139a2d11ff362cd6ffc82c"
);
const ziyasPublicAdress = ziyaKeys.getPublic("hex");

const baranKeys = ec.keyFromPrivate(
  "86abc91f1cd74bcfccc5b0508f6d7e019d114e2e99139a2d11ff362cd6ffc82a"
);
const baranPublicAdress = baranKeys.getPublic("hex");

const tx1 = new Transaction(ziyasPublicAdress, baranPublicAdress, "document");
tx1.signTransaction(ziyaKeys);

const tx2 = new Transaction(baranPublicAdress, ziyasPublicAdress, "belge");
tx2.signTransaction(baranKeys);

chain.addTransaction(tx1);
chain.minePendingTransactions();

chain.addTransaction(tx2);

chain.minePendingTransactions();
console.log(chain.chain[0]);
console.log(chain.chain[1]);
console.log(chain.chain[2]);
console.log(chain.chain[3]);
console.log("Chain validity is ", chain.isChainValid());
