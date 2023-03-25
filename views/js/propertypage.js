//Calender logic
$(function() {
    function c() {
        p();
        var e = h();
        var r = 0;
        var u = false;
        l.empty();
        while (!u) {
            if (s[r] == e[0].weekday) {
                u = true
            } else {
                l.append('<div class="blank"></div>');
                r++
            }
        }
        for (var c = 0; c < 42 - r; c++) {
            if (c >= e.length) {
                l.append('<div class="blank"></div>')
            } else {
                var v = e[c].day;
                var m = g(new Date(t, n - 1, v)) ? '<div class="today">' : "<div>";
                l.append(m + "" + v + "</div>")
            }
        }
        var y = o[n - 1];
        a.css("background-color", y).find("h1").text(i[n - 1] + " " + t);
        f.find("div").css("color", y);
        l.find(".today").css("background-color", y);
        d()
    }

    function h() {
        var e = [];
        for (var r = 1; r < v(t, n) + 1; r++) {
            e.push({
                day: r,
                weekday: s[m(t, n, r)]
            })
        }
        return e
    }

    function p() {
        f.empty();
        for (var e = 0; e < 7; e++) {
            f.append("<div>" + s[e].substring(0, 3) + "</div>")
        }
    }

    function d() {
        var t;
        var n = $("#calendar").css("width", e + "px");
        n.find(t = "#calendar_weekdays, #calendar_content").css("width", e + "px").find("div").css({
            width: e / 7 + "px",
            height: e / 7 + "px",
            "line-height": e / 7 + "px"
        });
        n.find("#calendar_header").css({
            height: e * (1 / 5) + "px"
        }).find('i[class^="icon-chevron"]').css("line-height", e * (1 / 7) + "px")
    }

    function v(e, t) {
        return (new Date(e, t, 0)).getDate()
    }

    function m(e, t, n) {
        return (new Date(e, t - 1, n)).getDay()
    }

    function g(e) {
        return y(new Date) == y(e)
    }

    function y(e) {
        return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()
    }

    function b() {
        var e = new Date;
        t = e.getFullYear();
        n = e.getMonth() + 1
    }
    var e = 300;
    var t = 2013;
    var n = 9;
    var r = [];
    var i = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    var s = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var o = ["#16a085", "#1abc9c", "#c0392b", "#27ae60", "#FF6860", "#f39c12", "#f1c40f", "#e67e22", "#2ecc71", "#e74c3c", "#d35400", "#2c3e50"];
    var u = $("#calendar");
    var a = u.find("#calendar_header");
    var f = u.find("#calendar_weekdays");
    var l = u.find("#calendar_content");
    b();
    c();
    a.find('i[class^="icon-chevron"]').on("click", function() {
        var e = $(this);
        var r = function(e) {
            n = e == "next" ? n + 1 : n - 1;
            if (n < 1) {
                n = 12;
                t--
            } else if (n > 12) {
                n = 1;
                t++
            }
            c()
        };
        if (e.attr("class").indexOf("left") != -1) {
            r("previous")
        } else {
            r("next")
        }
    })
})


// Handling of the navbar scrolling and reservation area sticky mechanism
let mainNav = document.getElementById("main-nav");
let subNav = document.querySelector(".simple-nav");

let reservation_dialog = document.querySelector(".reservation-area");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 527 || document.documentElement.scrollTop > 527) {
    mainNav.style.display = "none";
    subNav.style.top = "0";
  } else {
    mainNav.style.display = "block";
    subNav.style.top = "-150px";
  }

  if (document.body.scrollTop > 2657 || document.documentElement.scrollTop > 2657){
    document.querySelector(".price-snap").style.display = "block";
  }else{
    document.querySelector(".price-snap").style.display = "none";
  }
}

//JS implementation for Dropdown area 
let elementDropdownButtonArea = document.querySelectorAll(".dropdown-menu .dropdown-item div .user-choice");
let adultCounter = 0;
let infantCounter = 0;
let petCounter = 0;
let userChoice = "";

document.querySelector(".dropdown-selection .drop-btn").addEventListener('click',()=>{
    document.querySelector(".dropdown-selection .drop-btn").innerHTML = "Add guests";
})

elementDropdownButtonArea.forEach((element, key) => {
    //Disable if nothing is set
    if (element.querySelector(".latest-count").innerHTML === "0") {
        element.querySelector(".dec-count").setAttribute("disabled", "disabled");
        element.querySelector(".dec-count").style.opacity = "0.5";
    }

    element.querySelector(".inc-count").addEventListener("click", (e) => {
        e.preventDefault();
        //To prevent dropdown close after single interaction
        e.stopPropagation();

        element.querySelector(".inc-count").style.border = "0.5px solid #8f8d8d";
        let spanDisplay = parseInt(element.querySelector(".latest-count").innerHTML);
        spanDisplay++;
        element.querySelector(".latest-count").innerHTML = spanDisplay;
        if (spanDisplay > 0) {
            element.querySelector(".dec-count").removeAttribute("disabled");
            element.querySelector(".dec-count").style.opacity = "1";
        }
        //For adults and childrens
        if (key == 0 || key == 1) {
            adultCounter++;
            if (userChoice === "") {
                userChoice = `${adultCounter} guest`;
            } else {

                let arrayString = userChoice.split(',');
                arrayString[0] = `${adultCounter} guests`;
                userChoice = arrayString.join();
            }
            //For infants    
        } else if (key == 2) {
            infantCounter++;
            if (userChoice === "" || userChoice == "Add guests") {
                userChoice = `1 guest, ${infantCounter} infant`;
            } else {
                let arrayString = userChoice.split(',');
                if (userChoice.includes("infants") || userChoice.includes("infant")) {
                    arrayString[1] = `${infantCounter} ${infantCounter > 1 ? "infants" : "infant"}`;
                    userChoice = arrayString.join();
                } else {
                    if (userChoice.includes("pet") || userChoice.includes("pets")) {
                        let temp = arrayString[1];
                        arrayString[1] = `${infantCounter} infant`;
                        arrayString[2] = temp;
                        userChoice = arrayString.join();
                    } else {
                        arrayString.push(`${infantCounter} infant`);
                        userChoice = arrayString.join();
                    }
                }
            }
            //For pets
        } else if (key == 3) {
            petCounter++;
            if (userChoice === "" || userChoice == "Add guests") {
                userChoice = `1 guest, ${petCounter} pet`;
            } else {
                let arrayString = userChoice.split(',');
                if ((userChoice.includes("pet") || userChoice.includes("pets")) && !(userChoice.includes("infant") || userChoice.includes("infants"))) {
                    arrayString[1] = `${petCounter} ${petCounter > 1 ? "pets" : "pet"}`;
                    userChoice = arrayString.join();
                } else if ((userChoice.includes("pet") || userChoice.includes("pets")) && (userChoice.includes("infant") || userChoice.includes("infants"))) {
                    arrayString[2] = `${petCounter} ${petCounter > 1 ? "pets" : "pet"}`;
                    userChoice = arrayString.join();
                } else {
                    arrayString.push(`${petCounter} pet`);
                    userChoice = arrayString.join();
                }
            }
        }
        document.querySelector(".dropdown-selection button").innerHTML = "";
        document.querySelector(".dropdown-selection button").innerHTML = userChoice;

    })

    element.querySelector(".dec-count").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        element.querySelector(".dec-count").style.border = "0.5px solid #8f8d8d";
        let spanDisplay = parseInt(element.querySelector(".latest-count").innerHTML);
        spanDisplay--;
        element.querySelector(".latest-count").innerHTML = spanDisplay;
        if (spanDisplay == 0) {
            element.querySelector(".dec-count").setAttribute("disabled", "disabled");
            element.querySelector(".dec-count").style.opacity = "0.5";
        }
        //Adult and Children
        if (key == 0 || key == 1) {
            adultCounter--;
            let arrayString = userChoice.split(',');
            if (adultCounter > 1) {
                arrayString[0] = `${adultCounter} guests`
                userChoice = arrayString.join()
            } else if (adultCounter == 1) {
                arrayString[0] = `${adultCounter} guest`
                userChoice = arrayString.join()
            } else {
                arrayString[0] = "";
                let temp = arrayString.join();
                userChoice = temp.substring(temp.indexOf(',') + 1);
            }
            //Infant
        } else if (key == 2) {
            infantCounter--;
            let arrayString = userChoice.split(',');
            if (infantCounter > 1) {
                arrayString[1] = `${infantCounter} infants`
                userChoice = arrayString.join()
            } else if (infantCounter == 1) {
                arrayString[1] = `${infantCounter} infant`
                userChoice = arrayString.join()
            } else {
                arrayString[1] = arrayString[2] != null ? arrayString[2] : "";
                arrayString.pop();
                userChoice = arrayString.join()
            }
            //Pets
        } else if (key == 3) {
            petCounter--;
            let arrayString = userChoice.split(',');
            if (petCounter > 1) {
                arrayString[2] = `${petCounter} pets`
                userChoice = arrayString.join()
            } else if (petCounter == 1) {
                arrayString[2] = `${petCounter} pet`
                userChoice = arrayString.join()
            } else {
                if (arrayString[2] == null) {
                    arrayString[1] = "";
                    arrayString.pop();
                } else if (arrayString[2] != null) {
                    arrayString[2] = "";
                    arrayString.pop();
                }
                userChoice = arrayString.join();

            }
        }

        if (adultCounter == 0 && infantCounter == 0 && petCounter == 0) {
            userChoice = "Add guests";
        }
        document.querySelector(".dropdown-selection button").innerHTML = "";
        document.querySelector(".dropdown-selection button").innerHTML = userChoice;
    })
});

let tempJson = {};

document.getElementById("checkinDate").addEventListener('change',()=>{
    reusablePriceCheck(tempJson);
    localStorage.setItem('key',JSON.stringify(tempJson));
})

document.getElementById("checkoutDate").addEventListener('change',()=>{
    reusablePriceCheck(tempJson);
    localStorage.setItem('key',JSON.stringify(tempJson));
})
//Navigate to Bookings page
document.querySelector(".reservation-area .rsvsub-btn").addEventListener('click',()=>{
        let modifiedURL = location.href.split('?')[0].replace('rooms','book');
        let json = JSON.parse(localStorage.getItem('key'));
        let params;
        if (json == undefined){
            let params = location.href.split('?')[1];
            location.href = modifiedURL +"?"+params;
            
        }else{
           let params = `checkin=${json['checkin']}&checkout=${json['checkout']}&guests=${json['guests']}`;
           location.href = modifiedURL +"?"+params;
           localStorage.clear();
        }   
})

function reusablePriceCheck(tempJson){
    tempJson['checkin'] = document.getElementById('checkinDate').value;
    tempJson['checkout'] = document.getElementById('checkoutDate').value;
    tempJson['guests'] = document.querySelector(".dropdown-selection button").innerHTML;
    const date1 = new Date(tempJson['checkin']);
    const date2 = new Date(tempJson['checkout']);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    document.getElementById("diffDate").innerHTML = diffDays;
    document.getElementById("priceSection").innerHTML =`$ ${parseInt(document.getElementById("originalRate").innerHTML) * parseInt(document.getElementById("diffDate").innerHTML)}`;
}