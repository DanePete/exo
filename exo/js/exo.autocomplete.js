!function(c,d){"use strict";Drupal.exoAutocomplete=Drupal.exoAutocomplete||{},Drupal.behaviors.exoAutocomplete={attach:function(e){var t=d.exoAutocomplete;c("input.exo-autocomplete-form").once("attachExoAutocomplete").each(function(){!0===t[c(this).attr("id")].multiple?new Drupal.exoAutocomplete.MultipleWidget(this,t[c(this).attr("id")]):new Drupal.exoAutocomplete.SingleWidget(t[c(this).attr("id")])})}},c.fn.autoGrowInput=function(a){return a=c.extend({maxWidth:1e3,minWidth:0,comfortZone:70},a),this.filter("input:text").each(function(){var t=a.minWidth||c(this).width(),o="",i=c(this),l=c("<tester/>").css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:i.css("fontSize"),fontFamily:i.css("fontFamily"),fontWeight:i.css("fontWeight"),letterSpacing:i.css("letterSpacing"),whiteSpace:"nowrap"});l.insertAfter(i),c(this).bind("keyup keydown blur update",function(){var e;o!==(o=i.val())&&(e=o.replace(/&/g,"&amp;").replace(/\s/g,"&nbsp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),l.html(e),((e=(e=l.width())+a.comfortZone>=t?e+a.comfortZone:t)<i.width()&&t<=e||t<e&&e<a.maxWidth)&&i.width(e))})}),this},Drupal.exoAutocomplete.empty={label:"- "+Drupal.t("None")+" -",value:""},Drupal.exoAutocomplete.escapeRegex=function(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/gi,"\\$&")},Drupal.exoAutocomplete.filter=function(e,t){var o=new RegExp(Drupal.exoAutocomplete.escapeRegex(t),"i");return c.grep(e,function(e){return o.test(e.label||e.value||e)})},Drupal.exoAutocomplete.Widget=function(){},Drupal.exoAutocomplete.Widget.prototype.uri=null,Drupal.exoAutocomplete.Widget.prototype.acceptTerm=function(e){return!0},Drupal.exoAutocomplete.Widget.prototype.init=function(o){var t,a,e,i,l,n,u,s,r,p,m;-1===navigator.appVersion.indexOf("MSIE 6.")&&(this.id=o.input_id,this.$item=c("#"+this.id),t=this.$item,this.uri=o.uri,this.multiple=o.multiple,this.required=o.required,this.limit=o.limit,this.synonyms=void 0!==o.use_synonyms&&o.use_synonyms,this.not_found_message=void 0===o.use_synonyms?Drupal.t("The entity '@term' will be added."):o.not_found_message,this.not_found_message_allow=void 0!==o.not_found_message_allow&&o.not_found_message_allow,this.new_terms=void 0!==o.new_terms&&o.new_terms,this.no_empty_message=void 0===o.no_empty_message?Drupal.t("No terms could be found. Please type in order to add a new term."):o.no_empty_message,this.wrapper='""',void 0===o.delimiter?this.delimiter=!0:this.delimiter=o.delimiter.charCodeAt(0),this.items={},i=(e=(a=this).$item.parent()).find(".description"),(l=this.$item.parent().parent()).closest(".exo-form-element").on("click",function(e){t.trigger("focus")}),l.append(this.$item),l.parent().parent().append(i),e.remove(),e=l,n=function(e,t){var o,i=[];for(o in e)a.acceptTerm(o)&&i.push({label:e[o],value:o});return c.isEmptyObject(i)&&(a.new_terms||a.not_found_message_allow)&&(" "!==t?i.push({label:Drupal.formatString(a.not_found_message,{"@term":t}),value:t,newTerm:!0}):i.push({label:a.no_empty_message,noTerms:!0})),i},u={},s=null,this.source=function(e,i){var t,l=e.term;l in u?i(n(u[l],l)):(l=l||" ",e.synonyms=a.synonyms,t=Drupal.url(o.uri+"?q="+l),s=c.getJSON(t,e,function(e,t,o){u[l]=e,o===s&&i(n(e,l))}))},this.$item.autocomplete({source:this.source,minLength:o.min_length}),r="object"==typeof this.$item.data("autocomplete")?"item.autocomplete":"ui-autocomplete",p=c('<div class="exo-autocomplete-throbber exo-autocomplete-closed">&nbsp;</div>').insertAfter(t),this.$item.bind("autocompletesearch",function(e,t){p.removeClass("exo-autocomplete-closed"),p.addClass("exo-autocomplete-open")}),this.$item.bind("autocompleteresponse",function(e,t){var o;p.addClass("exo-autocomplete-closed"),p.removeClass("exo-autocomplete-open"),!d.exoAutocomplete[this.id].new_terms&&void 0!==t.item&&t.item.newTerm&&((o=c(".ui-widget-content")).css("pointer-events",""),t.content.length||(t.content[0]={label:Drupal.t("No results found"),value:""},o.css("pointer-events","none")))}),c.ui.autocomplete.prototype._renderItem=function(e,t){var o;return m=t.label,""!==this.term&&(o=Drupal.exoAutocomplete.escapeRegex(this.term),o=new RegExp('()*""'+o+'""|'+o+"()*","gi"),m=t.label.replace(o,'<span class="exo-autocomplete-highlight-char">$&</span>')),c("<li></li>").data(r,t).append("<a>"+m+"</a>").appendTo(e)})},Drupal.exoAutocomplete.Widget.prototype.generateValues=function(e){var t,o=[];for(t in e)e.hasOwnProperty(t)&&o.push(e[t]);return o},Drupal.exoAutocomplete.SingleWidget=function(e){this.init(e),this.setup(),this.$item.addClass("exo-autocomplete-form-single")},Drupal.exoAutocomplete.SingleWidget.prototype=new Drupal.exoAutocomplete.Widget,Drupal.exoAutocomplete.SingleWidget.prototype.setup=function(){var e=this.$item,t=e.parent();t.mousedown(function(){t.hasClass("exo-autocomplete-single-open")?e.autocomplete("close"):e.autocomplete("search","")})},Drupal.exoAutocomplete.MultipleWidget=function(e,t){this.init(t),this.setup()},Drupal.exoAutocomplete.MultipleWidget.prototype=new Drupal.exoAutocomplete.Widget,Drupal.exoAutocomplete.MultipleWidget.prototype.items={},Drupal.exoAutocomplete.MultipleWidget.prototype.acceptTerm=function(e){return!(e in this.items)},Drupal.exoAutocomplete.MultipleWidget.Item=function(e,t){if(!0===t.newTerm)t.label=t.value;else if(!0===t.noTerms)return;this.value=t.value,this.element=c('<span class="exo-autocomplete-item">'+t.label+"</span>"),this.widget=e,this.item=t;var o=this;c('<a class="exo-autocomplete-item-delete" href="javascript:void(0)"></a>').appendTo(this.element).mousedown(function(){o.remove(t),o.widget.$item.parents(".exo-autocomplete-container").next().find("input").trigger("change")})},Drupal.exoAutocomplete.MultipleWidget.Item.prototype.remove=function(){this.element.remove();var e=this.widget.valueForm.val(),t=Drupal.exoAutocomplete.escapeRegex(this.item.value),t=new RegExp('()*""'+t+'""()*',"gi");this.widget.valueForm.val(e.replace(t,"")),delete this.widget.items[this.value]},Drupal.exoAutocomplete.MultipleWidget.prototype.setup=function(){var e,t,o,i=this.$item,l=i.parents(".exo-autocomplete-container"),a=l.next().find("input"),n=this.items,u=this,s=(this.valueForm=a,this.orderValues=function(){var o=[];l.find(".exo-autocomplete-item input").each(function(e,t){o[e]=c(t).val()}),a.val('""'+o.join('"" ""')+'""'),a.trigger("change")},l.sortable({update:u.orderValues,containment:"parent",tolerance:"pointer"}),"object"==typeof this.$item.data("autocomplete")?"autocomplete":"ui-autocomplete"),r=(i.data(s)._resizeMenu=function(){},i.show(),a.hide(),a.val());for(e in r=(r=(r=c.trim(r)).substr(2,r.length-4)).split(/"" +""/))!r.hasOwnProperty(e)||""!==(t=r[e])&&(o=null!==t.match(/["][\w|\s|\D|]*["]/gi)?t.substr(1,t.length-2):t,o={label:Drupal.checkPlain(o),value:t},(o=new Drupal.exoAutocomplete.MultipleWidget.Item(u,o)).element.insertBefore(i),n[o.value]=o);i.addClass("exo-autocomplete-multiple"),l.addClass("exo-autocomplete-multiple"),this.addValue=function(e){var t=new Drupal.exoAutocomplete.MultipleWidget.Item(u,e),t=(t.element.insertBefore(i),n[e.value]=t," "+u.wrapper+e.value+u.wrapper),e=a.val();a.val(e+t),i.val("")},l.mouseup(function(){i.autocomplete("search",""),i.focus()}),i.bind("autocompleteselect",function(e,t){if(d.exoAutocomplete[this.id].new_terms||!t.item.newTerm)return u.addValue(t.item),i.width(25),!1;c(this).val("")}),i.bind("autocompletechange",function(e,t){i.val("")}),i.blur(function(){i.parent().children(".exo-autocomplete-item").last().removeClass("exo-autocomplete-item-focus")});var p=!1;i.keypress(function(e){var t,o=i.val();if(e.which===u.delimiter&&o.split('"').length-1!=1||13===e.which&&""!==i.val()){if(!d.exoAutocomplete[this.id].new_terms)return void c(this).val("");if(o=o.substr(0,o.length),void 0===u.items[o]&&""!==o&&u.addValue({label:o,value:o}),p=!0,13===e.which)return e.preventDefault(),e.stopPropagation(),!1}8===e.which&&""===o?(t=i.parent().children(".exo-autocomplete-item").last()).hasClass("exo-autocomplete-item-focus")?(o=t.children("input").val(),u.items[o].remove(u.items[o]),i.autocomplete("search","")):t.addClass("exo-autocomplete-item-focus"):(t=i.parent().children(".exo-autocomplete-item").last()).removeClass("exo-autocomplete-item-focus")}),i.autoGrowInput({comfortZone:50,minWidth:10,maxWidth:460}),i.keyup(function(){if(p)return i.autocomplete("search",""),i.val(""),p=!1})}}(jQuery,drupalSettings);