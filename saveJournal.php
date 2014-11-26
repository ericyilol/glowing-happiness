/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

<?php
if (isset($GLOBALS["HTTP_RAW_POST_DATA"]))
{
// Get the data
$journalData=$GLOBALS['HTTP_RAW_POST_DATA'];


$fp = fopen( "journal/".$journalData.".txt", "wb" );
fwrite( $fp, $journalData);
fclose( $fp );
}
?>