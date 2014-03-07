<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class ActiveDirectory  
{
    private $primary = "moe.cair.du.edu";
    private $secondary = "curly.cair.du.edu";
    private $tertiary = "larry.cair.du.edu";
    private $domain = "du.edu";
    private $baseDn = "DC=du,DC=du.edu";

    /**
     * authenticates against Active Directory Server
     * @param $userName
     * @param $password
     * @return boolean
     */
    public function authenticate($userName, $passWord) 
    {
        $adOptions = array(
            'larry' => array(
                'host'=>$this->primary,
                'accountDomainName'=>$this->domain,
                'baseDn'=>$this->baseDn,
            ),
            'curly' => array(
                'host'=>$this->secondary,
                'accountDomainName'=>$this->domain,
                'baseDn'=>$this->baseDn,
            ),
            'moe' => array(
                'host'=>$this->tertiary,
                'accountDomainName'=>$this->domain,
                'baseDn'=>$this->baseDn,
            ),
        );

        $ldap = new Zend\Ldap\Ldap();

        foreach ($adOptions as $name => $options) 
        {
            $ldap->setOptions($options);
        
            try 
            {
                $ldap->bind($userName, $passWord);
		log_message("info", "BIND SUCCESS: options" . print_r($options, true));
                return TRUE;
            } 
            catch (Zend\Ldap\Exception\LdapException $zle) 
            {
                if ($zle->getCode() === Zend\Ldap\Exception\LdapException::LDAP_X_DOMAIN_MISMATCH) 
                {
                    continue;
                } 
                else 
                {
                    log_message("error", $zle->getMessage());
                    return FALSE;
                }
            }
        }
        return TRUE;
    }
} // end ad class
