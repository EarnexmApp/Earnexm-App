import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, set, update, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe?.user?.id || "user_test";
const userRef = ref(db, 'users/' + userId);

const RATE = 0.0001;

const allLinks = [
  "https://otieu.com/4/10493012", "https://otieu.com/4/10493001", "https://otieu.com/4/10492992",
  "https://otieu.com/4/10492998", "https://otieu.com/4/10493000", "https://otieu.com/4/10492995",
  "https://otieu.com/4/10492997", "https://otieu.com/4/10492996", "https://otieu.com/4/10493002",
  "https://otieu.com/4/10493013", "https://otieu.com/4/10492994", "https://otieu.com/4/10493006",
  "https://otieu.com/4/10492993", "https://otieu.com/4/10493006", "https://otieu.com/4/10493007",
  "https://otieu.com/4/10492991", "https://otieu.com/4/10493005", "https://otieu.com/4/10493004",
  "https://otieu.com/4/10492936", "https://otieu.com/4/10492999",
  "https://www.effectivegatecpm.com/njze4eg1xg?key=159eb9bfcd4ae292e143bc346e6aa518",
  "https://www.effectivegatecpm.com/v41im7s8?key=71cf533d5cc0a76e55e9a9545d527f49",
  "https://www.effectivegatecpm.com/rgudphv5?key=a31db716ac8d5da42a64a1a6625fa7ab",
  "https://www.effectivegatecpm.com/u6b0hegta?key=e2ce67a04ef1561f7cf7a87da661d9d1",
  "https://www.effectivegatecpm.com/qdwwkhf2q?key=b45ba08756361232307f46c12a47b681",
  "https://www.effectivegatecpm.com/saxx5k3u?key=c1086a20e1c60d1e27608fd1a6fc363c",
  "https://www.effectivegatecpm.com/vz6cvs2518?key=a5bc3af46bac80482b8d4e36a0001e88",
  "https://www.effectivegatecpm.com/g8rgjhkxgy?key=6cf835104ba53db43f2743ce971a7d36",
  "https://www.effectivegatecpm.com/jgn8ye2pv?key=bb923e278557fb9b5e9a2613cf0dac7f",
  "https://www.effectivegatecpm.com/nhr8rc7u2?key=fd387ca514523dc3bec908c220f72f68",
  "https://www.effectivegatecpm.com/jyspkti4p?key=02360198cbc2c2a4d9d2c7080d9222fc",
  "https://www.effectivegatecpm.com/u3hppesbq?key=88e13b9323cc75e43263878a2e82bc8d",
  "https://www.effectivegatecpm.com/zubsft1xf?key=2dfb5ae9bda4ea66f15d86fa805fec3e",
  "https://www.effectivegatecpm.com/er0xf7t9ag?key=5f9828c600aed4301f70c49a541dce96",
  "https://www.effectivegatecpm.com/jmcrwwq2?key=4a4e0d1b562a107395dbad5e998e2872"
];

onValue(userRef, (snapshot) => {
    const data = snapshot.val() || { exm: 0, strikes: 0 };
    if(data.strikes >= 3) {
        document.body.innerHTML = "<div style='color:white; padding-top:100px;'><h1>ACCESS DENIED</h1><p>Your account is banned for fraud.</p></div>";
        return;
    }
    document.getElementById('balance-exm').innerText = `${data.exm.toLocaleString()} EXM`;
    document.getElementById('balance-usd').innerText = `$${(data.exm * RATE).toFixed(4)}`;
});

window.openEarn = () => document.getElementById('earn-modal').classList.remove('hidden');
window.closeEarn = () => document.getElementById('earn-modal').classList.add('hidden');

document.getElementById('task-link-btn').onclick = function() {
    const link = allLinks[Math.floor(Math.random() * allLinks.length)];
    window.open(link, '_blank');
    let start = Date.now();
    this.classList.add('hidden');
    document.getElementById('countdown').classList.remove('hidden');
    
    let timeLeft = 60;
    let timer = setInterval(() => {
        timeLeft--;
        document.getElementById('countdown').innerText = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timer);
            let stayed = (Date.now() - start) / 1000;
            if(stayed < 20) {
                get(userRef).then(s => {
                    let newStrikes = (s.val().strikes || 0) + 1;
                    update(userRef, { strikes: newStrikes });
                    alert("System: Cheat detected! Stay at least 20s. Strike " + newStrikes + "/3");
                });
                location.reload();
            } else {
                document.getElementById('countdown').classList.add('hidden');
                document.getElementById('claim-task-btn').classList.remove('hidden');
            }
        }
    }, 1000);
};

document.getElementById('claim-task-btn').onclick = function() {
    get(userRef).then(s => {
        let currentExm = s.val().exm || 0;
        update(userRef, { exm: currentExm + 50 });
        alert("System: Success! 50 EXM added to your balance.");
        location.reload();
    });
};

window.spinWheel = () => alert("System: Wheel logic is coming in next update.");
window.handleDaily = () => alert("System: Daily gift available tomorrow.");
window.handleLucky = () => alert("System: Weekly draw opens on Sunday.");
