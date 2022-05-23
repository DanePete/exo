"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}!function(a,r){var t=new(function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"attach",value:function(e){var o=this;this.toolbar=e,this.$sortables=this.getSortables(e),this.$sections=e.getSections().elements(),this.$sortables.addClass("exo-toolbar-sortable"),this.$sections.sortable({items:".exo-toolbar-sortable",connectWith:".exo-toolbar-section",placeholder:"exo-toolbar-sort-placeholder",forcePlaceholderSize:!0,tolerance:"pointer",helper:"clone",forceHelperSize:!0,appendTo:a("body"),opacity:.9,scroll:!1,cursor:"move",start:function(e,t){return o.onSortableStart(e,t)},stop:function(e,t){return o.onSortableStop(e,t)},update:function(e,t){return o.onSortableUpdate(e,t)}}),this.$sortables.disableSelection()}},{key:"getSortables",value:function(e){var t=[];return e.getItems().each(function(e){e.allowSort()&&t.push(e.getSelector())}),a(t.join(", "))}},{key:"onSortableStart",value:function(e,t){this.$sections.each(function(e,t){var o=a(t).find(".exo-toolbar-create");a(t).css({minHeight:o.outerHeight(),minWidth:o.outerWidth()})}),this.toolbar.getElement().addClass("exo-toolbar-sorting"),this.toolbar.disableAsides()}},{key:"onSortableStop",value:function(e,t){this.$sections.css({minHeight:"",minWidth:""}),this.toolbar.getElement().removeClass("exo-toolbar-sorting"),this.toolbar.enableAsides(),this.toolbar.positionAsides()}},{key:"onSortableUpdate",value:function(e,t){var e=a(e.target).data("exo-section-id"),o=this.toolbar.getItem(t.item.data("exo-item-id")),t=this.toolbar.getSection(t.item.closest(".exo-toolbar-section").data("exo-section-id"));o&&t&&t.getId()===e&&(o.setSectionId(t.getBaseId()),o.setRegionId(t.getRegionId()),t.orderItems(),e=t.getItems(),a.ajax({url:r.url("api/exo/toolbar/items/update"),type:"POST",data:JSON.stringify(e.getData()),dataType:"json",success:function(e){}}))}}]),e}());r.behaviors.exoToolbarSort={attach:function(e){r.ExoToolbar.isAdminMode()&&r.ExoToolbar.isReady().then(function(e){e.each(function(e){t.attach(e)})})}}}(jQuery,(_,Drupal),drupalSettings);