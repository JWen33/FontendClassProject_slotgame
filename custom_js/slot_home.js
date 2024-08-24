window.onload = function() {
// 登入頁面
var logInBtn = document.querySelector(".login");
var unameInput = document.getElementById("uname");
var pswInput = document.getElementById("psw");


logInBtn.addEventListener("click", logInCheck, false);

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        logInCheck();
    };
});


function logInCheck() {
    var username = unameInput.value;
    var password = pswInput.value;

    if (username === "" || password === "") {
        alert("請輸入帳號與密碼");
    } else {
        sessionStorage.setItem("username", username);
        window.location.replace("./slot_game.html");
    };
};

};

function showSignupModal() {
    document.getElementById('signup_modal').style.display = 'block';
}

function hideSignupModal() {
    document.getElementById('signup_modal').style.display = 'none';
}

// 確保使用者已填妥註冊資料才能送出
function validateform() {
    let psw = document.getElementById("pswsingup").value;
    let pswrepeat = document.getElementById("psw_repeat").value;

    if (psw != pswrepeat) {
        alert("Password do not match!");
        return false; // 阻止表單提交
    }
    return true;
};