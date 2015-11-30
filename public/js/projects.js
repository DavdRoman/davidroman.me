$(function() {
    var indicators = ['star', 'fork']

    indicators.forEach(function(indicator) {
        var spans = $('.' + indicator + ' span')

        for (var i = 0; i < spans.length; i++) {
            var span = spans.eq(i)
            span.text(0)

            span.one('inview', function(event) {
                setTimeout(function() {
                    var numAnim = new CountUp(event.currentTarget, 0, event.currentTarget.getAttribute('count'))
                    numAnim.duration = 2500
                    numAnim.start()
                }, 325);
            })
        }
    })
})
