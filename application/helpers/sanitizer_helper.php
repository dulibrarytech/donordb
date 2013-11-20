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
                $sanitized = htmlspecialchars($postValue, ENT_QUOTES, 'UTF-8');

                $sanitized = strip_tags($sanitized);

                //$specChars = array('$', '%', '&', '(', ')', '*', ';');
                //$sanitized = str_ireplace($specChars, '', $sanitized);
                
                $outputArray[$key] = $sanitized;
            }
        }
        return $outputArray;
    }
}

function sanitizeString($inputString)
{
    $sanitized = "";

    if(is_string($inputString))
    {
        $sanitized = htmlspecialchars($inputString, ENT_QUOTES, 'UTF-8');

        $sanitized = strip_tags($sanitized);

        //$specChars = array('$', '%', '&', '(', ')', '*', ';');  
        //$sanitized = str_ireplace($specChars, '', $sanitized);
    }

    return $sanitized;
}

function removeSQL($inputString)
{
    // $SQL = array('select', 'update', 'add', );
    // $sanitized = str_ireplace($SQL, '', $sanitized);

    // return $sanitized;
}

function restoreQuotes($input)
{
    if(gettype($input) == "array")
    {
        $output = array();

        while (list($key, $val) = each($input)) 
        {
            if(gettype($val) == "string")
            {
                $newVal = str_replace('&quot;', '"', $val);
                $newVal = str_replace('&#039;', "'", $newVal);
            }
            else
                $newVal = $val;

            $output[$key] = $newVal;
        }
    }
    else if(gettype($input) == "string")
    {
        $output = "";

        $newVal = str_replace('&quot;', '"', $input);
        $newVal = str_replace('&#039;', "'", $newVal);

        $output = $newVal;
    }

    return $output;
}