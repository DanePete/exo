"use strict";function _typeof(o){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o})(o)}!function(e,n,s){n.Exo.event("reveal").on("exo.aos",function(o){n.behaviors.exoAos={attach:function(o){var t;s.exoAos&&(t={},s.exoAos.defaults&&"object"===_typeof(s.exoAos.defaults)&&(t=s.exoAos.defaults),e(o).find("[data-aos]").once("exo.aos").on(n.Exo.transitionEvent+".exo.aos",function(o){var t=new Event("aos:finish");document.dispatchEvent(t)}),AOS.init(t),delete s.exoAos)}},n.behaviors.exoAos.attach(document.body)})}(jQuery,(_,Drupal),drupalSettings);