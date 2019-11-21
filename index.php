<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, POST, PATCH, OPTIONS, GET');
    header('Content-Type: application/json');

    include_once './config/database.php';
    include_once './model/post.php';
    include_once './model/auth.php';

    $database = new Database();
    $db = $database->connect();
    $post = new Post($db);
    $auth = new Auth($db);
    $data = array();

    $req = explode('/',rtrim($_REQUEST['request'],'/'));

    switch ($_SERVER['REQUEST_METHOD']) {

        case 'POST':

            switch ($req[0]) {

                // admin/facultymembers
                case 'getFaculty':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getFaculty($d)); 
                break;

                case 'delFaculty':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->delFaculty($d)); 
                break;

                case 'addFaculty':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($auth->addFaculty($d)); 
                break;

                case 'uploadFaculty':
                    echo json_encode($auth->uploadFaculty()); 
                break;
                











                // admin/subjectprospectus
                case 'getProspectus':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getProspectus($d)); 
                break;
                case 'uploadProspectus':
                    echo json_encode($post->uploadProspectus()); 
                break;
                
                //filters
                case 'getProspectusCourse':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getProspectusCourse($d)); 
                break;
                case 'getProspectusCy':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getProspectusCy($d)); 
                break;

                // authentication related cases
                case 'register':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($auth->registeruser($d));
                break;

                case 'login':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($auth->loginuser($d));
                break;

                // case 'loginFaculty':
                //     $d = json_decode( base64_decode( file_get_contents('php://input')));
                //     echo json_encode($auth->loginFaculty($d));
                // break;

                // case 'checkFaculty':
                //     $d = json_decode( base64_decode( file_get_contents('php://input')));
                //     echo json_encode($auth->checkFaculty($d));
                // break;

                // case 'loginStudent':
                //     $d = json_decode( base64_decode( file_get_contents('php://input')));
                //     echo json_encode($auth->loginStudent($d));
                // break;

                // case 'checkStudent':
                //     $d = json_decode( base64_decode( file_get_contents('php://input')));
                //     echo json_encode($auth->checkStudent($d));
                // break;

                case 'checkuser':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($auth->checkuser($d));
                break;

                // data pulling related cases

                case 'getclass':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->myclass($d));
                break;

                case 'getfiles':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->classFiles($d));
                break;

                case 'students':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->students($d));
                break;

                case 'getClassStudents':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getClassStudents($d));
                break;


                // data pushing related cases
                case 'addfile':
                    echo json_encode($post->addfile());
                break;

                case 'uploadGrade':
                    echo json_encode($post->uploadGrade());
                break;

                


                default:
                    http_response_code(400);
                    echo json_encode(array('status'=>'failed', 'message'=>'Bad request.'));

            }

        break;


        default:
            http_response_code(400);
            echo json_encode(array('status'=>'failed', 'message'=>'Bad request.'));
    
    }

    $db->close();
?>