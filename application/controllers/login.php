<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

    public function __construct() 
    {
        parent::__construct();
    }

    public function index() 
    {

        switch($this->input->server("REQUEST_METHOD")) 
        {

            case "GET":

                $data['pageLoader'] = "<script>authentication.validateSession();</script>";

                $this->load->view('lookup-view', $data);

                break;

            case "POST":

                $this->load->model("loginModel");

                //$profile = $this->loginModel->authenticate($this->input->post());
                $profile = array('isValid' => true, 'roleID' => 1);

                echo json_encode("test encode line");

                break;

            default:

                header("HTTP/1.0 404 Not Found");
                return;
        }
    }

    /**
     * logs the user out of the system and deletes user session
     */
    public function logout() 
    {
        $this->phpsessions->delete("donorDB_profile");
        redirect("/");
    }

    public function getSessionProfile() {

        echo json_encode($this->phpsessions->get("donorDB_profile"));
    }
}