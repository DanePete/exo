"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}!function(l){var e=function(){function e(){_classCallCheck(this,e),this.events={show:new ExoEvent,hide:new ExoEvent},this.items=new ExoCollection}return _createClass(e,[{key:"attach",value:function(n){var o=this,i=(this.toolbar=n).getRegions();n.getItems().each(function(e){var t=e.get("toggle");t&&!o.items.has(e.getId())&&(i.getNonEmpty().has(t.region)||1===t.ajax?o.items.getById(e.getId())||o.items.add(e.getId(),new g(o,n,e)):e.getElement().remove())})}},{key:"getShown",value:function(){var n=new ExoCollection;return this.items.each(function(e,t){e.isShown()&&n.add(t,e)}),n}},{key:"getShownByEdge",value:function(n){var o=new ExoCollection;return this.getShown().each(function(e,t){e.getRegion().getEdge()===n&&o.add(t,e)}),o}},{key:"getShownByRegionId",value:function(n){var o=new ExoCollection;return this.getShown().each(function(e,t){e.getRegion().getId()===n&&o.add(t,e)}),o}},{key:"hide",value:function(e){e=this.getShown().getById(e);return e&&e.hide(),this}},{key:"hideByRegionId",value:function(t){return this.getShown().each(function(e){e.getRegion().getId()===t&&e.hide()}),this}},{key:"hideAll",value:function(){return this.getShown().each(function(e){e.hide()}),this}},{key:"hideAllExceptEdge",value:function(t){return this.getShown().each(function(e){e.getRegion().getEdge()!==t&&e.hide()}),this}},{key:"hideAllAfterRegion",value:function(e){var e=this.toolbar.getRegion(e),t=e.getOffset();return this.getShownByEdge(e.getEdge()).each(function(e){e.getRegion().getOffset()>t&&e.hide()}),this}},{key:"event",value:function(e){return void 0!==this.events[e]?this.events[e].expose():null}}]),e}(),g=(l.ExoToolbarToggle=new e,function(){function o(e,t,n){_classCallCheck(this,o),this.shown=!1,this.toggleOptions=n.get("toggle"),this.toggleController=e,this.toolbar=t,this.item=n,this.region=t.getRegion(this.toggleOptions.region),this.ajax=1===this.toggleOptions.ajax,this.event=this.ajax?"click":this.toggleOptions.event,this.buildBindings(),this.ajax||this.buildEvents()}return _createClass(o,[{key:"buildBindings",value:function(){var t,o=this,n=!1;"hover"===this.event&&this.item.getElement().on("mouseenter.exoToolbarToggle",function(e){e.preventDefault(),n=!0,setTimeout(function(){n=!1},1e3),t=setTimeout(function(){o.show()},250)}).on("mouseleave.exoToolbarToggle",function(e){clearTimeout(t)}),this.item.getElement().on("click.exoToolbarToggle",function(e){e.preventDefault(),!1===n&&(o.ajax&&!o.region?l.ajax({url:"/api/exo/toolbar/region/"+o.toggleOptions.region.replace("item:","")}).execute().done(function(e,t,n){l.ExoToolbar.isReady().then(function(){o.region=o.toolbar.getRegion(o.toggleOptions.region),o.region&&(o.buildEvents(),o.toggle())})}):o.toggle())})}},{key:"buildEvents",value:function(){var t=this;"vertical"===this.region.getAlignment()&&(this.region.event("expand").on("toggle."+this.item.getId(),function(e){t.toggleController.hideAllExceptEdge(t.region.getEdge())}),this.region.event("contracted").on("toggle."+this.item.getId(),function(e){t.hide()}))}},{key:"isShown",value:function(){return!0===this.shown}},{key:"toggle",value:function(){this.isShown()?this.hide():this.show()}},{key:"isNested",value:function(){return this.item.getRegion().getEdge()===this.region.getEdge()}},{key:"isSameAlignment",value:function(){return this.item.getRegion().getAlignment()===this.region.getAlignment()}},{key:"show",value:function(){var s=this;return new Promise(function(t,e){if(s.isShown())t(!0);else{if(s.region.positionLock(!0),s.isNested()){var n={},o=!1;if(s.toggleController.getShownByEdge(s.region.getEdge()).each(function(e){s.item.getRegion().getId()===e.getItem().getRegion().getId()&&(o=!0,e.hide().then(function(){s.show().then(function(e){t(e)})}))}),o)return;s.toolbar.getEdgeOffsetsByEdge(s.region.getEdge()).forEach(function(e){n[e]=s.item.getRegion().getElement().css(e)}),s.region.getElement().css(n),s.item.getRegion().getElement().removeClass(s.toolbar.regionLastClass),l.ExoModal&&l.ExoModal.closeAll()}else{var i,g;s.item.getRegion().get("toggleable")||(s.isSameAlignment()?(i={},s.toolbar.getEdgeOffsetsByEdge(s.region.getEdge()).forEach(function(e){i[e]=s.toolbar.getRegionSizeByEdge(e)}),s.region.getElement().css(i)):((g={})[s.item.getRegion().getEdge()]=s.item.getRegion().getSize()+s.item.getRegion().getOffset(),s.region.getElement().css(g),s.item.getRegion().zIndexSet("PARENT"),s.toolbar.zIndexRegionEdgeLock(s.item.getRegion().getEdge(),!0))),s.toggleController.hideAll()}s.toolbar.zIndexRegionEdgeLock(s.region.getEdge(),!1).zIndexRegionEdge(s.region.getEdge(),"FOCUSED").zIndexRegionEdgeLock(s.region.getEdge(),!0),s.toggleController.event("show").trigger(s),s.shown=!0,s.item.getElement().addClass(s.toolbar.itemActiveClass),s.region.show(!0,!0).then(function(e){t(e)}),s.region.getElement().addClass(s.toolbar.regionLastClass),l.Exo.showShadow({opacity:.3,onClick:function(e){s.hide()}})}})}},{key:"hide",value:function(){var n=this;return new Promise(function(t,e){n.isShown()?(n.shown=!1,n.isNested()?n.item.getRegion().getElement().addClass(n.toolbar.regionLastClass):n.toggleController.hideAll(),n.toggleController.event("hide").trigger(n),n.region.hide(!0).then(function(e){n.item.getRegion().get("toggleable")||n.isSameAlignment()||n.toolbar.zIndexRegionEdgeLock(n.item.getRegion().getEdge(),!1).zIndexRegionEdge(n.item.getRegion().getEdge()),n.region.positionLock(!1),t(e)}),n.item.getElement().removeClass(n.toolbar.itemActiveClass),n.region.getElement().removeClass(n.toolbar.regionLastClass),n.region.isExpandedByDefault()||n.region.getElement().removeClass(n.toolbar.regionExpandedClass),l.Exo.hideShadow()):(n.region.positionLock(!1),t(!0))})}},{key:"getRegion",value:function(){return this.region}},{key:"getItem",value:function(){return this.item}}]),o}());l.behaviors.exoToolbarToggle={attach:function(e){l.ExoToolbar.isAdminMode()||l.ExoToolbar.isReady().then(function(e){e.each(function(e){l.ExoToolbarToggle.attach(e)})})}}}((jQuery,Drupal),drupalSettings);