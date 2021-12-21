/**
 * Copyright(c) wudimei.com
 */
Wudimei.DragDrop_Counter = 0;
Wudimei.DragDrop_Instances = new Array();
Wudimei.DragDrop = function(config)
{
	var defaultConfig = {
		handleId:"handle",
		parentId:"box",
		onDragEnd:null
	};
	var othis = null;
	this.cfg = null;
	this.dom = null;
	this.handleObj = null;
	var parentObj = null;
	this.leftOffset = 0;
	this.topOffset = 0;
	this.isDragging = false;
	this.onDragEnd = null;
	 
	this.mouseDown = function(el,evt){
		//Wudimei.DragDropObjs[evt.getTarget().getAttr("id")] = this;
		//this.handleObj.setAttr("wudimeiplugin","Wudimei.DragDrop");
		if( evt.getTarget().getAttr("wudimeiplugin") == "Wudimei.DragDrop" )
		{
			this.isDragging = true;
			this.parentObj = evt.getTarget().getParent();
			var leftTop = this.parentObj.absLeftTop();
			this.leftOffset = evt.getPageX() - leftTop[0];
			this.topOffset = evt.getPageY() - leftTop[1];
		}
	}
	/**
	 * 
	 */
	this.mouseUp = function(el,evt){
		this.isDragging = false;
		
		if( evt.getTarget().getAttr("id") != "" && Wudimei.DragDrop_Instances[evt.getTarget().getAttr("id")]
			&& Wudimei.DragDrop_Instances[evt.getTarget().getAttr("id")].cfg.handleId == evt.getTarget().getAttr("id")
		)
		{
			//Wudimei.log( Wudimei.DragDrop_Instances[evt.getTarget().getAttr("id")].onDragEnd);
			if( typeof Wudimei.DragDrop_Instances[evt.getTarget().getAttr("id")].onDragEnd == "function" )
			{
				Wudimei.DragDrop_Instances[evt.getTarget().getAttr("id")].onDragEnd(el,evt);
			}
		}
	}
	
	this.mouseMove = function(el,evt){
		var parentObj = this.parentObj;
		 
		if( parentObj && !parentObj.elements[0].style) this.isDragging = false;
		if( this.isDragging == true )
		{
			parentObj.elements[0].style.left = evt.getPageX()-this.leftOffset + "px";
			parentObj.elements[0].style.top = evt.getPageY() -this.topOffset + "px";
		}
	}
	
	this.init = function( cfg )
	{
		var cfgObj = new Wudimei.Options();
		this.cfg =  cfgObj.update( defaultConfig, cfg );
		this.dom = new Wudimei.Dom();
		this.handleObj = this.dom.query( "#" + cfg.handleId );
		this.handleObj.setAttr("wudimeiplugin","Wudimei.DragDrop");
		this.handleObj.elements[0].style.cursor = "move";
		this.onDragEnd = this.cfg.onDragEnd;
		
		Wudimei.DragDrop_Counter ++;
		Wudimei.DragDrop_Instances[this.cfg.handleId] = this;
		//var obj = this;
		if( Wudimei.DragDrop_Counter<2 )
		{	
			var doc = new Wudimei.Dom();
			doc.query(document).on("mousedown", Wudimei.DragDrop_Instances[this.cfg.handleId].mouseDown );
			doc.query(document).on("mousemove",Wudimei.DragDrop_Instances[this.cfg.handleId].mouseMove );
			doc.query(document).on("mouseup", Wudimei.DragDrop_Instances[this.cfg.handleId].mouseUp );
		}
	}
	this.init( config );
}