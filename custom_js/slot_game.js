// 右側下拉式許選單
function toggledown() {
    document.querySelector(".bar_container").classList.toggle("change");
    document.getElementById("doprdownMenu").classList.toggle("show");
};

// 背景音樂開關

function bgmOn() {
    const switchButton = document.getElementById("switch");
    const bgm = document.getElementById("bgm");
    if (switchButton.checked) {
        bgm.play();
    } else {
        bgm.pause();
    }
};

function logout() {
    // 在此處理其他登出邏輯（如清除 session 資料）
    sessionStorage.clear();
    // 跳轉回 slot_home 頁面
    window.location.href = "slot_home.html";
}


window.onload = function () {
    // 玩家帳號名稱串接
    const playername = sessionStorage.getItem("username");

    if (playername) {
        document.getElementById("player_name").textContent = "嗨！" + playername + "歡迎回來！";
    };


    //拉霸機計分
    const symbolsArray = [
        { src: '/img/munchkin.png', alt: '圖案1', magnification: 50 },
        { src: '/img/cat.png', alt: '圖案2', magnification: 30 },
        { src: '/img/animals.png', alt: '圖案3', magnification: 20 },
        { src: '/img/paw.png', alt: '圖案4', magnification: 10 },
    ];


    let initialBalance = 100;
    document.getElementById('totalBalance').textContent = initialBalance; //顯示當前餘額

    const reel1 = document.querySelectorAll(".reel1"); // 選取帶有.reel的DOM元素，並存入一個nodelist中
    const scoreElem = document.getElementById("score"); // 選取帶有#score的DOM元素，用來顯示當前分數
    let totalBalance = initialBalance; // 初始餘額給剩下餘額
    const totalBalanceElem = document.getElementById("totalBalance");
    const spinButton = document.querySelector(".spin_button");


    // 選擇下注金額
    document.querySelectorAll("#bet button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll("#bet button").forEach(btn => {
                btn.classList.remove("selected");
            })
            button.classList.add("selected");
        })
    })



    spinButton.addEventListener('click', () => { // 當開始按鈕被點擊，會創建一個空陣列results
        const selectedBet = document.querySelector("#bet button.selected");
        if (!selectedBet) {
            alert("請選擇押注金額！")
            return;
        };

        const betAmount = parseInt(selectedBet.getAttribute('data-bet')) // 取得屬性的值(下注金額)
        
        if (totalBalance < betAmount) {
            alert("餘額不足");
            return;
        }
        
        totalBalance -= betAmount; // 餘額要先扣掉下注金額
        totalBalanceElem.textContent = totalBalance; // 餘額金額

        // 開始出現圖案
        const results = [];
        reel1.forEach(reel1 => {  // 使用forEach去對陣列中的元素進行迴圈，推入results的陣列中
            results.push(spinReel(reel1));
        });
        const currentScore = calculateScore(results, betAmount);
        updateTotalBalance(currentScore);
        highlightWinningSymbols(results);
    });


    //隨機出現圖案
    function spinReel(reel1) {
        const symbol = reel1.querySelector(".symbol");
        const randomSymbol = symbolsArray[Math.floor(Math.random() * symbolsArray.length)]; // 從symbolsArray中隨機選擇一個圖案，存入randomSymbol的變數中
        symbol.innerHTML = `<img class="symbol_img" src="${randomSymbol.src}" alt="${randomSymbol.alt}">`; // 將選中的圖案插入到 symbol 元素的 innerHTML 中，顯示在reel上
        return randomSymbol;
    };



    // 單次分數計算
    function calculateScore(results, betAmount) {
        let currentScore = 0;
        if (results[0].alt === results[1].alt && results[1].alt === results[2].alt) {
            currentScore = results[0].magnification * betAmount; // 使用下注金額乘以符號的倍率
            // console.log(currentScore);
            scoreElem.textContent = currentScore;
        } else {
            scoreElem.textContent = 0;
        }
        return currentScore;
    };

    // 總得分計算
    function updateTotalBalance(currentScore) {
        totalBalance = totalBalance + currentScore;
        console.log(totalBalance);
        totalBalanceElem.textContent = totalBalance;
    };

    // 突出顯示中獎圖案
    function highlightWinningSymbols(results) {
        if (results[0].alt === results[1].alt && results[1].alt === results[2].alt) {
            reels.forEach(reel => {
                reel.querySelector(".symbol_img").classList.add("enlarge");
            });
        }
    };
};