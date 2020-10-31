$('.add-exercise').on("click", function (){
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