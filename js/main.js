/**
 * Created by Shubham on 10/7/2015.
 */

$(document).ready(function () {

    // send request for new notifications after random intervals
//    var ran = Math.floor((Math.random() * 1500) + 20000);
//    var t = setTimeout(getNotifications,25000);

    $(".icon-bell,.noti-number").click(function () {
        if($(".noti-dropdown").css('display') == "none") {
            $(".noti-dropdown").show()
                .animate({top:'200%',opacity:1},800);
        }
        else {
            $(".noti-dropdown").hide()
                .css({"top":"250%","opacity":"0.1"});
            $(".noti-number, .noti-title-number").hide();
        }
    });

    (function getNotifications() {
        $.ajax({
            url: "",
            success: function (response) {
                $(".noti-number, .noti-title-number").show();

            }
        });
        setTimeout(getNotifications,Math.floor((Math.random() * 1500) + 5000));
    })();
});