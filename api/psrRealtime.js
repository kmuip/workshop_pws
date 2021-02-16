const{Subject:Subject}=require("rxjs"),forge=require("node-forge");module.exports=(()=>{function e(e){this._subject=new Subject,this._observable=this._subject.asObservable(),this._reconnectTimer=null,this.endpoint=null,this.ws=null;const n=[":11016",":11016/","/api","/api/"];let s=!1;e=e.startsWith("https://")?e.split("https://")[1]:e;for(const i of n)if(e.endsWith(i)){i.startsWith(":11016")&&(s=!0),e=t(e,i);break}const i=s?":11018":"/realtime";this.endpoint=`wss://${e}${i}`}function t(e,t){const n=e.split(t);return n.filter((e,t)=>t!==n.length-1).join(t)}return e.prototype.connect=function(e){if(clearTimeout(this._reconnectTimer),this._reconnectTimer=null,"undefined"==typeof WebSocket)console.warn("Realtime events are not yet available in a node.js environment.");else{const t=new WebSocket(this.endpoint);t.onopen=(()=>{t.send(JSON.stringify({Command:"Register",Data:forge.util.encode64(JSON.stringify(e))}))}),t.onmessage=(e=>{const t=JSON.parse(e.data);t.Channel&&(t.Data=JSON.parse(t.Data),this._subject.next(t))}),t.onclose=(t=>{1e3!==t.code&&(this._reconnectTimer=setTimeout(()=>{this.connect(e)},3e3))}),this.ws=t}},e.prototype.closeConnection=function(){clearTimeout(this._reconnectTimer),this._reconnectTimer=null,this.ws&&this.ws.close(1e3)},e})();