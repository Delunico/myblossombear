function toggleNav() {
    var e = document.getElementById("myTopnav");
    e.classList.contains("responsive")
        ? e.classList.remove("responsive")
        : (e.className += " responsive");
}
window.addEventListener("DOMContentLoaded", (e) => {
    var o = !1;
    $(".container").on("scroll", function () {
        1e3 <= document.getElementsByClassName("container")[0].scrollTop &&
            !o &&
            ((o = !0), $("#myTopnav").addClass("scroll-nav")),
            document.getElementsByClassName("container")[0].scrollTop < 1e3 &&
            o &&
            ((o = !1), console.log("ey"), $("#myTopnav").removeClass("scroll-nav"));
    })
    var t = $("#plug").detach(),
        n = document.getElementById("myTopnav"),
        a = document.getElementsByClassName("scroll");
    for (i = 0; i < a.length; i++) {
        var l = a[i];
        l.classList.contains("cta") &&
            $("#logo").on("click", function () {
                document
                    .querySelector(".landing")
                    .scrollIntoView({ behavior: "smooth" });
            }),
            l.addEventListener("click", function (e) {
                document
                    .querySelector("." + e.target.id)
                    .scrollIntoView({ behavior: "smooth" }),
                    n.classList.remove("responsive");
            });
    }
}),
    $(function () { });
