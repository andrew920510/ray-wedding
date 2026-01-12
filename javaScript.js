const CONFIG = {
    // 貼上你剛才「管理部署」後取得的最新 URL
    scriptURL: 'https://script.google.com/macros/s/AKfycbwMW6lyNnGcGr1SxVF4JAe5vKtpG7YBDTrbaRyt4QlZQ_x9pz88i_kitA6NwWjSo89p/exec'
};

document.getElementById('rsvpForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const form = e.target;
    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString();

    btn.disabled = true;
    btn.innerText = '傳送中...';

    // 改用 mode: 'no-cors' 來避免安全性報錯
    fetch(`${CONFIG.scriptURL}?${params}`, {
        method: 'POST',
        mode: 'no-cors'
    })
        .then(() => {
            // 因為 no-cors 模式無法讀取回傳值，我們直接假設成功並顯示
            document.getElementById('rsvpForm').classList.add('hidden');
            document.getElementById('successMsg').classList.remove('hidden');
            document.getElementById('successMsg').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('傳送發生小錯誤，但請檢查試算表是否有增加資料。');
            btn.disabled = false;
            btn.innerText = '送出出席回覆';
        });
});

// 新增：監聽「是否參加」選項改變
document.querySelectorAll('input[name="attend"]').forEach(function (radio) {
    radio.addEventListener('change', function (e) {
        const val = e.target.value;
        const peopleSection = document.getElementById('peopleSection');
        const adultInput = document.querySelector('input[name="adults"]');
        const kidsInput = document.querySelector('input[name="kids"]');

        if (val === 'yes') {
            // 選擇參加：顯示人數區塊，並確保成人至少 1 人
            peopleSection.classList.remove('hidden');
            adultInput.setAttribute('min', '1');
            if (adultInput.value == 0) adultInput.value = 1;
        } else {
            // 禮到或無法參加：隱藏人數區塊，並將人數歸零
            peopleSection.classList.add('hidden');
            // 必須要把 min 改成 0，否則表單送出時會因為 value=0 而被瀏覽器擋下
            adultInput.setAttribute('min', '0');
            adultInput.value = 0;
            kidsInput.value = 0;
        }
    });
});