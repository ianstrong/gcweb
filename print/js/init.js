let inactivityTime = function() {
  let time;
  window.onload = resetTimer;
  // DOM Events
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;
//   document.onscroll = resetTimer;

  function idle() {

    $("#nav").removeClass("not_idle");
    $('#nav').addClass('idle');

    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
    // document.onscroll = resetTimer;
  }

  function resetTimer() {
    clearTimeout(time);
    $("#nav").removeClass("idle");
    $("#nav").addClass("not_idle");
    time = setTimeout(idle, 3000);
  }
};
/*call the function*/
inactivityTime();

// materializecss js init
M.AutoInit();

// cleave init
$("#reg_id_label").addClass("active");
var cleave = new Cleave("#reg_id", {
 /* numericOnly: true,
  // prefix: "",
  delimiter: "-",
 // blocks: [6]*/
});