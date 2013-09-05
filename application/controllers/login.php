<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller 
{

    public function __construct() 
    {
        parent::__construct();

        $this->load->helper('url');
    }

    /**
     * loads login form
     */
    public function index() 
    {
        switch($this->input->server("REQUEST_METHOD")) 
        {

            case "GET":

                $this->load->view("layouts/login.form.php");
                break;

            case "POST":

                $this->load->model('loginModel');
                echo json_encode($this->loginModel->authenticate($this->input->post()));
                break;

            default:
                header("HTTP/1.1 404 Not Found");
                return;
        }

    }

    /**
     * logs the user out of the system and deletes user session.  Reload homepage and re-auth
     */
    public function logout() 
    {
        $this->phpsessions->delete("donorDB_profile");
        log_message("info", "logout: " . $userName);
        redirect('search');
    }

    public function getSessionProfile() 
    {
        echo json_encode($this->phpsessions->get("donorDB_profile"));
    }
}