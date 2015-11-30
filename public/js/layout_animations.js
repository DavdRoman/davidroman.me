$(function() {
    var views = $('section')

    for (var i = 0; i < views.length; i++) {
        var view = views.eq(i)

        view.addClass('normal')

        view.one('inview', function(event) {
            setTimeout(function() {
                $(event.currentTarget).removeClass('normal')
                $(event.currentTarget).addClass('anim')
            }, 300)
        })
    }
})
