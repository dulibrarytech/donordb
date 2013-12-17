<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * sanitizes post data 
 * @param $inputArray post array
 * @return array $sanitized
 *
 */
function sanitizePost($inputArray) 
{
    if(is_array($inputArray))
    {
        $outputArray = array();
        $sanitized = "";
        log_message('info', 'san: pre: ' . print_r($inputArray,true));

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
        log_message('info', 'san: post (returning): ' . print_r($outputArray,true));
        return $outputArray;
    }
}

/**
 * reverts sanitized post data 
 * @param $inputArray post array
 * @return array $sanitized
 *
 */
function revertSanitizedPost($inputArray) 
{
    if(is_array($inputArray))
    {
        $outputArray = array();
        $reverted = "";

        log_message('info', 'revert: pre: ' . print_r($inputArray,true));
        foreach($inputArray as $key => $postValue)
        {
            if(is_string($postValue))
            {
                $reverted = htmlspecialchars_decode($postValue, ENT_QUOTES);
                //$reverted = restoreQuotes($reverted); // 12/16/13 htmlspecialchars_decode is not decoding single quotes!
                $outputArray[$key] = $reverted;
            }
        }
        log_message('info', 'revert: post (returning): ' . print_r($outputArray,true));
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

function revertSanitizedString($inputString)
{
    $sanitized = "";

    if(is_string($inputString))
    {
        $reverted = htmlspecialchars_decode($inputString, ENT_QUOTES);
    }

    return $reverted;
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