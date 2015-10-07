/**
 * Created by Shubham on 10/7/2015.
 */

$(document).ready(function () {
    $(".icon-bell,.noti-number").click(function () {
        if($(".noti-dropdown").css('display') == "none") {
            $(".noti-dropdown")
                .show()
                .animate({top:'200%',opacity:1},800);
        }
        else {
            $(".noti-dropdown")
                .animate({"top":"250%","opacity":"0.1"},800)
                .hide();
        }
    });
});