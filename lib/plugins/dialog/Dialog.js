/**
author:yang qing-rong 
homepage:http://www.wudimei.com/

$( "#userInfDialog" ).dialog({
     modal: true,
     stack: false, 
     zIndex: 9999,
     buttons:
     {
          Ok: function()
          {
               $( this ).dialog( "close" );
          }
     }
});
*/
var Wudimei_Dialog_zIndex = 100;
var Wudimei_Dialog_left = 20;
var Wudimei_Dialog_top = 20;
var Wudimei_Dialog_spacing = 30;
Wudimei.Dialog = function(config)
{
	var defaultConfig = {
		width:500,
		height:300,
		content:"",
		title:""
	};
	this.id = null;
	this.titleId = null;
	this.cfg = null;
	this.dom = null;
	this.handle_click = function( id ){
		//alert(id );
		var titleId = this.titleId;
		var id = this.id;
		setTimeout( function(){
			this.dom.query("#" +  id ).on( "mousedown" , function( sender , evt ){
				
				sender.elements[0].style.zIndex =  ++ Wudimei_Dialog_zIndex;
			});
			 
			var div1 = new Wudimei.DragDrop({handleId:titleId,parentId:id});
		}, 1);
	}
	//this.dlg = null;
	this.init=function(config)
	{
		var cfgObj = new Wudimei.Options();
		this.cfg = cfgObj.update( defaultConfig, config );
		this.dom = new Wudimei.Dom();
		
		this.id = "WDialog_" + Wudimei_Dialog_zIndex;
		this.titleId = "WDialogTitleId_" + Wudimei_Dialog_zIndex;
		var html = "<div class=\"WDialog\" style=\"width:" + this.cfg.width + 
		"px;height:" + this.cfg.height +
		"px;z-index:" + Wudimei_Dialog_zIndex + 
		";left:" + Wudimei_Dialog_left +
		"px;top:" + Wudimei_Dialog_top	+
		"px;\" id=\"WDialog_" +Wudimei_Dialog_zIndex + 
		"\"   >";
		
		//add title bar
		if( this.cfg.title )
		{
			html += "<div class=\"WDialogTitle\" id=\"" + this.titleId + "\">" + this.cfg.title + "</div>";
		}
		html += "<div class=\"WDialogContent\">" + this.cfg.content + "</div>";
		html += "</div>";//end of dialog div
		
		document.body.innerHTML += html;
		this.handle_click(this.id);
		 
		
		
		Wudimei_Dialog_zIndex++;
		Wudimei_Dialog_top += Wudimei_Dialog_spacing;
		Wudimei_Dialog_left +=Wudimei_Dialog_spacing;
		
	}
	this.init(config);
	
	
	this.show=function()
	{
		
	}
}//end class Dialog