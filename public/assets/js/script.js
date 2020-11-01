$('.create-workout').on("click", function (){
    console.log("Addworkout");
    const input = $('.create-workout-input').val().trim()
    const data = {
        name:input
    }
    $.ajax({
        url:"/createworkout",
        type:"POST",
        data:data,
        success: function(data) {
            console.log(`successfully sent ${data}`)
        }
    })
})
$('.create-drill').on("click", function (){
    const workoutId = $(this).attr('data-workoutid')
    $('.save-drill').removeAttr('data-drillId') 
    $('.save-drill').attr('data-workoutId', workoutId)
    $('#name').val("")
    $('#type').val("")
    $('#location').val("")
    $('#duration').val("")
    $('#weight').val("")
    $('#sets').val("")
    $('#reps').val("")
    $('#distance').val("")
    $('.modal').modal('open');
})

$('.edit-drill').on("click", function (){
    const drillId = $(this).attr('data-drillid')
    $.ajax({
        url:`/api/drills/${drillId}`,
        type:"GET",
        success: function(data) {
            $('#name').val(data.name)
            $('#type').val(data.type)
            $('#location').val(data.location)
            $('#duration').val(data.duration)
            $('#weight').val(data.weight)
            $('#sets').val(data.sets)
            $('#reps').val(data.reps)
            $('#distance').val(data.distance)
            console.log(data)
        }
    })
    $('.save-drill').removeAttr('data-workoutId') 
    $('.save-drill').attr('data-drillId', drillId)

    $('.modal').modal('open');
})
$('.save-drill').on("click", function (){
    const drill = {
        name: $('#name').val(),
        type: $('#type').val(),
        location: $('#location').val(),
        duration: $('#duration').val(),
        weight: $('#weight').val(),
        sets: $('#sets').val(),
        reps: $('#reps').val(),
        distance: $('#distance').val()
    }
    console.log(drill)
    
    if($(this).attr('data-drillId')){
        drill.drillid = $(this).attr('data-drillId')
        console.log("updating", $(this).attr('data-drillId'))
    }else{
        drill.workoutid =  $(this).attr('data-workoutId')
        console.log("creating drill for ", $(this).attr('data-workoutId'))
    }
    
})

$(document).ready(function(){
    $('.modal').modal();
  });

window.addEventListener('load', function(){
    const sliders = document.querySelectorAll('.glider') 
    const options = {
        // Mobile-first defaults
        slidesToShow: 1,
        slidesToScroll: 1,
        scrollLock: true,
        dots: '#resp-dots',
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        },
        responsive: [
            {
                // screens greater than >= 775px
                breakpoint: 500,
                settings: {
                    // Set to `auto` and provide item width to adjust to viewport
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    itemWidth: 150,
                    duration: 0.25,
                    dots: '.dots',
                }
            },
            {
            // screens greater than >= 775px
            breakpoint: 775,
            settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 3,
                slidesToScroll: 1,
                itemWidth: 150,
                duration: 0.25,
                dots: '.dots',
            }
            },{
            // screens greater than >= 1024px
            breakpoint: 1025,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                itemWidth: 150,
                duration: 0.25,
                dots: '.dots',
            }
            }
        ]
    };
    
    sliders.forEach(item => {
        console.log(item)
        const glider = new Glider(item, options)
    })
})