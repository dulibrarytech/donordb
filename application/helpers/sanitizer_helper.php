<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * sanitizes string data 
 * @param $value
 * @return string $sanitized
 *
 */
function sanitizePost($inputArray) 
{
    if(is_array($inputArray))
    {
        $outputArray = array();
        $sanitized = "";

        foreach($inputArray as $key => $postValue)
        {
            if(is_string($postValue))
            {
                $sanitized = htmlspecialchars($sanitized, ENT_QUOTES, 'UTF-8');

                $sanitized = strip_tags($sanitized);

                $specChars = array('@', '#', '$', '%', '&', '(', ')', '*', ';');
                $sanitized = str_ireplace($specChars, '', $sanitized);

                $outputArray[$key] = $sanitized;
            }
        }

        return $outputArray;
    }
}

function sanitizeString($inputString)
{
    if(is_string($inputString))
    {
        $sanitized = "";
        $sanitized = htmlspecialchars($sanitized, ENT_QUOTES, 'UTF-8');

        $sanitized = strip_tags($sanitized);

        $specChars = array('@', '#', '$', '%', '&', '(', ')', '*', ';');
        $sanitized = str_ireplace($specChars, '', $sanitized);

        return $sanitized;
    }
}

function removeSQL($inputString)
{
    // $SQL = array('select', 'update', 'add', );
    // $sanitized = str_ireplace($SQL, '', $sanitized);

    // return $sanitized;
}