"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}!function(i,e){var n=function(){function t(e){_classCallCheck(this,t),this.$element=e,this.$field=this.$element.find('input[type="file"]'),this.$field.after('<div class="exo-form-input-line" />'),this.bind()}return _createClass(t,[{key:"bind",value:function(){var e=this;this.$field.on("change.exo.form.file",function(){e.onChange.call(e)})}},{key:"onChange",value:function(e){var t;""!=this.$field.val()&&(t=this.$field.val().toString().replace(/.*(\/|\\)/,""),this.$field.closest(".exo-form-file-input").attr("data-text",t))}}]),t}();e.behaviors.exoFormFile={attach:function(e){i(e).find(".exo-form-file-js").once("exo.form.file").each(function(e,t){new n(i(t))})}}}(jQuery,Drupal);