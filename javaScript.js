const CONFIG = {
    // 貼上你剛才「管理部署」後取得的最新 URL
    scriptURL: 'https://script.google.com/macros/s/AKfycbzpldkRnWdv0YWkwcWdDHN1MLYJ2mQJnIoGn-9v7mUlINu2scoDJqIPMHV9xtOkZqqj/exec'
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