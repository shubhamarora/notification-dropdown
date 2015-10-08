/**
 * Created by Shubham on 10/7/2015.
 */

$(document).ready(function () {

    $('html').on('click', function (event) {
        if(!($(event.target).hasClass('icon-bell') || $(event.target).hasClass('noti-number') || $(event.target).is('.noti-dropdown >li:first'))) {
            $(".noti-dropdown").hide()
                .css({"top":"300%","opacity":"0.1"});;
        }
    });

    $(".icon-bell,.noti-number").click(function () {
        if($(".noti-dropdown").css('display') == "none") {
            $(".noti-dropdown").show()
                .animate({top:'250%',opacity:1},800);
            $(".noti-number, .noti-title-number").hide();
        }
        else {
            $(".noti-dropdown").hide()
                .css({"top":"300%","opacity":"0.1"});
            $(".noti-number, .noti-title-number").hide();
        }
    });

    (function getNotifications() {
        $.ajax({
            url: "data.json",
            success: function (response) {

                if($(".noti-number").css('display') == 'none') {
                    $(".noti-dropdown > li").slice(1).remove();
                    $.each(response.data.items, function (i, item) {
                        var randomNum = Math.floor((Math.random() * 1000) + 1);
                        $(".noti-dropdown").append(
                                '<li>'+
                                '<a href=\"' + item.link + '\">'+
                                '<div class=\"noti-item-photo\"><span style=\"background:url(' + item.photo +')\"></span></div>'+
                                '<div class=\"noti-item-content\">'+ item.content + ' - ' + randomNum +'</div>'+
                                '</a>'+
                                '</li>');
                    });
                    $(".noti-number, .noti-title-number").empty().append(response.data.count).show();
                }
                else {
                    $.each(response.data.items, function (i, item) {
                        var randomNum = Math.floor((Math.random() * 1000) + 1);
                        $("ul.noti-dropdown > li:first").after(
                                '<li>'+
                                '<a href=\"' + item.link + '\">'+
                                '<div class=\"noti-item-photo\"><span style=\"background:url(' + item.photo +')\"></span></div>'+
                                '<div class=\"noti-item-content\">'+ item.content + ' - ' + randomNum +'</div>'+
                                '</a>'+
                                '</li>');
                    });
                    $(".noti-number, .noti-title-number").text(parseInt($(".noti-number").text()) + response.data.count);
                }
            }
        });

        // send request for new notifications after random intervals
        setTimeout(getNotifications,Math.floor((Math.random() * 1500) + 10000));
    })();
});