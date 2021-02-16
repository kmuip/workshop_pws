const forge=require("node-forge"),MtoAes=(()=>{if(null==forge)throw new Error("forge.js library required");const e=function(e,t,r){this.key=e,this.iv=t,this.base64Encoded=r,null!=this.key&&(this.key=this.base64Encoded?forge.util.decode64(this.key):this.key),null!=this.iv&&(this.iv=this.base64Encoded?forge.util.decode64(this.iv):this.iv)};return e.prototype.setKey=function(e,t){if(null==e)throw new Error("key is null or undefined");this.key=t?forge.util.decode64(e):e},e.prototype.setIv=function(e,t){if(null==e)throw new Error("init vektor is null or undefined");this.iv=t?forge.util.decode64(e):e},e.prototype.generateRandomBytes=function(e){return forge.random.getBytesSync(e)},e.prototype.encrypt=function(e,t){if(null==this.key||""===this.key)throw new Error("AES key is required");if(null==this.iv||""===this.iv)throw new Error("AES init vector is required");if(null==e)return null;var r=forge.cipher.createCipher("AES-CBC",this.key);r.start({iv:this.iv}),r.update(forge.util.createBuffer(e)),r.finish();var i=r.output.data;return t?forge.util.encode64(i):i},e.prototype.decrypt=function(e,t){if(null==this.key)throw new Error("AES key is required");if(null==this.iv)throw new Error("AES init vector is required");if(null==e)return null;var r=t?forge.util.decode64(e):e,i=forge.aes.startDecrypting(this.key,this.iv),o=forge.util.createBuffer(r);i.update(o);i.finish();return i.output.data},e})();module.exports.MtoAes=MtoAes;