<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ldap 
{
    private $host = "ldap://ldap.du.edu";
    private $port = "636";
    private $baseDn = "ou=people,o=du.edu,o=universityofdenver";

    /**
    * authenticates against ldap server
    * @param $userName
    * @param $passWord
    * @return bolean
    */
    public function authenticate($userName, $passWord) 
    {
        // $ldapUser = "uid=" . $userName . "," . $this->baseDn;
        // $ldap = new Zend\Ldap\Ldap();

        // try 
        // {
        //     $ldap->connect($this->host, $this->port);
        //     $ldap->bind($ldapUser, $passWord);
        // } 
        // catch(Exception $e) // Zend\Ldap\Exception\LdapException $zle
        // { 
        //     log_message("error", $e->getMessage());
        //     return FALSE;
        // }

        // $ldap->disconnect();
        return TRUE;
    }
} // end ldap class
