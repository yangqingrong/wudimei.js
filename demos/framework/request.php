<?php
$type = @$_POST["type"];
if( $type == false )
{
	$type = @$_GET["type"];
}
if( $type == "xml" )
{
	header("Content-Type:text/xml");
	echo '<?xml version="1.0"?>
	<root><item>yang</item><item>a</item></root>';
}
else 
{
	echo "\$_GET:\n";
	print_r( $_GET );
	echo "\$_POST:\n";
	print_r( $_POST );
}