"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}!function(p,m,v,f){var e=function(){function e(){_classCallCheck(this,e),this.label="ExoAlchemistAdmin",this.doDebug=!1,this.ranOnce=!1,this.overlapOffset=10,this.$activeTarget=null,this.$activeComponent=null,this.$activeField=null,this.watchFinished=null}return _createClass(e,[{key:"setup",value:function(){var t=this;this.buildElements(),m.Exo.$document.on("drupalViewportOffsetChange",function(e){t.$activeTarget&&!t.$activeComponent&&t.sizeTarget(t.$activeTarget)}),m.Exo.addOnResize("exo.alchemist",function(e){t.$activeComponent&&t.sizeComponentOverlay(t.$activeComponent),t.$activeField&&t.sizeFieldOverlay(t.$activeField),t.$activeTarget&&t.sizeTarget(t.$activeTarget)}),document.addEventListener("aos:finish",function(e){t.watch()})}},{key:"buildElements",value:function(){this.$obtrusiveElements=p(".exo-fixed-region, .exo-layout-builder-top").addClass("exo-component-hide"),this.$shade=p('<div class="exo-alchemist-shade" />').appendTo(m.Exo.$exoContent),this.$highlight=p('<div class="exo-alchemist-highlight" />').appendTo(m.Exo.$exoContent),this.$overlay=p('<div class="exo-alchemist-overlay exo-reset exo-font" />').appendTo(m.Exo.$exoContent),this.$overlayHeader=p('<div class="exo-alchemist-overlay-header" />').appendTo(this.$overlay),this.$overlayOps=p("<span />").appendTo(this.$overlayHeader).wrap('<div class="exo-alchemist-ops exo-alchemist-overlay-ops" />'),this.$overlayClose=p('<div class="exo-alchemist-overlay-close" />').appendTo(this.$overlayHeader),this.$overlayClose.html("<a>"+v.exoAlchemist.icons.close+"</a>"),this.$target=p('<div class="exo-alchemist-target exo-reset exo-font" />').appendTo(m.Exo.$exoContent),this.$targetHeader=p('<div class="exo-alchemist-target-header" />').appendTo(this.$target),this.$targetTitle=p('<div class="exo-alchemist-target-title" />').appendTo(this.$target),this.$targetOps=p("<span />").appendTo(this.$targetHeader).wrap('<div class="exo-alchemist-ops exo-alchemist-target-ops" />'),this.$targetClose=p('<div class="exo-alchemist-target-close" />').appendTo(this.$targetHeader),this.$targetClose.html("<a>"+v.exoAlchemist.icons.close+"</a>"),this.$fieldBreadcrumbs=p('<ul class="exo-alchemist-breadcrumbs" />').appendTo(this.$overlay)}},{key:"attach",value:function(o){var n=this;return!1===this.ranOnce&&(this.ranOnce=!0,this.setup()),new Promise(function(e,t){function i(){p("#layout-builder").trigger("exo.alchemist.ready")}p("#layout-builder").once("exo.alchemist").each(function(e,t){var o;n.$activeComponent&&!p(t).find(n.$activeComponent).length&&(o=p("#"+n.$activeComponent.attr("id"))).length?p(t).imagesLoaded(function(){var e;n.setComponentActive(o,!0),n.$activeField&&!p(o).find(n.$activeField).length&&(e=p("#"+n.$activeField.attr("id"))).length&&n.setFieldActive(e,!0),i()}):i()}),p(".exo-component-edit",o).once("exo.alchemist.component").each(function(e,t){var t=p(t),o=p(".exo-component-field-edit, .exo-section",t).length;t.hasClass("exo-component-locked")&&!o&&t.addClass("exo-component-blocked")}).on("click.exo.alchemist.component",function(e){var t=p(e.currentTarget);e.preventDefault(),e.stopPropagation(),t.hasClass("exo-component-blocked")||(n.setComponentActive(t,n.isNestedComponent(e.currentTarget)),p(".exo-component-field-edit:hover").trigger("mouseenter"))}).on("mouseenter.exo.alchemist.component",function(o){function e(){var e=p(o.currentTarget),t=JSON.parse(o.currentTarget.getAttribute("data-exo-component"));e.hasClass("exo-component-blocked")?n.showTarget(e,"This component cannot be changed.","regular-lock"):n.showTarget(e,"Click to focus this <strong>"+t.label.toLowerCase()+"</strong> component","regular-cog")}n.$activeComponent&&!n.isNestedComponent(o.currentTarget)||e()}).on("mouseleave.exo.alchemist.component",function(e){(!n.$activeComponent||n.isNestedComponent(e.currentTarget))&&n.hideTarget()}),p(".exo-component-event-allow",o).once("exo.alchemist.allow").on("click.exo.alchemist.allow",function(e){p(e.currentTarget).hasClass("exo-component-field-edit")||(e=p(e.currentTarget).closest(".exo-component-field-edit")).length&&e.trigger("click"),n.watch()}),p(".exo-component-field-edit",o).once("exo.alchemist.field").on("click.exo.alchemist.field",function(e){e=p(e.currentTarget);e.hasClass("exo-component-field-edit-lock")||e.closest(".exo-component-field-edit-lock").length||n.setFieldActive(e)}).on("mouseenter.exo.alchemist.field",function(e){var t;n.$activeField||((t=p(e.currentTarget)).hasClass("exo-component-field-edit-lock")||t.closest(".exo-component-field-edit-lock").length||(e=JSON.parse(e.currentTarget.getAttribute("data-exo-field")),n.showTarget(t,"Click to manage <strong>"+e.label.toLowerCase()+"</strong> field","regular-cog")))}).on("mouseleave.exo.alchemist.field",function(e){n.$activeField||n.hideTarget()}),e(!0)})}},{key:"watch",value:function(t,v){var u=this,m=[];m.push([this.$activeComponent,"sizeComponentOverlay"]),m.push([this.$activeField,"sizeFieldOverlay"]),m.push([this.$activeTarget,"sizeTarget"]),null===this.watchFinished&&(v=v||10,this.watchFinished=0,m.forEach(function(e){var s,a,l,r,c,h,d,p=e[0];p&&p.length?(s=e[1],l=!(a=0)===t,r=Math.round(p.outerHeight(!0)),c=Math.round(p.outerWidth(!0)),h=Math.round(p.offset().top),d=Math.round(p.offset().left),function n(){setTimeout(function(){var e=Math.round(p.outerHeight(!0)),t=Math.round(p.outerWidth(!0)),o=Math.round(p.offset().top),i=Math.round(p.offset().left);e!==r?(r=e,l=!0,a=0):t!==c?(c=t,l=!0,a=0):o!==h?(h=o,l=!0,a=0):i!==d?(d=i,l=!0,a=0):a++,v<=a?(u.watchFinished++,!0===l&&u[s](p),u.watchFinished===m.length&&(u.watchFinished=null)):n()},10)}()):u.watchFinished++,u.watchFinished===m.length&&setTimeout(function(){u.watchFinished=null},15)}))}},{key:"isLayoutBuilder",value:function(){return v.exoAlchemist&&v.exoAlchemist.isLayoutBuilder}},{key:"setComponentActive",value:function(e,t){var o=this;this.$activeComponent&&!t||((this.$activeComponent=e).addClass("exo-component-edit-active"),this.$obtrusiveElements.length&&this.$obtrusiveElements.addClass("exo-component-hide-active"),this.buildComponentOps(e),this.hideTarget(),this.showComponentOverlay(e,function(){o.setComponentInactive()}),p(document).trigger("exoComponentActive",this.$activeComponent))}},{key:"buildComponentOps",value:function(e){var t,o=v.exoAlchemist.componentOps,i=e.data("exo-component"),n=p.extend({},i),s=(this.$overlayOps.html(""),this.showComponentOps(),i.description&&p('<div class="exo-description exo-component-description">'+i.description+"</div>").appendTo(this.$overlayOps),e.find("[data-exo-component-ops]").data("exo-component-ops"));if(s)for(var a in i.ops.concat(Object.keys(s)),s)s.hasOwnProperty(a)&&(i.ops.push(a),o[a]=s[a]);for(t in o)if(o.hasOwnProperty(t)&&i.ops.includes(t)){var l,r=o[t],c=r.url;for(l in n)!n.hasOwnProperty(l)||"string"!=typeof n[l]&&"number"!=typeof n[l]||(c=c.replace(new RegExp("-"+l+"-","g"),n[l]));var h=r.title,h=(void 0!==i[t+"_badge"]&&(h+=' <span class="exo-alchemist-op-badge">'+i[t+"_badge"]+"</span>"),c=c.replace(new RegExp("(/-.*?)-","g"),""),p('<a href="'+c+'" title="'+r.label+'" class="exo-component-op exo-field-op-'+t+'">'+h+"</a>").appendTo(this.$overlayOps));c&&h.addClass("use-ajax"),h.data("dialog-type","dialog"),h.data("dialog-renderer","off_canvas"),h.data("dialog-options",{exo_modal:{title:r.label,subtitle:r.description,icon:r.icon}})}p(document).trigger("exoComponentOps",this.$overlayOps),m.attachBehaviors(this.$overlayOps[0])}},{key:"showComponentOps",value:function(){this.$overlayOps.addClass("active")}},{key:"hideComponentOps",value:function(){this.$overlayOps.removeClass("active")}},{key:"isNestedComponent",value:function(e){return null!==this.$activeComponent&&0!==this.$activeComponent.find(e).length}},{key:"setComponentInactive",value:function(){var e;this.$activeComponent&&(e=this.$activeComponent.parent().closest(".exo-component-edit"),this.setFieldInactive(),this.$activeComponent.removeClass("exo-component-edit-active"),p(document).trigger("exoComponentInactive",this.$activeComponent),this.$activeComponent=null,e.length?this.setComponentActive(e):(this.hideTarget(),this.hideComponentOverlay(),this.hideComponentOps(),this.$obtrusiveElements.length&&this.$obtrusiveElements.removeClass("exo-component-hide-active")))}},{key:"showComponentOverlay",value:function(o,i){var n=this;return new Promise(function(e,t){n.restrictComponentOverlayPointerEvents(),n.sizeComponentOverlay(o),i&&(n.showOverlayClose(function(e){n.hideOverlayClose(),i()}),n.$shade.off("click").on("click.exo",function(e){e.target===n.$shade.get(0)&&i()})),e(!0)})}},{key:"showComponentClose",value:function(){this.$overlayClose.addClass("active")}},{key:"hideComponentClose",value:function(){this.$overlayClose.removeClass("active")}},{key:"hideComponentOverlay",value:function(){var o=this;return new Promise(function(t,e){o.hideComponentClose(),o.$shade.off("click.exo"),o.$overlay.one(m.Exo.transitionEvent,function(e){o.$shade.removeAttr("style"),o.$overlay.removeAttr("style"),t(!0)}),o.$shade.css({opacity:0,visibility:"hidden"}),o.$overlay.css({opacity:0,visibility:"hidden"}),t(!0)})}},{key:"sizeComponentOverlay",value:function(e){var t=this,o=e.outerWidth(!0),i=e.outerHeight(!0),n=e.offset(),s=n.top-f.offsets.top,a=parseInt(e.css("marginTop").replace("px","")),a=(0<a?s-=a:(s+=a,i-=2*a),s+i),n=n.left-f.offsets.left-e.css("marginLeft").replace("px",""),e=n+o;this.$shade.css({top:"0px",right:"0px",bottom:"0px",left:"0px",width:"100%",height:"100%",visibility:"visible",clipPath:"polygon(0% 0%, 0% 100%, "+n+"px 100%, "+n+"px "+s+"px, "+e+"px "+s+"px, "+e+"px "+a+"px, "+n+"px "+a+"px, "+n+"px 100%, 100% 100%, 100% 0%)"}),setTimeout(function(){t.$shade.css("opacity",1)}),this.$overlay.css({top:s+"px",left:n+"px",width:o+"px",height:i+"px",opacity:1,visibility:"visible"})}},{key:"allowComponentOverlayPointerEvents",value:function(){this.$shade.removeClass("restrict")}},{key:"restrictComponentOverlayPointerEvents",value:function(){this.$shade.addClass("restrict")}},{key:"showTarget",value:function(e,t,o){clearTimeout(this.targetTimer),this.$target.off(m.Exo.transitionEvent),this.$activeTarget=e,t=(t=o?'<i class="exo-icon exo-icon-font icon-'+o+'" aria-hidden="true"></i> '+t:t)?"<span>"+t+"</span>":"",this.$target.off(m.Exo.transitionEvent),t?(this.$targetTitle.addClass("active"),this.$targetTitle.html(t).show()):this.$targetTitle.removeClass("active"),this.sizeTarget(e)}},{key:"hideTarget",value:function(){var t=this;clearTimeout(this.targetTimer),this.targetTimer=setTimeout(function(){t.hideTargetClose(),t.$target.one(m.Exo.transitionEvent,function(e){t.$target.removeAttr("style")}),t.$activeTarget=null,t.$target.css({opacity:0,visibility:"hidden"})},200)}},{key:"showTargetClose",value:function(t){this.$targetClose.addClass("active"),t&&this.$targetClose.off("click").on("click.exo",function(e){e.preventDefault(),e.stopPropagation(),t(e)})}},{key:"hideTargetClose",value:function(){this.$targetClose.removeClass("active"),this.$targetClose.off("click.exo")}},{key:"allowTargetPointerEvents",value:function(){this.$target.removeClass("restrict")}},{key:"restrictTargetPointerEvents",value:function(){this.$target.addClass("restrict")}},{key:"sizeTarget",value:function(e){var t,o,i,n,s,a=m.Exo.$window.outerWidth(),l=e.offset(),r=e.outerWidth(!0),c=e.outerHeight(!0),h=l.top-f.offsets.top,d=h,p=parseInt(e.css("marginTop").replace("px","")),p=(0<p?d-=p:(d+=p,c-=2*p),l.left-f.offsets.left),e=p-e.css("marginLeft").replace("px",""),v=h+c,u=p+r;this.$activeComponent&&(t=this.$activeComponent.offset(),o=this.$activeComponent.outerWidth(),s=this.$activeComponent.outerHeight(),i=parseInt(this.$activeComponent.css("marginTop").replace("px","")),h<(n=t.top-f.offsets.top)&&(d+=n-h,c-=n-h),(h=n+s)<v&&(c-=v-h),p<(n=t.left-f.offsets.left)&&(e+=n-p,r-=n-p),(s=n+o)<u&&(r-=u-s),t.top-i>=l.top&&(d+=this.overlapOffset,e+=this.overlapOffset,r-=2*this.overlapOffset,c-=2*this.overlapOffset)),this.$target.css({top:d+"px",left:e+"px",width:r+"px",height:c+"px",opacity:1,visibility:"visible"}),this.$target.attr("data-align",a/2<e?"right":"left")}},{key:"lockNestedFields",value:function(e){e.addClass("exo-component-field-edit-lock")}},{key:"unlockNestedFields",value:function(e){e.removeClass("exo-component-field-edit-lock"),p(".exo-component-field-edit:hover").trigger("mouseenter")}},{key:"setFieldActive",value:function(e,t){var o=this;this.$activeField&&!t||((this.$activeField=e).addClass("exo-component-field-edit-active"),this.restrictTargetPointerEvents(),this.buildFieldOps(e),this.buildBreadcrumbs(),this.sizeComponentOverlay(this.$activeComponent),this.showFieldOverlay(e,function(){o.setFieldInactive()}),p(document).trigger("exoComponentFieldEditActive",this.$activeField))}},{key:"buildFieldOps",value:function(e){var t,o=p.extend({},v.exoAlchemist.fieldOps),i=e.closest(".exo-component-edit").data("exo-component"),n=e.data("exo-field"),s=p.extend({},i,n),a=(this.$targetOps.html(""),this.showFieldOps(),this.$targetOps.addClass("active"),n.description&&p('<div class="exo-description exo-field-description">'+n.description+"</div>").appendTo(this.$targetOps),e.closest("[data-exo-component-field-ops]").data("exo-component-field-ops"));if(a)for(var l in n.ops.concat(Object.keys(a)),a)a.hasOwnProperty(l)&&(n.ops.push(l),o[l]=a[l]);for(t in o)if(o.hasOwnProperty(t)&&n.ops.includes(t)){var r,c=o[t],h=c.url;for(r in s)!s.hasOwnProperty(r)||"string"!=typeof s[r]&&"number"!=typeof s[r]||(h=h.replace("-"+r+"-",s[r]));var d=p('<a href="'+h+'" title="'+c.label+'" class="exo-field-op exo-field-op-'+t+'">'+c.title+"</a>").appendTo(this.$targetOps);h&&d.addClass("use-ajax"),d.data("dialog-type","dialog"),d.data("dialog-renderer","off_canvas"),d.data("dialog-options",{exo_modal:{title:c.label,subtitle:c.description,icon:c.icon}})}p(document).trigger("exoComponentFieldOps",this.$targetOps),m.attachBehaviors(this.$targetOps[0])}},{key:"showFieldOps",value:function(){this.hideComponentOps(),this.hideComponentClose(),this.$targetOps.addClass("active")}},{key:"hideFieldOps",value:function(){this.showComponentOps(),this.showComponentClose(),this.$targetOps.removeClass("active")}},{key:"setFieldInactive",value:function(){this.$activeField&&(p(document).trigger("exoComponentFieldEditInactive",this.$activeField),this.$activeField.removeClass("exo-component-field-edit-active"),this.$activeField=null,this.hideFieldOverlay(),this.hideFieldOps(),this.hideBreadcrumbs(),this.hideTarget(),this.allowTargetPointerEvents())}},{key:"showFieldOverlay",value:function(o,i){var n=this;return new Promise(function(e,t){n.$highlight.off(m.Exo.transitionEvent),n.showTarget(o),n.restrictFieldOverlayPointerEvents(),n.sizeFieldOverlay(o),i&&(n.showTargetClose(function(e){n.hideTargetClose(),i()}),n.$highlight.off("click").on("click.exo",function(e){e.preventDefault(),e.stopPropagation(),e.target===n.$highlight.get(0)&&i()})),e(!0)})}},{key:"allowFieldOverlayPointerEvents",value:function(){this.$highlight.removeClass("restrict")}},{key:"restrictFieldOverlayPointerEvents",value:function(){this.$highlight.addClass("restrict")}},{key:"hideFieldOverlay",value:function(){var o=this;return new Promise(function(t,e){o.hideTargetClose(),o.$highlight.off("click.exo"),o.$highlight.one(m.Exo.transitionEvent,function(e){o.$highlight.removeAttr("style"),t(!0)}),o.$highlight.css({opacity:0,visibility:"hidden"}),t(!0)})}},{key:"sizeFieldOverlay",value:function(e){var t=this,o=this.$activeComponent.offset(),i=this.$activeComponent.outerWidth(!0),n=this.$activeComponent.outerHeight(!0),s=o.top,a=parseInt(this.$activeComponent.css("marginTop").replace("px","")),a=(0<a?s-=a:(s+=a,n-=2*a),o.left-parseInt(this.$activeComponent.css("marginLeft").replace("px",""))),o=e.outerWidth(!0),l=e.outerHeight(!0),r=e.offset(),c=r.top-s-e.css("marginTop").replace("px",""),l=c+l,r=r.left-a-e.css("marginLeft").replace("px",""),e=r+o;this.$highlight.css({top:s-f.offsets.top+"px",bottom:s+n+"px",left:a-f.offsets.left+"px",right:a+i+"px",width:i,height:n,visibility:"visible",clipPath:"polygon(0% 0%, 0% 100%, "+r+"px 100%, "+r+"px "+c+"px, "+e+"px "+c+"px, "+e+"px "+l+"px, "+r+"px "+l+"px, "+r+"px 100%, 100% 100%, 100% 0%)"}),setTimeout(function(){t.$highlight.css("opacity",1)},10)}},{key:"showOverlayClose",value:function(t){this.$overlayClose.addClass("active"),t&&this.$overlayClose.off("click.exo").on("click.exo",function(e){e.preventDefault(),e.stopPropagation(),t(e)})}},{key:"hideOverlayClose",value:function(){this.$overlayClose.removeClass("active"),this.$overlayClose.off("click.exo")}},{key:"buildBreadcrumbs",value:function(){var e,i=this;this.hideBreadcrumbs(),this.$activeField&&(e=this.$activeField,e=this.$activeComponent.find(".exo-component-field-edit").not(e.find(".exo-component-field-edit")).not(e.parents(".exo-component-group").find(".exo-component-field-edit")).add(e.parents(".exo-component-field-edit")).overlaps(e).add(e),p('<li class="exo-alchemist-breadcrumb-label">Nested Elements:</li>').appendTo(this.$fieldBreadcrumbs),e.each(function(e,t){var o=p(t),t=o.data("exo-field");p('<li class="exo-alchemist-breadcrumb-field"><a>'+t.label+"</a></li>").on("click",function(e){e.preventDefault(),e.stopPropagation(),i.setFieldInactive(),i.setFieldActive(o,!0)}).appendTo(i.$fieldBreadcrumbs)}))}},{key:"hideBreadcrumbs",value:function(){this.$fieldBreadcrumbs.children().remove()}},{key:"getActiveComponent",value:function(){return this.$activeComponent}},{key:"getActiveField",value:function(){return this.$activeField}}]),e}();m.ExoAlchemistAdmin=m.ExoAlchemistAdmin||new e,m.behaviors.exoAlchemistAdmin={attach:function(e){m.ExoAlchemistAdmin.attach(e)}},m.AjaxCommands.prototype.exoComponentFocus=function(e,t,o){var i=p("#"+t.id);i.length&&p("#layout-builder").on("exo.alchemist.ready",function(e){m.ExoAlchemistAdmin.setComponentActive(i,!0)})},m.AjaxCommands.prototype.exoComponentBlur=function(e,t,o){m.ExoAlchemistAdmin.setComponentInactive()},m.AjaxCommands.prototype.exoComponentFieldFocus=function(e,t,o){var i=p("#"+t.id);i.length&&p("#layout-builder").on("exo.alchemist.ready",function(e){m.ExoAlchemistAdmin.setFieldActive(i,!0)})},m.AjaxCommands.prototype.exoComponentFieldBlur=function(e,t,o){m.ExoAlchemistAdmin.setFieldInactive()}}(jQuery,(_,Drupal),drupalSettings,Drupal.displace);