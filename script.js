import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, update, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD3xCKkyQT-6FOURJBjBaTNKOFItL2M87Q",
    authDomain: "earnexmapp-8a0a2.firebaseapp.com",
    projectId: "earnexmapp-8a0a2",
    storageBucket: "earnexmapp-8a0a2.firebasestorage.app",
    messagingSenderId: "325148626791",
    appId: "1:325148626791:web:0448e65046bb38e365e9c2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const userId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id || "admin_test";
const userRef = ref(db, 'users/' + userId);

const RATE = 0.00005;
const links = ["https://otieu.com/4/10493012", "https://www.effectivegatecpm.com/njze4eg1xg?key=159eb9bfcd4ae292e143bc346e6aa518"];

// UI Switcher
window.showView = (id) => {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
};

// Wheel Draw
const canvas = document.getElementById('wheel-canvas');
const ctx = canvas.getContext('2d');
const prizes = ["50 EXM", "0.01$", "Lose", "2$", "5$", "100 EXM", "1 Spin", "0.2$"];

function drawWheel() {
    const arc = Math.PI / (prizes.length / 2);
    prizes.forEach((p, i) => {
        ctx.fillStyle = i % 2 === 0 ? "#ff4d94" : "#ffcc00";
        ctx.beginPath(); ctx.arc(160, 160, 150, i * arc, (i + 1) * arc);
        ctx.lineTo(160, 160); ctx.fill();
        ctx.save(); ctx.fillStyle = "black"; ctx.translate(160, 160);
        ctx.rotate(i * arc + arc / 2); ctx.fillText(p, 70, 5); ctx.restore();
    });
}
drawWheel();

// Task Logic
window.handleTask = function() {
    const btn = document.getElementById('task-master-btn');
    const taskBtn = document.getElementById('task-btn');
    if(taskBtn.innerText === "Give me a task") {
        taskBtn.innerText = "Take it";
        const link = links[Math.floor(Math.random() * links.length)];
        taskBtn.onclick = () => {
            window.open(link, '_blank');
            let sec = 60;
            let timer = setInterval(() => {
                sec--;
                document.getElementById('timer-sec').innerText = sec;
                if(sec <= 0) {
                    clearInterval(timer);
                    alert("Success! Claim your reward.");
                }
            }, 1000);
        };
    }
};

// Admin Logic (Secret)
window.requestWithdraw = function() {
    const addr = document.getElementById('wallet-address').value;
    if(addr === "InisTa") { // Secret Code to enter Admin
        alert("Welcome Admin InisTa! Loading database...");
        // Show Admin Panel Logic
    } else {
        alert("Withdrawal request sent. Pending 24h.");
    }
};

// Realtime Balance
onValue(userRef, (s) => {
    const data = s.val() || { exm: 0 };
    document.getElementById('balance-exm').innerText = data.exm;
    document.getElementById('balance-usdt').innerText = (data.exm * RATE).toFixed(5);
});
