/**
 * @author Thang Tran on 5/16/2017.
 */
(function ( $ ) {
    "use strict";
    var lastIndexItem = 0;
    var images = [];
    var texts = [];
    var points = [];
    var currentItem = 0;
    var play;
    var config = {
        width: '940px',
        height: '428px',
        start: 1,
        speedEffect: 500,
        play: {
            active: false,
            interval: 4000
        }
    };

    var Load = function(parrent) {
        parrent.css({
            "position": "relative",
            "width": config.width,
            "height": config.height
        });
        images = parrent.find(".sutrix-slider-images li");
        texts = parrent.find(".sutrix-slider-bottom-text li");
        var totalItem = images.length;

        if(totalItem > 0) {
            lastIndexItem = totalItem - 1;

            $(images).hide();
            $(texts[0]).fadeIn();
            $(images[0]).fadeIn();
            renderPaging();
            points = parrent.find(".sutrix-slider-bottom-point li");
            $(points[0]).css({"background-color": "#FFAA00"});
            bindEvent();

            if(config.play.active) {
                play = setInterval(next, config.play.interval);
            }
        }
    };

    var renderPaging = function() {
        var item = "";
        for(var i = 1; i <= lastIndexItem + 1; i++) {
            item += '<li data-item="' + i + '"><span>' + i + '</span></li>'
        }
        $(".sutrix-slider-bottom-point").html('<ul>' + item + '</ul>');
    };

    var bindEvent = function() {
        $(".sutrix-slider-controls-right").click(next);
        $(".sutrix-slider-controls-left").click(prev);
        $('.sutrix-slider-bottom-point li').click(point);
    };

    var next = function() {
        goToItem(++currentItem);
    };

    var  prev = function() {
        goToItem(--currentItem);
    };

    var point = function () {
        var item = parseInt($(this).attr("data-item")) - 1;

        if(item != currentItem) {
            goToItem(item);
        }
    };

    var goToItem = function(nextItem) {
        currentItem = nextItem;
        if(nextItem > lastIndexItem) {
            currentItem = nextItem = 0;
        }
        else if (nextItem < 0) {
            currentItem = nextItem = lastIndexItem;
        }

        $(images).hide();
        $(texts).hide();
        $(points).css({"background-color": "#9A9893"});
        $(images[nextItem]).fadeIn();
        $(texts[nextItem]).fadeIn();
        $(points[nextItem]).css({"background-color": "#FFAA00"});

        resetPlay();
    };

    var resetPlay = function() {
        if(config.play.active) {
            clearInterval(play);
            play = setInterval(next, config.play.interval);
        }
    };

    $.fn.sutrixSlider = function(customConfig) {
        config = $.extend(config, customConfig);
        Load(this);
        return this;
    };
}( jQuery));