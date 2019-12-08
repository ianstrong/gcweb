<?php
 require '../config/connect.php';
 
  $id = $_GET['studentnumber'];
  $block = $_GET['section'];

  $sql = "SELECT * FROM tbl_enlistment WHERE en_isactive='ACTIVE'";
  $query = mysqli_query($conn,$sql);
  if(mysqli_num_rows($query)>0){
    while($res = mysqli_fetch_assoc($query)){
      $es_sem = $res['en_sem'];
      $start = $res['en_cystart'];
      $end = $res['en_cyend'];
    }

    $es_start = explode("-",$start);
    $es_end = explode("-",$end);
  }






  $classes = $_GET['classes'];

  $d = json_decode($classes);



$sqlcheckenrolled = "SELECT * FROM tbl_enrolledsubjects where es_idnumber='$id'";
$querycheckenrolled = mysqli_query($conn,$sqlcheckenrolled);
if(mysqli_num_rows($querycheckenrolled)==0){ 
  foreach($d as $key => $class){

      $sql_checker = "SELECT * FROM tbl_enrolledsubjects WHERE es_idnumber='$id' and es_clcode='$class->cl_code'";
      $query = mysqli_query($conn,$sql_checker);

      if(mysqli_num_rows($query)==0){ 

          $sql = "INSERT INTO tbl_enrolledsubjects(es_idnumber,es_sucode,es_clcode,es_sem,es_acadyear) values('$id','$class->cl_sucode','$class->cl_code','$es_sem','$es_start[0]-$es_end[0]')";
          mysqli_query($conn,$sql);

      }
  }
} else  {
  $sqldeleteenrolled = "DELETE FROM tbl_enrolledsubjects WHERE es_idnumber='$id'";
  if(mysqli_query($conn,$sqldeleteenrolled)){ 
      foreach($d as $key => $class){

          $sql_checker = "SELECT * FROM tbl_enrolledsubjects WHERE es_idnumber='$id' and es_clcode='$class->cl_code'";
          $query = mysqli_query($conn,$sql_checker);

          if(mysqli_num_rows($query)==0){ 

              $sql = "INSERT INTO tbl_enrolledsubjects(es_idnumber,es_sucode,es_clcode,es_sem,es_acadyear) values('$id','$class->cl_sucode','$class->cl_code','$es_sem','$es_start[0]-$es_end[0]')";
              mysqli_query($conn,$sql);

          }
      }
  } else {
    echo $conn->error;
  }
}


  $x = 0;
  $sched = [];

   $sql2 = "UPDATE tbl_studentinfo set si_block = '$block' where si_idnumber='$id'";
  mysqli_query($conn,$sql2);
 
 $sql = "SELECT * FROM tbl_studentinfo WHERE si_idnumber = '$id'";
 $query = mysqli_query($conn,$sql);
 if(mysqli_num_rows($query)>0){
  while($res = mysqli_fetch_assoc($query)){
    $govprogs = $res['si_govproj'];
    $govprog = explode(", ", $govprogs);
    $lastname = $res['si_lastname'];
    $firstname = $res['si_firstname'];
    $extname = $res['si_extname'];
    $midname = $res['si_midname'];
    $email = $res['si_email'];
    $address = $res['si_address'];
    $zipcode = $res['si_zipcode'];
    $mobile = $res['si_mobile'];
    $gender = $res['si_gender'];
    $bday = $res['si_bday'];
    $course = $res['si_course'];
    $course2 = $res['si_coursechoice'];
    $course3 = $res['si_coursechoice2'];
    $year = $res['si_yrlevel'];
    $address = $res['si_address'];
    $department = $res['si_department'];
    
	$lastchool = $res['si_lastschool'];
	if($res['si_junior']!=""){
    	$lastchool = $res['si_junior'];
    }
    if($res['si_senior']!=""){
    	 $lastchool = $res['si_senior'];
    }
    
    $lrn = $res['si_lrn'];
    $guardianrel = $res['si_guardrel'];
    $guardadd = $res['si_guardadd'];
    $emergency = $res['si_emergencycontact'];
    $govprojother = $res['si_govprojothers'];
    $famincome = $res['si_famincome'];
    $isdisabled = $res['si_isdisabled'];
    $disability = $res['si_disability'];
    $guardname = $res['si_guardname'];
    $household = $res['si_householdno'];
  
  }
}


?>


<html> 
  <head> 
    <link rel="stylesheet" type="text/css" href="evaluationform/style.css">  
    <title>Evaluation Form</title>
    <style>
      body {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
      }

      main {
        flex: 1 0 auto;
      }

      body {
      background:#ffffff;  
          color:#000000;
      } 
      td{
        font-size: 12px;
      }

      @media print{
  html, body{
    height: 100%;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
  }
}
    </style>
    
<script src="../js/jquery.min.js"></script>




  </head>
  <body>
	 <table width="200" border="0" style="text-align:center" class="txt"> 
    <tbody>
      <tr>
        <td class="header-td left">Form 001 (rev. 062019)</td>
        <td class="header-td center"><strong>GORDON COLLEGE</strong></td>
        <td class="header-td right">Academic Year: <?php  echo $es_start[0]."-".$es_end[0]; ?></td>
      </tr>
      <tr>
        <td class="header-td left"><strong>EVALUATION FORM</strong></td>
        <td class="header-td center">
        <?php switch($department){
          case 'CCS': echo "College of Computer Studies";
                      break;
          case 'CBA': echo "College of Business and Accountancy";
                      break;
          case 'CEAS': echo "College of Education, Arts and Sciences";
                      break;
          case 'CAHS': echo "College of Allied Health Studies";
                      break;
          case 'CHTM': echo "College of Hospitality and Tourism Management";
                      break;
          default: echo "";
        }
        ?></td>
        <td class="header-td right">Semester 
            <strong>

            <?php 

              if($es_sem == '1'){
                echo "1st";
              }elseif($es_sem == '2'){
                echo "2nd";
              }elseif($es_sem == 'Mid Year'){
                echo $es_sem;
              }

            ?>
        
            </strong></td>
      </tr>
    </tbody>
  </table>

  <p class="txt"><i>Please fill out completely, processing may be on incomplete entries.</i></p>

    
  <table class="txt table-body" border="1">
    <tbody>
      <tr class="border-thin">
        <td class="border-thin" colspan="8">
          
          <input type="checkbox" id="newstudent">
          <label for="newstudent">New Student</label>

          <input type="checkbox" id="oldstudent">
          <label for="oldstudent">Old Student</label>
          
          <input type="checkbox" id="secondcourser">
          <label for="secondcourser">Second Courser</label>
          
          <input type="checkbox" id="transferee">
          <label for="transferee">Transferee</label>
          
          <input type="checkbox" id="returnee">
          <label for="returnee">Returnee</label>
          
        </td>
      </tr>
      <tr class="border-thin">
        <td class="border-thin darken" width="120">Student ID:</td>
        <td class="border-thin " colspan="3">
        	<?php 
        		if(strlen($id)==9){
        			echo $id;
        		} else{
        			echo "";
        		}
        	?>
        </td>
        <td class="border-thin darken" width="124">Year Level</td>
        <td class="border-thin" width="109"><?php 

        switch($year){
          case 1:
            echo "1st Year";
            break;
          case 2:
            echo "2nd Year";
            break;
          case 3:
            echo "3rd Year";
            break;
          case 4:
            echo "4th Year";
            break;
          default:
            echo "Error";
        }

        ?></td>
        <td class="border-thin darken" width="59">Section:</td>
        <td class="border-thin" width="65"><?php echo $block ?></td>
      </tr>
      <tr class="border-thin">
        <td class="border-thin darken">Last Name:</td>
        <td class="border-thin" colspan="3"><?php echo $lastname?></td>
        <td class="border-thin darken" rowspan="2">Program</td>
        <td class="border-thin" colspan="3" rowspan="2"><?php echo $course?></td>
      </tr>
      <tr class="border-thin">
        <td class="border-thin darken">First Name</td>
        <td class="border-thin" colspan="3"><?php echo $firstname?></td>
      </tr>
      <tr class="border-thin">
        <td class="border-thin darken">Middle Name</td>
        <td class="border-thin" width="283"><?php echo $midname?></td>
        <td class="border-thin" width="76">Name Ext:</td>
        <td class="border-thin" width="47"><?php echo $extname?></td>
        <td class="border-thin darken">Sex at Birth:</td>
        <td class="border-thin" colspan="3">

          <input type="checkbox" name="gender" id="Male">
          <label for="male">Male</label>
          <input type="checkbox" name="gender" id="Female">
          <label for="female">Female</label>
        </td>
        <script>
            $( document ).ready(function(){
              $("#<?php echo $gender;?>").prop('checked', true);
            });
          </script>
      </tr>
      <tr class="border-thin">
        <td class="border-thin darken">Address:</td>
        <td class="border-thin" colspan="5"><?php echo $address?></td>
        <td class="border-thin darken" >Zip Code:</td>
        <td class="border-thin"><?php echo $zipcode?></td>
      </tr>
      <tr class="border-thin">
        <td class="border-thin darken">Email Address:</td>
        <td class="border-thin" colspan="3"><?php echo $email?></td>
        <td class="border-thin darken">Contact No.:</td>
        <td class="border-thin"><?php echo $mobile?></td>
        <td class="border-thin">&nbsp;</td>
        <td class="border-thin">&nbsp;</td>
      </tr>
    </tbody>
  </table>
  
  <table class="txt table-body"  width="935" border="1">
  <tbody>
    <tr  class="border-thin">
      <td class="border-thin darken" width="347">Secondary School / Senior High School:</td>
      <td class="border-thin" width="572" colspan="6"><?php echo $lastchool?></td>
    </tr>
    <tr  class="border-thin">
      <td class="border-thin darken">Learner's Reference Number - LRN (if applicable)</td>
      <td class="border-thin" colspan="6"><?php echo $lrn?></td>
    </tr>
  </tbody>
</table>


 <table class="txt table-body" border="1">
  <tbody>
    <tr  class="border-thin">
      <td class="border-thin center darken" width="214">Name of Guardian:</td>
      <td class="border-thin" width="200"><?php echo $guardname?></td>
      <td class="border-thin darken" width="111">Relationship:</td>
      <td class="border-thin " width="273" colspan="4"><?php echo $guardianrel;?></td>
    </tr>
    <tr class="border-thin">
      <td class="border-thin center darken">Address:</td>
      <td class="border-thin"><?php echo $guardadd;?></td>
      <td class="border-thin darken">Contact No.</td>
      <td class="border-thin" colspan="4"><?php echo $emergency;?></td>
    </tr>
  </tbody>
</table>

  <table class="txt table-body" border="1">
    <tbody>
      <tr class="border-thin">
        <td class="border-thin" colspan="2">Are you or your family a member of / belong to any of the following?</td>
      </tr>
      <tr>
        <td class="border-thin darken" width="39">&nbsp;</td>
        <td class="border-thin" width="700">
          
          <input type="checkbox" id="4ps">
          <label for="c1" class="m-top">Pantawid Pamilyang Pilipino (4P's)</label>
          <br>
          <input type="checkbox" id="listahan">
          <label for="c2" class="m-top">Listahan 2.0 (DSWD Household No. <?php if($household==''){echo '<u>_________</u>';}else{echo '<u>'.$household.'</u>';}?> )</label>
          <br>
          <input type="checkbox" id="esgppa">
          <label for="c3" class="m-top">ESGPPA Beneficiary</label>
          <br>
          <input type="checkbox" id="ips">
          <label for="c4" class="m-top">Indigenous People (IP's)</label>
          <br>
          <input type="checkbox" id="noincome">
          <label for="c5" class="m-top">No Income Household</label>
          <br>
          <input type="checkbox" id="solo">
          <label for="c6" class="m-top">Solo parent / Child of a Solo Parent</label>
          <br>

          <label for "other-cc">Others: Please Specify</label>
          <input type="textbox" id="other-cc" style="width: 500px;" value='<?php echo $govprojother;?>' class="txt-box">

            <?php while($x<sizeof($govprog)){ ?>
            <script>  
            $( document ).ready(function(){
              $("#<?php echo $govprog[$x];?>").prop('checked', true);
            });
            </script>
            <?php $x++; } ?>

        </td>
      </tr>
    </tbody>
  </table>


  <table class="txt table-body" border="1">
  <tbody>
    <tr class="border-thin">
      <td class="border-thin darken" width="450">Net Monthly Family Income (Total Monthly Income Less Expenses)</td>
      <td  class="border-thin"><?php echo $famincome;?></td>
    </tr>
  </tbody>
</table>


  <table class="txt table-body" border="1">
  <tbody>
    <tr class="border-thin">
      <td class="border-thin"width="480">Are you a Person With Disability (PWD) 

          <input type="checkbox" id="1">
          <label for "yes">Yes</label>
          <input type="checkbox" id="0">
          <label for "no">No</label>
          <script>  
            $( document ).ready(function(){
              $("#<?php echo $isdisabled;?>").prop('checked', true);
            });
            </script>
      </td>
      <td class="border-thin darken"width="266">Type of disability (if applicable):</td>
      <td class="border-thin"width="355"><?php echo $disability;?></td>
    </tr>
  </tbody>
</table>
  


  <p class="txt" style="margin-top: 0px;margin-bottom: -1px;"><i>To be filled out by the evaluator:</i></p>

  <table class="txt table-body" border="1">
  <tbody>
    <tr class="border-thin">
      <td class="border-thin" width="139" rowspan="3">Scholarship Program:</td>
      <td class="border-thin" width="500">
        <input type="checkbox" name="eligible">
        <label for "eligible">Eligible for FREE HIGHER EDUCATION (FHE)</label>
     </td>
      <td class="border-thin" width="538">
        <input type="checkbox" name="paying">
        <label for "paying">PAYING (Opted Out of FHE)</label>
        </td>
    </tr>
    <tr>
      <td class="border-thin">
        <input type="checkbox" name="payingnot">
        <label for "payingnot">PAYING (Not Eligible for FHE)</label>
      </td>
      <td class="border-thin" rowspan="2"><p>I am aware of the benefits and responsibilities of RA 10931.</p>
      <p>However, I voluntarily opt out my tuition and other school fees to Gordon College.</p>
        <div class="center" style="margin-top: -5px;">
          <input type="textbox" class="txt-box" name="">
          <p style="margin-top: -3px;">Student's Signature and Date</p>
        </div>

      </td>
    </tr>
    <tr>
      <td class="border-thin" height="69" style="text-align: left"><p>Others:</p>
      <p>&nbsp;</p></td>
    </tr>
  </tbody>
</table>
<br>

  <table class="txt table-body tbl-subjects n-top2" border="1" style="margin-top: -10px;">
  <tbody>
    <tr class="border-thin">
      <td class="border-thin tbl-subjects" width="43" style="text-align: center">#</td>
      <td class="border-thin tbl-subjects darken" width="197">Class Code</td>
      <td class="border-thin tbl-subjects darken" width="99">Course Code</td>
      <td class="border-thin tbl-subjects darken" width="99" style="text-align: center">
        <p>Lec</p>
        <p class="m-top1 tbl-subjects"style="text-align: center">Units</p>
      </td>
      <td class="border-thin darken tbl-subjects" width="99" style="text-align: center">
        <p>Lab</p>
        <p class="m-top1">Units</p>
      </td>
      <td class="border-thin darken tbl-subjects" width="99" style="text-align: center">
        <p>RLE</p>
        <p class="m-top1">Units</p>
      </td>
      <td class="border-thin darken tbl-subjects" width="99" style="text-align: center">Day</td>
      <td class="border-thin darken tbl-subjects" width="99" style="text-align: center">Start Time</td>
      <td class="border-thin darken tbl-subjects" width="99" style="text-align: center">End Time</td>
      <td class="border-thin darken tbl-subjects" width="105" style="text-align: center">Room</td>
    </tr>
  </tbody>
  <tbody id="schedule_data">
    <?php 
      $i = 0;
      $leccount = 0;
      $labcount = 0;
      $totalunits = 0;
      $rlecount = 0;
      $sql = "SELECT * FROM tbl_enrolledsubjects as es JOIN tbl_classes as cl on es.es_clcode = cl.cl_code WHERE es.es_idnumber='$id' and es.es_acadyear='$es_start[0]-$es_end[0]' GROUP BY cl.cl_code";
      $query = mysqli_query($conn,$sql);
      if(mysqli_num_rows($query)>0){
        while($res = mysqli_fetch_assoc($query)){
          echo "<tr class='border-thin'>";
          echo "<td class='border-thin' style='text-align: center'>".($i+1)."</td>";
          echo "<td class='border-thin' style='text-align: center'>".$res['es_clcode']."</td>";
          echo "<td class='border-thin' style='text-align: center'>".$res['es_sucode']."</td>"; 
          echo "<td class='border-thin' style='text-align: center'>".$res['cl_lecunit']."</td>";
          echo "<td class='border-thin' style='text-align: center'>".$res['cl_labunit']."</td>"; 
          echo "<td class='border-thin' style='text-align: center'>".$res['cl_rleunit']."</td>";
          echo "<td class='border-thin' style='text-align: center'>".$res['cl_day']."</td>";
          echo "<td class='border-thin' style='text-align: center'>".$res['cl_stime']."</td>"; 
          echo "<td class='border-thin' style='text-align: center'>".$res['cl_etime']."</td>";
          echo "<td class='border-thin' style='text-align: center'>".$res['cl_room']."</td>";
          echo "</tr>";
          $leccount = $leccount +(int)$res['cl_lecunit'];
          $labcount = $labcount +(int)$res['cl_labunit'];
          $rlecount = $rlecount +(int)$res['cl_rleunit'];
          $totalunits = $labcount + $leccount + $rlecount;
          $i++;
        }

        while($i<15){
          echo "<tr class='border-thin'>";
          echo "<td class='border-thin' style='text-align: center'>".($i+1)."</td>";
          echo "<td class='border-thin' style='text-align: center'></td>";
          echo "<td class='border-thin' style='text-align: center'></td>"; 
          echo "<td class='border-thin' style='text-align: center'></td>";
          echo "<td class='border-thin' style='text-align: center'></td>"; 
          echo "<td class='border-thin' style='text-align: center'></td>";
          echo "<td class='border-thin' style='text-align: center'></td>";
          echo "<td class='border-thin' style='text-align: center'></td>"; 
          echo "<td class='border-thin' style='text-align: center'></td>";
          echo "<td class='border-thin' style='text-align: center'></td>";
          echo "</tr>";
          $i++;
        }


          echo "<tr class='border-thin'>";
          echo "<td class='border-thin nodisplay' style='text-align: center'></td>"; 
          echo "<td class='border-thin nodisplay' style='text-align: center'></td>"; 
          echo "<td class='right darken'><strong>Total: </strong></td>";
          echo "<td class='center'>$leccount</td>"; 
          echo "<td class='center'>$labcount</td>"; 
          echo "<td colspan='2' class='border-thin right darken'><strong>Total # of Units:</strong>&nbsp;</td>";
          echo "<td colspan='2'  class='border-thin' style='text-align: center'><strong>$totalunits</strong></td>"; 
          echo "<td></td>";
          echo "</tr>";

      }

    ?>
  </tbody>


   
  </tbody>
</table>

<script>
$( document ).ready(function(){
  window.print();
  window.onafterprint = function(){
   window.close();
}
  });
</script>

<br> <br>

<table width="100%" border="0" style="margin-bottom:0px;">
  <tbody>
    <tr>
      <td style="text-align: center"><input class="txt-box" type="textbox"  style="width: 100%"></td>
      <td style="text-align: center"><input class="txt-box"  type="textbox" style="width: 100%"></td>
      <td style="text-align: center"><input class="txt-box"  type="textbox" style="width: 100%"></td>
    </tr>
    <tr>
      <td style="text-align: center">Student's Signature and Date</td>
      <td style="text-align: center">Evaluator's Signature and Date</td>
      <td style="text-align: center">Encoder's Signature and Date</td>
    </tr>
  </tbody>
</table>

  </body>
</html> 