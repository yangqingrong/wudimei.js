/**
 * Copyright(c) wudimei.com
 */
Wudimei.Resizable_id = 0;
Wudimei.Resizable = function(config)
{
	var defaultConfig = {
		id:"divId"
	};
	var obj=null;
	this.dom = null;
	this.id=0;
	this.obj=null;
	this.isResizing = false;
	this.resizingControl = null;
	this.resizingControlId = "";
	var startX =0;
	var startY =0;
	var startHeight = 0;
	var startWidth = 0;
	this.controllLeftOffset = 0;
	this.controllTopOffset = 0;
	
	this.addControl = function( idPrefix , className)
	{
		var str = "<div id=\"" + idPrefix+this.id + "\" class=\"" + className + "\"></div>";
		this.obj.setHtml( this.obj.getHtml() + str );
	}
	
	this.mouseDown = function(el,evt){
		this.isResizing = true;
		this.resizingControlId = evt.getTarget().getAttr("id");
		this.resizingControl = evt.getTarget();
		startX = evt.getPageX();
		startY = evt.getPageY();
		startHeight = parseInt( obj.elements[0].style.height );
		startWidth = parseInt( obj.elements[0].style.width );
		var leftTop = evt.getTarget().absLeftTop();
		this.controllLeftOffset = 10-(evt.getPageX() - leftTop[0]);
		this.controllTopOffset = 10-(evt.getPageY() - leftTop[1]);
		//this.dom.query("#log").setHtml( leftTop[0] + "," + leftTop[1] + ";" + this.controllLeftOffset + ","  + this.controllTopOffset );
	}
	
	this.mouseOut = function(el,evt){
		//this.isResizing = false;
	}
	
	this.mouseUp = function(el,evt){
		this.isResizing = false;
	}
	
	this.mouseMove = function(el,evt){
		if( this.resizingControlId == null )
		{
			this.isResizing = false;
		}
		if( this.isResizing == true && this.resizingControlId.indexOf("WR_") != -1 ){
			
			var height = evt.getPageY()- startY;
			var width = evt.getPageX() - startX; 
			var movingObj = this.resizingControl.getParent(); 
			 Wudimei.log( this.resizingControlId );
			 if( this.resizingControlId.indexOf("b") != -1 )//middle bottom
			 {
				 movingObj.elements[0].style.height =  startHeight + height + "px"  ;
			 }
			 if( this.resizingControlId.indexOf("t") != -1 )//middle bottom
			 {
				 movingObj.elements[0].style.height =  startHeight - height    + "px"  ;
				 movingObj.elements[0].style.top = evt.getPageY() + this.controllTopOffset  + "px";
			 }
			 if( this.resizingControlId.indexOf("r") != -1 )//middle bottom
			 {
				 movingObj.elements[0].style.width =  startWidth + width + "px"  ;
			 }
			 if( this.resizingControlId.indexOf("l") != -1 )//middle bottom
			 {
				 movingObj.elements[0].style.width =  startWidth - width + "px"  ;
				 movingObj.elements[0].style.left = evt.getPageX()+ this.controllLeftOffset  + "px";
			 }

		}
	}
	
	this.init = function( config )
	{
		var cfgObj = new Wudimei.Options();
		this.cfg = config = cfgObj.update( defaultConfig, config );
		this.dom = new Wudimei.Dom();
		this.id= Wudimei.Resizable_id ++;
		this.obj = obj = this.dom.query("#" + config.id);
		this.addControl("WR_lt","Wudimei_Resizable_lt Wudimei_Resizable_Control");
		this.addControl("WR_mt","Wudimei_Resizable_mt Wudimei_Resizable_Control");
		this.addControl("WR_rt","Wudimei_Resizable_rt Wudimei_Resizable_Control");
		this.addControl("WR_lm","Wudimei_Resizable_lm Wudimei_Resizable_Control");
		this.addControl("WR_rm","Wudimei_Resizable_rm Wudimei_Resizable_Control");
		this.addControl("WR_lb","Wudimei_Resizable_lb Wudimei_Resizable_Control");
		this.addControl("WR_mb","Wudimei_Resizable_mb Wudimei_Resizable_Control");
		this.addControl("WR_rb","Wudimei_Resizable_rb Wudimei_Resizable_Control");
		
		var doc = new Wudimei.Dom();
		doc.query(document).on("mousedown",this.mouseDown);
		doc.query(document).on("mousemove", this.mouseMove );
		doc.query(document).on("mouseup", this.mouseUp );
		doc.query(document).on("mouseout", this.mouseOut );
	}
	
	
	this.init( config );
	
}