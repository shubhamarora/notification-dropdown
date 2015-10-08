/**
 * Created by Shubham on 10/7/2015.
 */

$(document).ready(function () {

    $('html').on('click', function (event) {
        if(!($(event.target).hasClass('icon-bell') || $(event.target).hasClass('noti-number') || $(event.target).hasClass('noti-title'))) {
            $(".noti-dropdown").hide().css({top:"600%",opacity:0.1});
            $(".noti-title").hide().css({top:"354%","opacity":0.1});
            $(".noti-dropdown > li").removeClass("new");
            $(".noti-number, .noti-title-number").hide().text("0");
        }
    });

    $(".icon-bell,.noti-number").click(function () {
        if($(".noti-dropdown").css('display') == "none") {
            $(".noti-dropdown").show().animate({top:'546%',opacity:1},800);
            $(".noti-title").show().animate({top:"300%",opacity:1},800);
            $(".noti-number, .noti-title-number").hide().text("0");
        }
        else {
            $(".noti-dropdown").hide().css({top:"600%",opacity:0.1});
            $(".noti-title").hide().css({top:"354%","opacity":0.1});
            $(".noti-number, .noti-title-number").hide().text("0");
            $(".noti-dropdown > li").removeClass("new");
        }
    });

    (function getNotifications() {
        $.ajax({
            url: "data.json",
            success: function (response) {

                if (response.data.count > 0) {

                    // remove No new notification placeholder text
                    $(".placeholder").remove();

                    // Loop through all new notification
                    $.each(response.data.items, function (i, item) {

                        // used to append a random number in notification content
                        // to make sure new notification is pushed in the list
                        // for testing purpose, not to be used in production
                        var randomNum = Math.floor((Math.random() * 1000) + 1);

                        // add new notification in the drop - prepend in the list
                        $("ul.noti-dropdown").prepend(
                                '<li class=\"new\">' +
                                '<a href=\"' + item.link + '\">' +
                                '<div class=\"noti-item-photo\"><span style=\"background:url(' + item.photo + ')\"></span></div>' +
                                '<div class=\"noti-item-content\">' + item.content + ' - ' + randomNum + '</div>' +
                                '</a>' +
                                '</li>');

                        // animate(opacity) new added notification in the list
                        $(".noti-dropdown > li").animate({"opacity": "1"}, 2000);
                    });

                    // update new notification count
                    $(".noti-number, .noti-title-number").text(parseInt($(".noti-number").text()) + response.data.count).show();
                }
            }
        });

        // send request for new notifications after random intervals
        setTimeout(getNotifications,Math.floor((Math.random() * 1500) + 10000));
    })();
});