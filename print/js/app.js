$(()=> {

    $('#filter_form').on('submit', ()=> {
        let formdata = $("#filter_form").serialize(),
        reg_id = $("#reg_id").val(),
        block_sem = $("#block_sem");

        if( reg_id == '' || reg_id == '19') {
            console.log('Please complete the registration number');
            // Gamit ka sweet alert dito tapos yan yung msg
        }

        else if (block_sem.val() == null) {
          // Gamit ka sweet alert dito tapos yan yung msg
        }

        else {
            // do ajax here

            console.log(formdata);
            
        }

        return false;
    });
});
