$(()=>{
    let path= '../img/'
    let image = ['avatar.jpg','baloon.webp','hacker.jpg','fudzi.jpg','qiji.webp','qiz.jpeg','maral.jpg','sauron.jpg']
    let x = 0
    $("#slider")
        .css({
            position: 'relative',
            overflow: 'hidden'
        })
        .append('<div id="slide"></div>')
        .append('<div id="thumbs"></div>')
        .append('<h2 id="counter"></h2>')
        .append('<div id="bar"></div>')
        .click(function(e){
            change( e.clientX > $(window).width() / 2 ? 1 : -1)
        })
    const slide = $("#slide")
    const counter = $("#counter")
    const bar = $("#bar")
    bar.append('<div id="barColor"></div>')
    const barColor = $("#barColor")
    let timer = setTimeout(change, 1, 0)
    slide
        .css({
            position: 'absolute',
            width: image.length * 100 + '%',
            height: '100%',
            display: 'flex'
        })
        
    const thumbs = $("#thumbs")
    thumbs
        .css({
            position: 'absolute',
            width: '100%',
            bottom: 0,
            textAlign: 'center'
        })
    
    image.forEach(item => thumbs.append(`<img src="${path}${item}" />`)) 
    image.forEach(item => slide.append(`<img src="${path}${item}" />`)) 

    slide.children()
        .css({
            width: $("#slider").width(),
            height: "100%",
            objectFit: 'cover'
        })

    counter
        .css({
            position: 'absolute',
            right: '30px',
            color: '#fff'
        })
    bar
        .css({
            position: 'absolute',
            backgroundColor: '#fff',
            textAlign: 'center',
            width: '100%',
            height: '20px'
        })
    
    barColor
        .css({
            position: 'absolute',
            width: '0%',
            height: '100%',
            backgroundColor: '#666',
        })
    thumbs.children()
        .css({
            width: "32px",
            height: "32px",
            borderRadius: '50%',
            border: '3px solid #fff',
            margin: '5px',
            cursor: 'pointer',
            zIndex: '99'
        })
        .click(function(e){
            e.stopPropagation()
            x = $(this).index()
            change(0)
        })

    function change(dir = 1) {
        barColor.stop()
        barColor.animate({width: 0 + '%'}, 1)
        clearTimeout(timer)
        x += dir
        if(x >= image.length) x = 0
        if(x < 0) x = image.length - 1
        show(dir >= 0 ? 1 : -1)
        barColor.animate({width: 100 + '%' }, 3000)
        timer = setTimeout(change, 3000)
    }

    function show() {
        slide.animate({ left: -100 * x + '%' }, 300)
        counter.html(`${x+1}/${image.length}`)
        thumbs.children().css({opacity: .5})
        thumbs.children().eq(x).css({opacity: 1})
    }
})