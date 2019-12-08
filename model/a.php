<?php 

class Auth {
	private $header;
	private $payload;
	private $signature;

	private $conn;
	private $sql;
	private $result;
	private $data = array();
	private $info=[];
	
	private $status = array();
	private $failed_status = array('remarks'=>'failed', 'message'=>'No data found');
	private $success_status = array('remarks'=>'success', 'message'=>'Successfully pulled all requested data');

	public function __construct($db) {
		$this->conn = $db;
	}

	function generateToken() {
		$this->header = $this->generateHeader();
		$this->payload = $this->generatePayload();
		$this->signature = $this->generateSignature();
		return "$this->header.$this->payload.$this->signature";
	}


	function generateHeader() {
		$h = [
			'type' => 'jwt',
			'alg'  => 'HS256',
			'app'  => 'profily',
			'dev'  => 'BSIT3ly'
		];

		$h = json_encode($h);
		$h = str_replace(['+','/','-','='],['-','_','',], base64_encode($h));
		return $h;
	}

	function generatePayload(){
		$p = [
			'ito' => 'Jayveely Peralesly',
			'itb' => 'Marky Bernandoly',
			'idate' => date_create(),
			'ucode' => '201610499',
			'ue' => 'jayly@gmail.com'
		];

		$p = json_encode($p);
		$p = str_replace(['+','/','-','='],['-','_','',], base64_encode($p));
		return $p;
	}

	function generateSignature(){
		$s = hash_hmac('sha256', "$this->header. $this->payload", 'wwww.gordoncollege.edu.ph');
		$s = str_replace(['+','/','-','='],['-','_','',], base64_encode($s));
		return $s;

	}
}



 ?>