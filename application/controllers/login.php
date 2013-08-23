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

                $data['pageLoader'] = "<script>searchView.initPage();</script>";

                $this->load->view('lookup-view', $data);

                break;

            case "POST":

                $this->load->model("loginModel");

                $profile = $this->loginModel->authenticate($this->input->post());


                echo json_encode($profile);

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
}