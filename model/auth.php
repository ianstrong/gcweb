<?php

class Auth{

	private $header;
	private $payload;
	private $signature;

	private $conn;
	private $sql;
	private $result;
	private $data = array();
	private $info= [];

    public function __construct($db) {
        $this->conn = $db;
	}
	


	// admin/facultymembers
	function addFaculty($d) {
		$this->result = $this->conn->query("SELECT * from tbl_faculty WHERE fa_empnumber='$d->empNo'");
		if($this->result->num_rows>0){
			while($res = $this->result->fetch_assoc()){
				array_push($this->data,$res);
			}
			return $this->info = array('status'=>array('remarks'=>false, 'message'=>'Employee number already exists.'), 'timestamp'=>date_create(),'prepared_by'=>'F-Society');
		}else{
			$pass = $this->encryptPassword("Aa1234567");
			$this->conn->query("INSERT INTO tbl_faculty(fa_empnumber,fa_fname,fa_mname,fa_lname,fa_extname,fa_password) 
			VALUES('$d->empNo','$d->empFname','$d->empMname','$d->empLname','$d->empEname','$pass')");
			return $this->info = array('status'=>array('remarks'=>true, 'message'=>'Successfully added.'), 'timestamp'=>date_create(),'prepared_by'=>'F-Society');
		}
	}

	function uploadFaculty(){
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

					for ($row = 3; $row <= $lastRow; $row++) {

						$empNo = $worksheet->getCell('B'.$row)->getValue();
						$empFname = $worksheet->getCell('C'.$row)->getValue();
						$empMname = $worksheet->getCell('D'.$row)->getValue();
						$empLname = $worksheet->getCell('E'.$row)->getValue();
						$empEname = $worksheet->getCell('F'.$row)->getValue();
						$pass = $this->encryptPassword("Aa1234567");
						$query = "INSERT INTO tbl_faculty(fa_empnumber,fa_fname,fa_mname,fa_lname,fa_extname,fa_password)
						 VALUES('$empNo','$empFname','$empMname','$empLname','$empEname','$pass')";
						
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





















	function generateToken($empNo) {
		$this->header = $this->generateHeader();
		$this->payload = $this->generatePayload($empNo);
		$this->signature = $this->generateSignature();
		return "$this->header.$this->payload.$this->signature";
	}

	function generateHeader() {
		$h = [
			'alg'  => 'HS256',
			'typ' => 'jwt'
		];

		$h = str_replace(['+','/','-','='],['-','_',''], base64_encode(json_encode($h)));
		return $h;
	}

	function generatePayload($empNo){
		$p = [
			'eno' => $empNo
		];

		$p = str_replace(['+','/','-','='],['-','_',''],  base64_encode(json_encode($p)));
		return $p;
	}

	function generateSignature(){
		$s = hash_hmac('sha256', "$this->header.$this->payload", 'com.gordoncollege.FIFO');
		$s = str_replace(['+','/','-','='],['-','_',''], $s);
		return $s;
	}

	//password hashing
	function encryptPassword($pword) {
		$hashFormat = "$2y$10$";
		$saltLength = 22;
		$salt = $this->generateSalt($saltLength);
		return crypt($pword,$hashFormat.$salt);
	}

	function generateSalt($len){
		$urs = md5(uniqid(mt_rand(),true));
		$b64string = base64_encode($urs);
		$mb64string = str_replace('+', '.', $b64string);
		return substr($mb64string, 0,$len);
	}

	//password checking
	function pwordCheck($pword, $existingHash){
		$hash = crypt($pword,$existingHash);
		if($hash === $existingHash){ return true; }else{ return false; }
	}


	//register account
	function registeruser($d) {



        $this->result = $this->conn->query("SELECT * from tbl_faculty WHERE fa_empnumber='$d->eId'");
        if($this->result->num_rows>0){
            while($res = $this->result->fetch_assoc()){
                array_push($this->data,$res);
			}
            return $this->info = array('status'=>array('remarks'=>false, 'message'=>'Employee number already exists.'), 'timestamp'=>date_create(),'prepared_by'=>'Mark Ian Bernardo');
        }else{
			$pass = $this->encryptPassword($d->ePass);
			$this->conn->query("INSERT INTO tbl_faculty(fa_empnumber,fa_password) values('$d->eId','$pass')");
	   		return $this->info = array('status'=>array('remarks'=>true, 'message'=>'Registration success.'), 'timestamp'=>date_create(),'prepared_by'=>'Mark Ian');
		}
		


	}

	//login account
	function loginuser($d){
        $this->result = $this->conn->query("SELECT * from tbl_faculty WHERE fa_empnumber='$d->eId' LIMIT 1");

        if ($this->result->num_rows>0) {
            while($res = $this->result->fetch_assoc()){
                array_push($this->data,$res);
                $empNo = $res['fa_empnumber'];
				$existingHash = $res['fa_password'];
            }

            $pCheck = $this->pwordCheck($d->ePass,$existingHash);

            if ($pCheck) {
            	$token = $this->generateToken($empNo);
            	$this->conn->query("UPDATE tbl_faculty set fa_token='$token' where fa_empnumber=$empNo");
 				return $this->info = array(
					'status'=>array(
						'remarks'=>true,
						'message'=>'Login success.'
					),
					'payload'=>$token,
					'data' =>$this->data,
					'timestamp'=>date_create(),
					'prepared_by'=>'Mark Ian Bernardo'
				);
            } else {
            	return $this->info = array(
					'status'=>array('remarks'=>false,
					'message'=>'Invalid employee number or password.'),
					'timestamp'=>date_create(),
					'prepared_by'=>'Mark Ian Bernardo' );
			}
			
        } else {
			return $this->info = array('status'=>array(
					'remarks'=>false,
					'message'=>'Invalid employee number or password.'),
				'timestamp'=>date_create(),
				'prepared_by'=>'Mark Ian Bernardo' );
		}

	}

	function checkuser($d){


		$this->result = $this->conn->query("SELECT * from tbl_faculty WHERE fa_token='$d->token' LIMIT 1");

        if ($this->result->num_rows>0) {
			while($res = $this->result->fetch_assoc()) {
                array_push($this->data,$res);
            }
          
			return $this->info = array(
				'status'=>array(
					'remarks'=>true,
					'message'=>'User successfully verified.'
				),
				'payload'=>$d->token,
				'data' =>$this->data,
				'timestamp'=>date_create(),
				'prepared_by'=>'Mark Ian Bernardo'
			);

        } else {
			return $this->info = array('status'=>array(
					'remarks'=>false,
					'message'=>'Invalid session.'),
				'timestamp'=>date_create(),
				'prepared_by'=>'Mark Ian Bernardo' );
		}
	}


}

?>