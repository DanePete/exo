"use strict";function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}!function(n,e,o){var r=_createClass(function e(t,i){_classCallCheck(this,e),this.defaults={mode:"button",container:"#exo-content",format:"yyyy-mm-dd"},this.$element=t,this.settings=_.extend({},this.defaults,i),this.$input=this.$element.find('input[type="time"]'),this.$input.data("value",this.$input.val()),this.$input.pickatime(this.settings)});e.behaviors.exoFormTime={attach:function(e){if(o.exoForm&&o.exoForm.time&&o.exoForm.time.items)for(var i in o.exoForm.time.items)o.exoForm.time.items[i]&&n("#"+i,e).once("exo.form.time").each(function(e,t){new r(n(t),o.exoForm.time.items[i])})}}}(jQuery,Drupal,drupalSettings);