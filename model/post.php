<?php
    class Post{

        private $conn;
        private $sql;
        private $result;
        private $data = array();
        private $info = [];

        public function __construct($db){
            $this->conn = $db;
        }

        // admin/facultymembers
        function getFaculty($d){
            return $this->executeWithRes("SELECT * from tbl_faculty WHERE fa_department='".$d->data[0]->fa_department."' ORDER BY fa_lname,fa_fname,fa_mname,fa_extname ASC");
        }

        function delFaculty($d){
            return $this->executeWithoutRes("DELETE from tbl_faculty WHERE fa_empnumber='$d->empNo'");
        }

        function addFaculty($d){
            return $this->executeWithoutRes("DELETE from tbl_faculty WHERE fa_empnumber='$d->empNo'");
        }

        // admin/subjectprospectus
        function getProspectus($d){
            return $this->executeWithRes("SELECT * from tbl_subjects WHERE su_course='$d->courseName'AND su_cy='$d->syCy' ORDER BY su_yrlevel, su_sem ASC");
        }

        function addProspectus($d){
            return $this->executeWithRes("INSERT INTO tbl_subjects (su_code, su_description, su_lecunits, su_labunits, su_rleunits, su_prereq, su_sem, su_yrlevel, su_cy, su_course) VALUES ('$d->suCode', '$d->suDesc', $d->suLecu, $d->suLabu, $d->suRleu, '$d->suPre', $d->suSem, $d->suYear, '$d->su_Cy', '$d->suCourse')");
        }

        function delProspectus($d){
            return $this->executeWithoutRes("DELETE from tbl_subjects WHERE su_recno='$d->recNo'");
        }
        
        function updateProspectus($d){
            return $this->executeWithoutRes("UPDATE tbl_subjects SET su_code='$d->suCode',su_description='$d->suDesc',su_lecunits=$d->suLecu,su_labunits=$d->suLabu,su_rleunits=$d->suRleu,su_prereq='$d->suPre',su_sem=$d->suSem,su_yrlevel=$d->suYear,su_cy='$d->suCy',su_course='$d->suCourse' WHERE su_recno = $d->recNo");
        }

        function uploadProspectus(){
            if(isset($_FILES['file'])){
    
                $file_name = $_FILES['file']['name'];
                $target_dir = "../filesFP/".$file_name;
                $file_explodedname = explode('.', $file_name);
                $file_ext = strtolower(end($file_explodedname) );
    
                $extensions = array("xlsx");
    
                if(in_array($file_ext,$extensions)){ // check if file is excel
    
                    if(move_uploaded_file($_FILES['file']['tmp_name'], $target_dir)){
    
                        require_once "Classes/PHPExcel.php";
                        
                        $excelReader = PHPExcel_IOFactory::createReaderForFile($target_dir);
                        $excelObj = $excelReader->load($target_dir);
                        $worksheet = $excelObj->getSheet(0);
                        $lastRow = $worksheet->getHighestRow();
    
                        for ($row = 4; $row <= $lastRow; $row++) {
    
                            $proTitle = $worksheet->getCell('A'.$row)->getValue();
                            $proCode = $worksheet->getCell('B'.$row)->getValue();
                            $proPre = $worksheet->getCell('C'.$row)->getValue();
                            $proLecu = $worksheet->getCell('D'.$row)->getValue();
                            $proLabu = $worksheet->getCell('E'.$row)->getValue();
                            $proRleu = $worksheet->getCell('F'.$row)->getValue();
                            $proYear = $worksheet->getCell('G'.$row)->getValue();
                            $proSem = $worksheet->getCell('H'.$row)->getValue();
                            $proCourse = $worksheet->getCell('C2')->getValue();
                            $proCy = $worksheet->getCell('E2')->getValue();
                            $query = "INSERT INTO tbl_subjects(su_code,su_description,su_lecunits,su_labunits,su_rleunits,su_prereq,su_sem,su_yrlevel,su_cy,su_course)
                             VALUES('$proCode','$proTitle','$proLecu','$proLabu','$proRleu','$proPre','$proSem','$proYear','$proCy','$proCourse')";
                            
                            $this->conn->query($query);
    
                        }
                        
                        return $this->info = array(
                            'status'=>array(
                                'remarks'=>true,
                                'message'=>'Uploading success.'
                            ),
                            'data' =>$this->data,
                            'timestamp'=>date_create(),
                            'prepared_by'=>'F-Society'
                        );
    
                    }else{
                        return $this->info = array('status'=>array(
                            'remarks'=>false,
                            'message'=>'Uploading failed.'),
                        'timestamp'=>date_create(),
                        'prepared_by'=>'F-Society' );
                    }
    
                }else{
                    return $this->info = array('status'=>array(
                        'remarks'=>false,
                        'message'=>'Invalid file for uploading faculty.'),
                    'timestamp'=>date_create(),
                    'prepared_by'=>'F-Society' );
                }
                
                
            }else{
                return $this->info = array('status'=>array(
                    'remarks'=>false,
                    'message'=>'No file uploaded.'),
                'timestamp'=>date_create(),
                'prepared_by'=>'F-Society' );
            }
    
        }

        // admin/filters
        function getProspectusCourse($d){
            return $this->executeWithRes("SELECT DISTINCT co_name from tbl_courses WHERE co_dept = '$d->deptName'");
        }
        function getProspectusCy($d){
            return $this->executeWithRes("SELECT DISTINCT su_cy from tbl_subjects WHERE su_course = '$d->courseName'");
        }

        // students/schedule
        function getStudentSchedule($d){
            return $this->executeWithRes("SELECT * from tbl_classes LEFT JOIN tbl_enrolledsubjects ON tbl_classes.cl_code = tbl_enrolledsubjects.es_clcode 
            INNER JOIN tbl_studentinfo ON tbl_enrolledsubjects.es_idnumber = tbl_studentinfo.si_idnumber 
            INNER JOIN tbl_faculty ON tbl_classes.cl_facultyid = tbl_faculty.fa_empnumber INNER JOIN tbl_subjects ON tbl_classes.cl_sucode = tbl_subjects.su_code 
            WHERE tbl_enrolledsubjects.es_idnumber=$d->si_idnumber");
        }

        // students/prospectus
        function getProspectusCopy($d){
            return $this->executeWithRes("SELECT * FROM tbl_subjects WHERE su_course='$d->si_course' ORDER BY su_yrlevel ASC, su_sem ASC");
        }
        function getProspectusCopyF($d){
            return $this->executeWithRes("SELECT * FROM tbl_subjects WHERE su_course='$d->si_course' AND su_yrlevel=$d->year AND su_sem=$d->sem");
        }
        
        // students/grades
        function getGrades($d){
            return $this->executeWithRes("SELECT * FROM tbl_enrolledsubjects WHERE es_idnumber = $d->si_idnumber");
        }

        // students/profile
        function updateStudentProfile($d){
            return $this->executeWithRes("UPDATE tbl_studentinfo SET si_email = $d->$email, si_address = $d->$address WHERE si_idnumber=$d->$si_idnumber");
        }

        function uploadImageStudent(){
            if(isset($_FILES['file'])){

                $studId = $_POST['studId'];
                $file_name = $_FILES['file']['name'];
                $file_explodedname = explode('.', $file_name);
                $file_ext = strtolower(end($file_explodedname) );
                $newfile_name = $studId . '.' . $file_ext;
                $target_dir = "../imagesFP/".$newfile_name;

                $extensions = array("jpeg", "jpg", "png");

                if(in_array($file_ext,$extensions)){ // check if file is valid

                    if(move_uploaded_file($_FILES['file']['tmp_name'], $target_dir)){
                        $query = "UPDATE tbl_studentinfo SET si_picture = 'http://localhost/imagesFP/$newfile_name' WHERE si_idnumber=$studId";
                        $this->executeWithoutRes($query);
                        
                        return $this->info = array(
                            'status'=>array(
                                'remarks'=>true,
                                'message'=>'Uploading success.'
                            ),
                            'data' =>$this->data,
                            'timestamp'=>date_create(),
                            'prepared_by'=>'F-Society'
                        );

                    }else{
                        return $this->info = array('status'=>array(
                            'remarks'=>false,
                            'message'=>'Uploading failed.'),
                        'timestamp'=>date_create(),
                        'prepared_by'=>'F-Society' );
                    }

                }else{
                    return $this->info = array('status'=>array(
                        'remarks'=>false,
                        'message'=>'Invalid file for uploading grades.'),
                    'timestamp'=>date_create(),
                    'prepared_by'=>'F-Society' );
                }
                
                
            }else{
                return $this->info = array('status'=>array(
                    'remarks'=>false,
                    'message'=>'No file uploaded.'),
                'timestamp'=>date_create(),
                'prepared_by'=>'F-Society' );
            }

        }

        // faculty
        function myclass($d){
            return $this->executeWithRes("SELECT * from tbl_classes WHERE cl_facultyid=$d->fa_empnumber");
        }

        function myclassf($d){
            return $this->executeWithRes("SELECT * from tbl_classes WHERE cl_facultyid='".$d->data[0]->fa_empnumber."' and cl_isnormal='$d->type'");
        }

        function classFiles($d){
            return $this->executeWithRes("SELECT * from tbl_files WHERE fi_clcode=$d->classId");
        }

        function students($d){
            return $this->executeWithRes("SELECT si_idnumber,CONCAT(si_lastname,', ',si_firstname,' ',si_midname,' ',si_extname) as si_fullname,si_department,si_course from tbl_studentinfo WHERE si_department='CCS' ORDER BY si_lastname,si_firstname,si_midname,si_extname DESC");
        }

        function getClassStudents($d){
            return $this->executeWithRes("SELECT si.si_idnumber,CONCAT(si.si_lastname,', ',si.si_firstname,' ',si.si_midname,' ',si.si_extname) as si_fullname,es.es_mgrade from tbl_studentinfo as si INNER JOIN tbl_enrolledsubjects as es on es.es_idnumber = si.si_idnumber INNER JOIN tbl_classes as cl on cl.cl_code = es.es_clcode WHERE cl.cl_code = 32122 ORDER BY si.si_lastname ASC");
        }


        // faculty/profiley
            function getStudent($d) {
                return $this->executeWithRes("SELECT * from tbl_studentinfo WHERE si_idnumber = '$d->idNumber'");
            }

            function getActiveClasses($d) {
                return $this->executeWithRes("SELECT * from tbl_classes as cl JOIN tbl_subjects as su on su.su_code = cl.cl_sucode WHERE cl.cl_schoolyear = '$d->actSY' and cl.cl_sem = '$d->actSem' and (cl.cl_code LIKE '%$d->searchClass%' or su.su_description LIKE '%$d->searchClass%' or cl.cl_room LIKE '%$d->searchClass%' or su.su_code LIKE '%$d->searchClass%' or cl.cl_block LIKE '%$d->searchClass%') ORDER BY cl.cl_block,su.su_code,cl.cl_day,cl.cl_stime,cl.cl_etime ASC LIMIT 25");
            }

            function getSettings($d) {
                return $this->executeWithRes("SELECT * from tbl_settings");
            }

            function getEnrolledClasses($d) {
                return $this->executeWithRes("SELECT * from tbl_classes as cl JOIN  tbl_enrolledsubjects as es on es.es_sucode = cl.cl_sucode JOIN tbl_subjects as su on su.su_code = cl.cl_sucode WHERE cl.cl_schoolyear = '$d->actSY' and cl.cl_sem = '$d->actSem' and es.es_idnumber='$d->idNumber' and es.es_block = cl.cl_block ORDER BY cl.cl_block,su.su_code,cl.cl_day,cl.cl_stime,cl.cl_etime ASC");
            }

            function enrollSingleClass($d) {

                $this->result = $this->conn->query("SELECT * FROM tbl_enrolledsubjects WHERE es_clcode = '$d->classCode' and es_idnumber = '$d->idNumber' and es_sucode = '$d->subjectCode' and es_block='$d->block'");
    
                if ($this->result->num_rows>0) {
                  
                    return $this->info = array(
                        'status'=>array(
                            'remarks'=>false,
                            'message'=>'Subject already enrolled.'
                        ),
                        'data' =>$this->data,
                        'timestamp'=>date_create(),
                        'prepared_by'=>'F-Society'
                    );
        
                } else {
                    return $this->executeWithoutRes("INSERT INTO tbl_enrolledsubjects(es_idnumber,es_clcode,es_sucode,es_block) VALUES('$d->idNumber','$d->classCode','$d->subjectCode','$d->block')");
                }
            }

            function removeEnrolledSubject($d) {
                return $this->executeWithoutRes("DELETE FROM tbl_enrolledsubjects WHERE es_recno='$d->recno'");
            }

            function getCourseBlocks($d) {
                return $this->executeWithRes("SELECT DISTINCT cl_block from tbl_classes WHERE cl_block LIKE '%$d->si_course%'");
            }

            function enrollByBlock($d) {
                return $this->executeWithoutRes("INSERT INTO tbl_enrolledsubjects(es_idnumber,es_clcode,es_sucode,es_block) SELECT '$d->si_idnumber',cl_code,cl_sucode,cl_block from tbl_classes WHERE cl_block = '$d->blockSelected'");
            }




























        // all push method
        // function addfile(){

        //     if(isset($_FILES['file'])){

        //         $classId = $_POST['classId'];

        //         $errors= array();
        //         $target_dir = "../filesFP/".$classId;
        //         $file_name = $_FILES['file']['name'];
        //         $file_tmp =$_FILES['file']['tmp_name'];
        //         $file_size =$_FILES['file']['size'];

        //         if (!file_exists($target_dir)) {
        //             mkdir($target_dir);
        //         }

        //         if(move_uploaded_file($file_tmp,"../filesFP/".$_POST['classId']."/".$file_name)){
        //             return $this->executePushing("INSERT INTO tbl_files(fi_name,fi_path,fi_clcode) VALUES('$file_name','http://localhost/filesFP/$classId/$file_name','$classId')");
        //         }else{
        //             return $this->info = array('status'=>array(
        //                 'remarks'=>false,
        //                 'message'=>'Uploading failed.'),
        //             'timestamp'=>date_create(),
        //             'prepared_by'=>'F-Society  ' );
        //         }
                
        //     }else{
        //         return $this->info = array('status'=>array(
        //             'remarks'=>false,
        //             'message'=>'No file uploaded.'),
        //         'timestamp'=>date_create(),
        //         'prepared_by'=>'F-Society' );
        //     }
            

        // }

        function uploadGrade(){
            if(isset($_FILES['file'])){

                $classId = $_POST['classId'];
                $file_name = $_FILES['file']['name'];
                $target_dir = "../filesFP/".$file_name;
                $file_explodedname = explode('.', $file_name);
                $file_ext = strtolower(end($file_explodedname) );

                $extensions = array("xlsx");

                if(in_array($file_ext,$extensions)){ // check if file is excel

                    if(move_uploaded_file($_FILES['file']['tmp_name'], $target_dir)){

                        require_once "Classes/PHPExcel.php";
                        
                        $excelReader = PHPExcel_IOFactory::createReaderForFile($target_dir);
                        $excelObj = $excelReader->load($target_dir);
                        $worksheet = $excelObj->getSheet(0);
                        $lastRow = $worksheet->getHighestRow();

                        for ($row = 4; $row <= $lastRow; $row++) {

                            $idnumber = $worksheet->getCell('B'.$row)->getValue();
                            $grade = $worksheet->getCell('D'.$row)->getValue();

                            if(is_numeric($idnumber)){
                                $query = "UPDATE tbl_enrolledsubjects SET es_mgrade = $grade WHERE es_idnumber=$idnumber and es_clcode = $classId";
                                $this->executeWithoutRes($query);
                            }

                        }
                        
                        return $this->info = array(
                            'status'=>array(
                                'remarks'=>true,
                                'message'=>'Uploading success.'
                            ),
                            'data' =>$this->data,
                            'timestamp'=>date_create(),
                            'prepared_by'=>'F-Society'
                        );

                    }else{
                        return $this->info = array('status'=>array(
                            'remarks'=>false,
                            'message'=>'Uploading failed.'),
                        'timestamp'=>date_create(),
                        'prepared_by'=>'F-Society' );
                    }

                }else{
                    return $this->info = array('status'=>array(
                        'remarks'=>false,
                        'message'=>'Invalid file for uploading grades.'),
                    'timestamp'=>date_create(),
                    'prepared_by'=>'F-Society' );
                }
                
                
            }else{
                return $this->info = array('status'=>array(
                    'remarks'=>false,
                    'message'=>'No file uploaded.'),
                'timestamp'=>date_create(),
                'prepared_by'=>'F-Society' );
            }

        }



        // code for execution of sql queries
        function executeWithRes($query){

            $this->result = $this->conn->query($query);
    
            if ($this->result->num_rows>0) {
                while($res = $this->result->fetch_assoc()){
                    array_push($this->data,$res);
                }
              
                return $this->info = array(
                    'status'=>array(
                        'remarks'=>true,
                        'message'=>'Query with data success.'
                    ),
                    'data' =>$this->data,
                    'timestamp'=>date_create(),
                    'prepared_by'=>'F-Society'
                );
    
            } else {
                return $this->info = array('status'=>array(
                        'remarks'=>false,
                        'message'=>'No data pulled.'),
                    'timestamp'=>date_create(),
                    'prepared_by'=>'F-Society' );
            }

        }

        function executeWithoutRes($query){
            if ($this->conn->query($query)){
                return $this->info = array(
                    'status'=>array(
                        'remarks'=>true,
                        'message'=>'Query without data success.'
                    ),
                    'data' =>$this->data,
                    'timestamp'=>date_create(),
                    'prepared_by'=>'F-Society'
                );
            } else {
                return $this->info = array('status'=>array(
                        'remarks'=>false,
                        'message'=>'Data adding failed.'),
                    'timestamp'=>date_create(),
                    'prepared_by'=>'F-Society' );
            }
        }
    }
?>