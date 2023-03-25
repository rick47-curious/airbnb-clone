//Toggle email and phone based login
document.getElementById("EmailLogin").addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById("EmailLogin").style.display = "none";
    document.getElementById("PhoneLogin").style.display = "block";

    document.querySelectorAll("#loginSignupForm > .form-floating")[2].style.display = "block";
    document.querySelectorAll("#loginSignupForm > .form-floating")[1].style.display = "none";
    document.querySelectorAll("#loginSignupForm > .form-floating")[0].style.display = "none";
    
    
});

document.getElementById("PhoneLogin").addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById("EmailLogin").style.display = "block";
    document.getElementById("PhoneLogin").style.display = "none";

    document.querySelectorAll("#loginSignupForm .form-floating")[2].style.display = "none";
    document.querySelectorAll("#loginSignupForm .form-floating")[1].style.display = "block";
    document.querySelectorAll("#loginSignupForm .form-floating")[0].style.display = "block";
    
   
});

document.querySelector(".header-navigation .back-btn").addEventListener('click',()=>{
    history.back();
})