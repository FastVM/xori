(()=>{"use strict";var e,t,r,n,a={},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var r=o[e]={exports:{}};return a[e].call(r.exports,r,r.exports,i),r.exports}i.m=a,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var a=Object.create(null);i.r(a);var o={};e=e||[null,t({}),t([]),t(t)];for(var c=2&n&&r;"object"==typeof c&&!~e.indexOf(c);c=t(c))Object.getOwnPropertyNames(c).forEach((e=>o[e]=()=>r[e]));return o.default=()=>r,i.d(a,o),a},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,r)=>(i.f[r](e,t),t)),[])),i.u=e=>({528:"codemirror",931:"minivm"}[e]+".js"),i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},n="traffic:",i.l=(e,t,a,o)=>{if(r[e])r[e].push(t);else{var c,l;if(void 0!==a)for(var u=document.getElementsByTagName("script"),s=0;s<u.length;s++){var f=u[s];if(f.getAttribute("src")==e||f.getAttribute("data-webpack")==n+a){c=f;break}}c||(l=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.setAttribute("data-webpack",n+a),c.src=e),r[e]=[t];var d=(t,n)=>{c.onerror=c.onload=null,clearTimeout(p);var a=r[e];if(delete r[e],c.parentNode&&c.parentNode.removeChild(c),a&&a.forEach((e=>e(n))),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=d.bind(null,c.onerror),c.onload=d.bind(null,c.onload),l&&document.head.appendChild(c)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{var e={179:0};i.f.j=(t,r)=>{var n=i.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var a=new Promise(((r,a)=>n=e[t]=[r,a]));r.push(n[2]=a);var o=i.p+i.u(t),c=new Error;i.l(o,(r=>{if(i.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var a=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;c.message="Loading chunk "+t+" failed.\n("+a+": "+o+")",c.name="ChunkLoadError",c.type=a,c.request=o,n[1](c)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,a,[o,c,l]=r,u=0;if(o.some((t=>0!==e[t]))){for(n in c)i.o(c,n)&&(i.m[n]=c[n]);l&&l(i)}for(t&&t(r);u<o.length;u++)a=o[u],i.o(e,a)&&e[a]&&e[a][0](),e[o[u]]=0},r=self.webpackChunktraffic=self.webpackChunktraffic||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();const c=i.e(931).then(i.t.bind(i,260,23)).then((async e=>e)),l=Object.getPrototypeOf((async()=>{})).constructor,u="void",s="int",f="int",d="int",p=[Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigUint64Array,BigUint64Array],m=(e,t)=>async(r,n)=>{const a=async r=>{const n=e.ccall("vm_api_new",d,[s,f],[t,r.length]);for(let a=0;a<r.length;a++){const i=await o(r[a]);e.ccall("vm_api_set",u,[s,d,f,d],[t,n,a,i])}return n},o=async r=>{if("string"==typeof x)return await a(Uint8Array.from(r).buffer);if(Array.isArray(r))return await a(r);if("number"==typeof r)return await(async r=>e.ccall("vm_api_of_num",d,[s,"int"],[t,r]))(r);if(null==r)return await(async()=>e.ccall("vm_api_of_none",d,[s],[t]))();if(r instanceof Response)return await o(await r.arrayBuffer());if(r instanceof ArrayBuffer)return await o(new Uint8Array(r));for(const e of p)if(r instanceof e)return await a(Array.from(r));throw new Error(`cannot serialize: ${r}`)},i=await o(n);e.ccall("vm_api_stack_set",u,[s,f,d],[t,r,i])};i.e(528).then(i.t.bind(i,631,23)).then((({default:e})=>{const t=e.fromTextArea(document.getElementById("editor"),{mode:"plaintext",theme:"material-darker",lineNumbers:!0});ed=()=>t.getValue()})),window.runit=()=>{},window.ed=()=>document.getElementById("editor").value,document.body.onload=()=>{const e=document.getElementById("terminal"),t={write:t=>{e.innerText+=String(t)},reset:()=>{e.innerText=""}};window.runit=async()=>{let e=ed();console.log(e),e=e.replace(/\s+/g," ");const r=await(async(e,t)=>{const{default:r}=await c;let n=[];const a=["./boot.vm","-e",`import("browser.paka") ${e}`],o={print:e=>{t.write(e),t.write("\n")},vm_do_eval_func:(e,t)=>{n.push([e,new l(t)])},vm_do_file_put_func:e=>{}},i=await r(o),u=new Date;t.reset();for(const e of a)i.ccall("vm_main_add_arg","void",["string"],[e]);let s=i.ccall("vm_main_default","int",[],[]);for(;0!==s;){const e=m(i,s);for(;n.length>0;){let[t,r]=n.pop();const a=await r();await e(t,a)}s=i.ccall("vm_run","int",["int"],[s])}return new Date-u})(e,t);document.getElementById("time").innerText=`${r}ms`}}})();