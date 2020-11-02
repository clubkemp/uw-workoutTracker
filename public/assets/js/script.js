// event listener create workout button 
$('.create-workout').on("click", function (){
    //grab the value out of the input field
    const input = $('.create-workout-input').val().trim()
    //build the response body object
    const data = {
        name:input
    }
    //send to express via ajax
    $.ajax({
        url:"/createworkout",
        type:"POST",
        data:data,
        success: function(data) {
            //reload the page to update
            window.location.href = "/"
        }
    })
})
//event lisener for deleting a workout
$('.delete-workout').on("click", function (){
    // grab the workoutId hidden in the data-workoutId attribute in html
    const workoutId = $(this).attr('data-workoutid')
    //send the workoutId to express route via ajx
    $.ajax({
        url:`/deleteworkout/${workoutId}`,
        type:"DELETE",
        success: function(data) {
            window.location.href = "/"
            console.log(data)
        }
    })
})

//event listener for creating exercises
$('.create-drill').on("click", function (){
    // grab the workout id, we need this to populate the association
    const workoutId = $(this).attr('data-workoutid')
    //set the save button up with the workoutId to pass to express
    $('.save-drill').attr('data-workoutId', workoutId)
    // If the user had opened an edit modal before, it would have the data in it from editing
    // these clear that data
    $('.save-drill').removeAttr('data-drillId') 
    $('#name').val("")
    $('#type').val("")
    $('#location').val("")
    $('#duration').val("")
    $('#description').val("")
    //Now we can open the modal for creating exercises    
    $('.modal').modal('open');

    // The actual creation gets fired from the .save-drill event listener
})

//listener forediting the excercise cards
$('.edit-drill').on("click", function (){
    // grab the drill id off the button, we'll pass this into express
    const drillId = $(this).attr('data-drillid')
    // use an ajax call to actaully get the card data from the database
    $.ajax({
        url:`/api/drills/${drillId}`,
        type:"GET",
        success: function(data) {
            // set the values in the modal to match whats in the DB
            $('#name').val(data.name)
            $('#type').val(data.type)
            $('#location').val(data.location)
            $('#duration').val(data.duration)
            $('#description').val(data.description)
            $('#tags').val(data.tags.join())
        }
    })
    //if the user had previously clicked on the create exercise button, the ids are wrong
    // fix that here 
    $('.save-drill').removeAttr('data-workoutId') 
    $('.save-drill').attr('data-drillId', drillId)
    // open the modal
    $('.modal').modal('open');
    // data is actually send via the save-drill button
})
// listener for sending exercise data to express
$('.save-drill').on("click", function (){
    // first build the drill object from the inputs in the modal
    const drill = {
        data:{
        name: $('#name').val(),
        type: $('#type').val(),
        location: $('#location').val(),
        duration: $('#duration').val(),
        description: $('#description').val(),
        tags:$('#tags').val().split(',')
        }
    }
    // if the user hit edit, the data attribute is drillID, so check for it
    if($(this).attr('data-drillId')){
        // save the drill id to reference the update
        drill.drillId = $(this).attr('data-drillId')
        // send the update data to express route
        $.ajax({
            url:"/updatedrill",
            type:"PUT",
            data:drill,
            success: function(data) {
                // reload the page to update content
                window.location.href = "/"
            }
        })
    }else{
        // if there wasn't a drillId attached to the save button, that means its a create drill
        // so assign it the an id from the workout so we can make an assocation in express
        drill.workoutId =  $(this).attr('data-workoutId')
        // send the data to express route
        $.ajax({
            url:"/createdrill",
            type:"POST",
            data:drill,
            success: function(data) {
            //    reload the page to update content
                window.location.href = "/"
            }
        })
    }
    
})
//listener for delete exercise
$('.delete-drill').on("click", function (){
    //grab the drillId off the button for search
    const drillId = $(this).attr('data-drillid')
 
    // send drillId as a request.param for use in express
    $.ajax({
        url:`/deletedrill/${drillId}`,
        type:"DELETE",
        success: function(data) {
            // reload the page for updates
            window.location.href = "/"
        }
    })
})
// initializes the modal
$(document).ready(function(){
    $('.modal').modal();  
  });