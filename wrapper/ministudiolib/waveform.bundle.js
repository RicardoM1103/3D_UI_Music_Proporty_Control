!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="https://wamonline.blog/wp-content/uploads/2018/08/",n(n.s=17)}({17:function(t,e,n){"use strict";var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(o,i){function u(t){try{c(r.next(t))}catch(t){i(t)}}function a(t){try{c(r.throw(t))}catch(t){i(t)}}function c(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(u,a)}c((r=r.apply(t,e||[])).next())})},o=this&&this.__generator||function(t,e){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(e,"__esModule",{value:!0});var i=n(18),u=n(4),a=n(7);console.log("WaveformCalculator worker started"),onmessage=function(t){(function(t){return r(this,void 0,void 0,function(){var e;return o(this,function(n){switch(n.label){case 0:switch(t.command){case"calculate":return[3,1];case"cancelRequests":return[3,3]}return[3,4];case 1:return[4,c.defer(function(){return function(t,e,n){return e.sharedChannels.map(function(r,o){for(var i=function(t,e){return Math.round(e/t.pixelsPerSecond)}(t,e.sampleRate),a=Math.ceil(r.length/i),c=new u.WaveformData(a,n&&n[o]),f=n&&n[o]?n[o].len-1:0;f<a;f++){for(var s=1,l=-1,p=f*i;p<(f+1)*i;p++)s>r[p]&&(s=r[p]),l<r[p]&&(l=r[p]);c.set(f,s,l)}return c})}(t.pps,t.audioData)})];case 2:return[2,[{waveform:e=n.sent()},a.flatten(e.map(function(t){return[t.min.buffer,t.max.buffer]}))]];case 3:c.clear(),n.label=4;case 4:return[2]}})})})(t.data.cmd).then(function(e){if(e){var n=e[0],r=e[1];postMessage({id:t.data.id,resp:n},r)}})};var c=new i.TaskQueue},18:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){this.queue=[],this.working=!1}return t.prototype.defer=function(t){var e=this;return new Promise(function(n){return e.add(function(){n(t())})})},t.prototype.clear=function(){this.queue.length>0&&(this.queue=[])},t.prototype.add=function(t){this.queue.push(t),this.working||this.startWorking()},t.prototype.startWorking=function(){var t=this;this.working=!0,setTimeout(function(){return t.work()},0)},t.prototype.work=function(){var t=this,e=this.queue.shift();e?(e(),setTimeout(function(){return t.work()},0)):this.working=!1},t}();e.TaskQueue=r},4:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){if("number"==typeof t){var n=t;this.len=n,e&&e.len==n?(this.min=e.min,this.max=e.max):(this.min=new Float32Array(n),this.max=new Float32Array(n)),e&&e.len!=n&&(this.min.set(e.min),this.max.set(e.max))}else{var r=t;this.len=r.len,this.min=r.min,this.max=r.max}}return t.prototype.set=function(t,e,n){this.min[t]=e,this.max[t]=n},t.prototype.forSome=function(t,e,n){e>this.len&&(e=this.len);for(var r=t;r<e;r++)n(r,this.min[r],this.max[r])},t}();e.WaveformData=r},7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.withoutNulls=function(t){return t.filter(function(t){return null!=t})},e.withoutUndefined=function(t){return t.filter(function(t){return void 0!=t})},e.withoutDuplicates=function(t){return t.filter(function(e,n){return t.indexOf(e)==n})},e.reversedForEach=function(t,e){for(var n=t.length-1;n>=0;n--)e(t[n])},e.removeFrom=function(t,e){var n=t.indexOf(e);return n>=0&&(t.splice(n,1),!0)},e.remove=function(t,e){var n=t.findIndex(e);return n>=0&&(t.splice(n,1),!0)},e.arrayFromMapLike=function(t){var e=[];return t.forEach(function(t){return e.push(t)}),e},e.arrayFrom=function(t){return Array.prototype.map.call(t,function(t){return t})},e.merge=function(t,e){return t.concat(e.filter(function(e){return!t.includes(e)}))},e.flatten=function(t){return[].concat.apply([],t)}}});