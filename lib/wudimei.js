/**
 * Copyright (C) <2011>  <Yang Qing-rong>  
 * homepage: http://wudimei.com/data/projects/wudimei_js/lib

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


 * Wudimei.js is an open source javascript framework.
 * http://www.wudimei.com/data/projects/wudimei_js/
 * 
 * @author Yang Qing-rong (yangqingrong@gmail.com)
 * @class Wudimei
 * version 1.1
 * 
 */
 var Wudimei=new Object();

Wudimei.Dom =function()
{
	this.elements = new Array();
	
	/**
	 * selector
	 */
	this.select = function( query )
	{
		 
		
		if( this.elements.length == 0 )
		{
			this.elements[0] = document;
		}
		var pre = query.substring(0,1);
		var newElements=new Array();
		var newIndex=0;
		for( var i=0; i<this.elements.length ;i++ )
		{
			var el = this.elements[i];
			if( pre == "#" )
			{
				newElements[newIndex++] = document.getElementById(query.substring(1));
			}
			else if( pre == "." )//class
			{
				var className = query.substring(1);
				var wArr = this.toDom(el).offsprings( );
				for( var j=0; j<wArr.length; j++ )
				{
					if( wArr[j].isClassExists( className ) )
          {
							newElements[newIndex++] = wArr[j].elements[0];	
					}
				}	
			}
		  else if(query.indexOf(":") != -1 || query.indexOf("[") != -1 )
		  {
		    var tag = "",attrs = new Array(),pseudo="";
		    tmpQuery = query;
		    if( query.indexOf(":") != -1 )
		    {
		      var tmpArr = tmpQuery.split(":");
		      tmpQuery= tmpArr[0];
		      pseudo = tmpArr[1];
		    }
		    if( tmpQuery.indexOf("[") != -1 )
		    {
		      var tag = tmpQuery.substring(0,tmpQuery.indexOf("[") );
		      var tmpQuery = tmpQuery.substring( tmpQuery.indexOf("[") );
		      var level =0;
		      var start=0;
		      var end=0;
		      for( var k=0; k<tmpQuery.length; k++ )
		      {
		        var ch = tmpQuery.charAt(k);
		        if( ch == "[" )
		        {
		          level ++;
		          if( level ==1 ) start=k+1;
		        }
		        if( ch == "]" )
		        {
		          level --;
		          if( level==0) {
		            end =k;
		            var attrValString = tmpQuery.substring( start,end);
		            var attrName,attrValue,attrSymbol;
		            for(var l=0;l<attrValString.length;l++ )
		            {
		              var ch2=attrValString.charAt(l);
		              if( ch2 == "=" )
		              {
		                var lastCh2=attrValString.charAt(l-1);
		                if( lastCh2=="*" || lastCh2 == "$" || lastCh2 == "^" )
		                {
		                  attrSymbol=lastCh2+ch2;
		                  attrName=attrValString.substring(0,l-1);
		                }
		                else
		                {
		                  attrSymbol = ch2;
		                  attrName = attrValString.substring(0,l);
		                }
		                attrValue = attrValString.substring(l+1);
		                if( attrValue.charAt(0) == "'" || attrValue.charAt(0) == "\"" )
		                {
		                  attrValue = attrValue.substring(1);
		                }
		                if( attrValue.charAt(attrValue.length-1) == "'" || attrValue.charAt(attrValue.length-1) == "\"" )
                    {
                      attrValue = attrValue.substring(0,attrValue.length-1);
                    }
		              }
		            }
		            attrs.push( new Array( attrName , attrSymbol , attrValue ) );
		          }
		        }
		      }
		      
		    }
		    else
		    {
		      tag = tmpQuery;
		    }
		    
		    var els = el.getElementsByTagName( tag );
		    for( var j=0; j<els.length; j++ )
		    {
		      var attrsMatched =true;
		      for( var m=0; m<attrs.length;m++ )
		      {
		        var attrNm = attrs[m][0],attrSym = attrs[m][1],attrVl = attrs[m][2];
		        var val = els[j].getAttribute(attrs[m][0]);
		        if( attrSym == "=" )
		        {
		          if( val != attrVl )
		          {
		            attrsMatched =false;
		          }
		        }
		        else if( attrSym == "^=" )
		        {
		          
		        }
		      }
		      if( attrsMatched )
		      {
  		      if( pseudo == "checked" )
  		      {
  		        if( els[j].checked == true )
  		        {
  		          newElements[newIndex++] = els[j];
  		        }
  		      }
		      }
		      
		    }//end for
		  }// end of ( query.indexOf(":") != -1 || query.indexOf("[") != -1 )
			else if( query.indexOf(".") != -1 )//tag.className
			{
			   var arr = query.split(".");
			   var tag=arr[0]; className = arr[1];
			   var els = el.getElementsByTagName( tag );
			   for( var j=0; j<els.length; j++ )
		         {
		            if( this.toDom(els[j] ).isClassExists( className ) )
		            {
		               newElements[newIndex++] = els[j];
		            }
		         }
			}
			else//tag
			{
				var els = el.getElementsByTagName(  query );
				for( var j=0; j<els.length; j++ )
				{
					newElements[newIndex++] = els[j];
				}
			}//endif
		}//end for
		this.elements = newElements;
		return this;
	}//end of this.select()
	
	this.toDom=function( el )
	{
	   var wTmp = new Wudimei.Dom();
	   wTmp.elements[0] = el;
	   
	   return wTmp;  
	}
	
	this.isClassExists =function( className )
	{
      var attr = this.elements[0].className; //cross-platform className
      if( attr )
      {
        var classNameArray = attr.split(" ");
        for(var k=0; k<classNameArray.length; k++ )
        {
          if( classNameArray[k] == className )
          {
            return true;
          }
        }
      }
      return false;
	}
	
	this.clear = function()
	{
		this.elements.length = 0;//empty array
		return this;
	}
	
	this.query=function( query )
	{
	   if( typeof( query) == "object")
	   {
			this.elements[0] = query;
			return this;
	  }	
	  var level =0;
	  var queryArray=new Array();
	  var tmpQuery = query;
	  var start=0;
	  for( var k=0;k<tmpQuery.length; k++ )
	  {
	    var ch = tmpQuery.charAt(k);
	    if( ch == "[" )
	    {
	      level++;
	    }
	    if( ch == "]" )
	    {
	      level--;
	    }
	    if( ch ==" " && level ==0 )
	    {
	      var subSelector = tmpQuery.substring(start,k);
	      if( subSelector != "" )
	      {
	       queryArray.push( subSelector );
	      }
	      start =k+1;
	    }
	    if( k==tmpQuery.length-1 )
	    {
	      queryArray.push( tmpQuery.substring( start ) );
	    }
	  }

		this.clear();
		if( queryArray )
		{
			for( var i=0; i< queryArray.length; i++ )
			{
				var queryItem = queryArray[i];
				if( queryItem != "" )
				{
					this.select( queryItem );
				}
			}
		}
		return this;
	}//end function query();
	/**
	 * return the leng of field "elements" array
	 */
	this.length = function()
	{
		return this.elements.length;
	}
	/**
	 * alias of select()
	 */
	this.s = function( query ){
		return this.select( query );
	}
	/**
	 * return the inner html of the first element
	 */
	this.getHtml=function( )
	{   if( this.elements[0])
		return this.elements[0].innerHTML;
		return "";
	}
	this.appendHtml = function(html)
	{
		this.elements[0].innerHTML += html;
		return this;
	}
	/**
	 * set new html for the first element
	 */
	this.setHtml = function( html )
	{
		if( this.elements[0] )
		this.elements[0].innerHTML = html;
		return this;
	}
	this.getValue = function()
	{
		var tagName = this.tagName();
		if( tagName == "input" && this.getAttr("type") == "text"  )
		{
			return this.elements[0].value;
		}
		else if( tagName == "textarea" )
		{
			return this.elements[0].value;
		}
		
	}
	this.tagName = function()
	{
		return this.elements[0].tagName.toLowerCase();
	}
	this.setValue = function( val )
	{
		var tagName = this.tagName();
		if( tagName == "input" && this.getAttr("type") == "text"  )
		{
			this.elements[0].value = val;
		}
		else if( tagName == "textarea" )
		{
			 this.elements[0].value = val;
		}
		return this;
	}
	
	this.show = function()
	{
	  this.walk( function(i,e ){
	    e.elements[0].style.display = "";
	  });
	}
	this.hide = function()
	{
	  this.walk( function(i,e ){
      e.elements[0].style.display = "none";
    });
	}
	/**
	 * get all offsprings from a element
	 */
	this.offsprings = function()
	{
		var result = new Array();
		var inx=0;
		var els = this.elements[0].children;
		if( !els ) els = document.body.children;
		for( var i=0;i<els.length;i++ )
		{
			if( els[i] )
			{
				result[inx++] = this.toDom( els[i] );
				var wArr = this.toDom(els[i]).offsprings();
				for( var j=0;j<wArr.length;j++ )
				{
					if( wArr[j] )
					{
						result[inx++]=wArr[j];
					}
				}
			}
		}
		return result;
	}
	/**
	 * document onload event
	 * @param callback
	 */
	this.loaded =function( callback )
	{
		window.onload=callback;
	}
	/**
	 * walk through the elements
	 */
	this.walk=function( callback )
	{
		for( var i=0; i<this.elements.length ;i++ )
		{
			var wTmp=new Wudimei.Dom();
			wTmp.elements = new Array();
			wTmp.elements[0] = this.elements[i];
			callback(i, wTmp );
		}
		return this;
	}
	
	this.getAttr = function( attrName )
	{
	  if( this.elements[0] )
	  {
	    return this.elements[0].getAttribute(attrName);
	  }
	  else
	  {
	    return null;
	  }
	}
	this.setAttr = function( attrName ,value )
  {
    return this.elements[0].setAttribute(attrName,value);
  }
  this.getClassName = function()
  {
    return this.elements[0].className;
  }
  this.getParent = function()
  {
	 return this.toDom(this.elements[0].parentNode);
  }
  this.setWidth = function(newWidth)
  {
    this.walk( function(i,e){
      e.elements[i].style.width = newWidth;
    });
    return this;
  }
  this.setStyle = function(newStyle)
  {
	 for( var i=0;i<this.elements.length;i++ )
	 {
		  if(this.elements[i]){
			  for( var key in newStyle)
			  {
		         this.elements[i].style[key] = newStyle[key];
			  }
		  }
	 }
	 return this;
  }
  this.getWidth =function()
  {
    return this.elements[0].style.width;
  }
  
  this.setHeight = function(newHeight)
  {
    this.walk( function(i,e){
      e.elements[i].style.height = newHeight;
    });
    return this;
  }
  this.getHeight =function()
  {
    return this.elements[0].style.height;
  }
  
  /**
   * bind event handler function to elements
   */
  this.on=function( eventName , callback )
  {
    this.walk( function(i,e){
      
      if( document.addEventListener )
      {
        e.elements[0].addEventListener(eventName,function(evtObj){
          var wEvent = new Wudimei.Event(evtObj);
          callback(e,wEvent); 
          },false);
      }
      else
      {
        e.elements[0].attachEvent( "on" + eventName,function(evtObj){
          var wEvent = new Wudimei.Event(evtObj);
          callback(e,wEvent);
        });
      }
    });
  }
  
  this.absLeftTop=function()
  {
	  var el = this.elements[0];
	  var top=0,left=0;
	  do{
		  top += el.offsetTop || 0;
		  left += el.offsetLeft || 0;
		  el = el.offsetParent;
	  }
	  while(el);
	  
	  return [left,top];
  }
  
}//end of class

//class Wudimei.Event
Wudimei.Event = function(evtObj)
{
   
  this.event = evtObj
  
  this.getPageX=function()
  {
    
    if( this.event.x){ return this.event.x; }
    else{ return this.event.pageX; }
  }
   
  this.getPageY=function()
  {
    if( this.event.y) return this.event.y;
    else return this.event.pageY;
  } 
  
  this.getTarget=function()
  {
	var srcEl = this.event.srcElement||this.event.target;
	var dom = new Wudimei.Dom();
	return dom.toDom(srcEl);
  }
  
  this.keyCode = function()
  {
    if( this.event.keyCode ) return this.event.keyCode;
    else if( this.event.charCode ) return this.event.charCode;
    else return this.event.which;
  }
  
  this.keyChar = function()
  {
    return String.fromCharCode( this.keyCode() );
  }
  
  this.shiftKey = function()
  {
    return this.event.shiftKey;
  }
  this.ctrlKey = function()
  {
    return this.event.ctrlKey;
  }
  this.altKey = function()
  {
    return this.event.altKey;
  }
  this.metaKey = function()
  {
    return this.event.metaKey;
  }
  
 
  /*event.shiftKey
   event.ctrlKey
   event.altKey
   event.metaKey
*/
}
//end of class Wudimei.Event

//class Wudimei.String
Wudimei.String = function()
{
  this.objectToQueryString=function( obj )
  {
      var str = "";
      var qsArray = new Array();
      var qsIdx=0;
      for(var k in obj )
      {
        qsArray[qsIdx++]= encodeURIComponent( k ) +"="+ encodeURIComponent( obj[k] );
      }
      return qsArray.join("&") ;
  }
  this.trim=function( str )
  {
	  return str.replace(/(^[\s]*)|([\s]*$)/g, "");
  }
}
//end of class Wudimei.String()

//class Options
Wudimei.Options=function()
{
  this.update=function( defaultOptions , options )
  {
    for( var k in options )
    {
      defaultOptions[k] = options[k];
    }
    return defaultOptions;
  }
}
//end of class

//class Wudimei.Request
Wudimei.Request=function()
{
  this.getXmlHttpRequest=function()
  {
    var xmlHttp = null;
    try{
      xmlHttp = new XMLHttpRequest();
    }
    catch(e)
    {
      try{
        xmlHttp =new ActiveXObject("MSXML2.XMLHTTP");
      }
      catch(e2)
      {
        try{
          xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e3)
        {
          xmlHttp=false;
        }
      }
    }
    return xmlHttp;
  }
  this.get = function(url,params,success)
  {
	  return this.ajax({method:"GET",url:url,params:params,success:success});
  }
  this.post = function(url,params,success)
  {
	  return this.ajax({method:"POST",url:url,params:params,success:success});
  }
  this.ajax=function(options)
  {
     var defaultOptions ={
       method:"GET",
       url:"",
       params:null,
       success:null,
       error:null
     };
     var opts = new Wudimei.Options();
     options=opts.update( defaultOptions,options);
     
     var strObj =  new Wudimei.String();
     var paramsString = strObj.objectToQueryString( options.params );
     var method=options.method.toUpperCase();
     var url = options.url;
     if( method =="GET" )
     {
       if( url.indexOf("?") == -1 )
       {
         url += "?" + paramsString;
       }
       else
       {
         url += "&" + paramsString;
       }
     }
     
     var xmlHttp=this.getXmlHttpRequest();
     xmlHttp.open(method,url,true);
     xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
     xmlHttp.onreadystatechange=function(){ 
       if( xmlHttp.readyState==4)
       {
         options.success(xmlHttp.responseText,xmlHttp.responseXML);
       }
     };
     
     xmlHttp.send(paramsString);
  }
}//end class Wudimei.Request()

Wudimei.log = function( txt ){
	var d = new Wudimei.Dom();
	var lg = d.query("#log");
	lg.setHtml(txt + "<br />");
}