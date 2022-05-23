"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}!function(e){var t=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getHash",value:function(){return window.location.hash}},{key:"getHashAsObject",value:function(e){var t=this.getHash(),r={};if(t)for(var n=t.replace("#","").split("&"),o=0;o<n.length;o++){var s=n[o];if(s.substring(0,4)===e.substring(0,4)){var a=s.split("~");if(void 0!==a[1])for(var i=a[1].split("|"),l=0;l<i.length;l++){var c=i[l].split("--");1<c.length?(r[a[0]]={},r[a[0]][c[0]]=c[1]):r[a[0]]=c[0]}}}return r}},{key:"setHash",value:function(e){history.pushState?history.pushState({hash:e},null,"#"+e):location.hash=e}},{key:"setHashAsObject",value:function(e){var t,r="";for(t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var n=e[t];if(""!==r&&(r+="&"),r+=t+"~","object"===_typeof(n)){var o,s="";for(o in n)Object.prototype.hasOwnProperty.call(n,o)&&(""!==s&&(s+="|"),s+=o+"--"+n[o]);r+=s}else r+=n}return this.setHash(r),this}},{key:"getHashForKey",value:function(e){var t=this.getHashAsObject(e);return void 0!==t[e]?t[e]:null}},{key:"setHashForKey",value:function(e,t,r){var n=this.getHashAsObject(e);return r?(void 0===n[e]&&(n[e]={}),n[e][r]=t):n[e]=t,this.setHashAsObject(n)}},{key:"removeHashForKey",value:function(e,t,r){var n=this.getHashAsObject(e);if(void 0!==n[e])if(r){delete n[e][r];var o,s=!0;for(o in n[e])Object.prototype.hasOwnProperty.call(n,o)&&(s=!1);!0===s&&delete n[e]}else delete n[e];return this.setHashAsObject(n)}}]),e}();e.ExoAlchemistEnhancement=new t}((jQuery,Drupal));