"use strict";!function(t,s,c){t.ckeditor.openDialog=function(o,e,i,a,n){var d=c(o.container.$),o=((d=o.elementMode===s.ELEMENT_MODE_REPLACE?d.find(".cke_contents"):d).css("position","relative").find(".ckeditor-dialog-loading").remove(),n.dialogClass?n.dialogClass.split(" "):[]),l=(n.class=o.join(" "),c('<div class="ckeditor-dialog-loading"><span style="top: -40px;" class="ckeditor-dialog-loading-link">'+t.t("Loading...")+"</span></div>"));l.appendTo(d),t.ajax({dialog:n,dialogType:"exo_modal",selector:".ckeditor-dialog-loading-link",url:e,progress:{type:"throbber"},submit:{editor_object:i}}).execute(),window.setTimeout(function(){l.find("span").animate({top:"0px"})},1e3),t.ckeditor.saveCallback=a},c(window).on("exo-modal:afterRender",function(o,e){c(".ui-dialog--narrow").css("zIndex",s.config.baseFloatZIndex+1)}),c(window).on("exo-modal:onOpening",function(o,e){c(".ckeditor-dialog-loading").animate({top:"-40px"},function(){c(this).remove()})}),c(window).on("exo-modal:onClosed",function(o,e){t.ckeditor.saveCallback&&(t.ckeditor.saveCallback=null)})}(Drupal,(Drupal.debounce,CKEDITOR),jQuery,(Drupal.displace,Drupal.AjaxCommands));