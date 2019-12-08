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

                // case 'register':
                //     $d = json_decode( base64_decode( file_get_contents('php://input')));
                //     echo json_encode($auth->registeruser($d));
                // break;

                case 'loginAdmin':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($auth->loginAdmin($d));
                break;

                case 'checkAdmin':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($auth->checkAdmin($d));
                break;

                case 'loginFaculty':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($auth->loginFaculty($d));
                break;

                case 'checkFaculty':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($auth->checkFaculty($d));
                break;

                case 'loginStudent':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($auth->loginStudent($d));
                break;

                case 'checkStudent':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($auth->checkStudent($d));
                break;

                

                // data pulling related cases

                case 'getclass':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->myclass($d));
                break;

                case 'getclassf':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->myclassf($d));
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

                case 'getProspectusCopy':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getProspectusCopy($d));
                break;

                case 'getProspectusCopyF':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getProspectusCopyF($d));
                break;

                case 'getStudentSchedule':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getStudentSchedule($d));
                break;

                case 'getGrades':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getGrades($d));
                break;

                // data updating cases
                case 'updateStudentProfile':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->updateStudentProfile($d));
                break;

                // data pushing related cases
                case 'addfile':
                    echo json_encode($post->addfile());
                break;

                case 'uploadGrade':
                    echo json_encode($post->uploadGrade());
                break;

                case 'uploadImageStudent':
                    echo json_encode($post->uploadImageStudent());
                break;



                // faculty/profiley
                case 'getStudent':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getStudent($d));
                break;

                case 'getActiveClasses':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getActiveClasses($d));
                break;

                case 'getSettings':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getSettings($d));
                break;

                case 'getEnrolledClasses':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getEnrolledClasses($d));
                break;

                case 'enrollSingleClass':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->enrollSingleClass($d));
                break;

                case 'removeEnrolledSubject':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->removeEnrolledSubject($d));
                break;

                case 'getCourseBlocks':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->getCourseBlocks($d));
                break;

                case 'enrollByBlock':
                    $d = json_decode( base64_decode( file_get_contents('php://input')));
                    echo json_encode($post->enrollByBlock($d));
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