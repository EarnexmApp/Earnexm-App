// Earnexm - Eriuxum Engine
let balance = 0;
let spins = 20;
let timer;

// --- المهام --- //
const tasks = [
  // Monetag Links
  { link: "https://otieu.com/4/10493012", reward: 50 },
  { link: "https://otieu.com/4/10493001", reward: 50 },
  { link: "https://otieu.com/4/10492992", reward: 50 },
  { link: "https://otieu.com/4/10492998", reward: 50 },
  { link: "https://otieu.com/4/10493000", reward: 50 },
  { link: "https://otieu.com/4/10492995", reward: 50 },
  { link: "https://otieu.com/4/10492997", reward: 50 },
  { link: "https://otieu.com/4/10492996", reward: 50 },
  { link: "https://otieu.com/4/10493002", reward: 50 },
  { link: "https://otieu.com/4/10493013", reward: 50 },
  { link: "https://otieu.com/4/10492994", reward: 50 },
  { link: "https://otieu.com/4/10493006", reward: 50 },
  { link: "https://otieu.com/4/10492993", reward: 50 },
  { link: "https://otieu.com/4/10493006", reward: 50 },
  { link: "https://otieu.com/4/10493007", reward: 50 },
  { link: "https://otieu.com/4/10492991", reward: 50 },
  { link: "https://otieu.com/4/10493005", reward: 50 },
  { link: "https://otieu.com/4/10493004", reward: 50 },
  { link: "https://otieu.com/4/10492936", reward: 50 },
  { link: "https://otieu.com/4/10492999", reward: 50 },
  // Adsterra Links
  { link: "https://www.effectivegatecpm.com/njze4eg1xg?key=159eb9bfcd4ae292e143bc346e6aa518", reward: 50 },
  { link: "https://www.effectivegatecpm.com/v41im7s8?key=71cf533d5cc0a76e55e9a9545d527f49", reward: 50 },
  { link: "https://www.effectivegatecpm.com/rgudphv5?key=a31db716ac8d5da42a64a1a6625fa7ab", reward: 50 },
  { link: "https://www.effectivegatecpm.com/u6b0hegta?key=e2ce67a04ef1561f7cf7a87da661d9d1", reward: 50 },
  { link: "https://www.effectivegatecpm.com/qdwwkhf2q?key=b45ba08756361232307f46c12a47b681", reward: 50 },
  { link: "https://www.effectivegatecpm.com/saxx5k3u?key=c1086a20e1c60d1e27608fd1a6fc363c", reward: 50 },
  { link: "https://www.effectivegatecpm.com/vz6cvs2518?key=a5bc3af46bac80482b8d4e36a0001e88", reward: 50 },
  { link: "https://www.effectivegatecpm.com/g8rgjhkxgy?key=6cf835104ba53db43f2743ce971a7d36", reward: 50 },
  { link: "https://www.effectivegatecpm.com/jgn8ye2pv?key=bb923e278557fb9b5e9a2613cf0dac7f", reward: 50 },
  { link: "https://www.effectivegatecpm.com/nhr8rc7u2?key=fd387ca514523dc3bec908c220f72f68", reward: 50 },
  { link: "https://www.effectivegatecpm.com/jyspkti4p?key=02360198cbc2c2a4d9d2c7080d9222fc", reward: 50 },
  { link: "https://www.effectivegatecpm.com/u3hppesbq?key=88e13b9323cc75e43263878a2e82bc8d", reward: 50 },
  { link: "https://www.effectivegatecpm.com/zubsft1xf?key=2dfb5ae9bda4ea66f15d86fa805fec3e", reward: 50 },
  { link: "https://www.effectivegatecpm.com/er0xf7t9ag?key=5f9828c600aed4301f70c49a541dce96", reward: 50 },
  { link: "https://www.effectivegatecpm.com/jmcrwwq2?key=4a4e0d1b562a107395dbad5e998e2872", reward: 50 },
];

function switchTab(tab) {
    const mainView = document.getElementById('main-view');
    const title = document.getElementById('view-title');
    const desc = document.getElementById('view-desc');
    
    title.innerText = tab.toUpperCase();
    
    if(tab === 'ads') {
        const task = tasks[Math.floor(Math.random()*tasks.length)];
        desc.innerHTML = `
            <p>Task Price: ${task.reward} EXM</p>
            <div id="timer-box">Wait: 60s</div>
            <button class="btn-main" id="task-btn" onclick="startAdTask('${task.link}', ${task.reward})">START AD TASK</button>
        `;
    } else if(tab === 'spin') {
        desc.innerHTML = `
            <p>Available Spins: <span id="spin-count">${spins}</span></p>
            <button class="btn-main" onclick="runSpin()">SPIN NOW</button>
        `;
    } else if(tab === 'withdraw') {
        desc.innerHTML = `
            <p>Balance: ${balance} EXM (~$${(balance*0.0001).toFixed(2)})</p>
            <p>Minimum withdrawal: $10</p>
            <button class="btn-main" onclick="alert('Withdrawal function coming soon!')">Withdraw</button>
        `;
    } else {
        desc.innerText = "Section Coming Soon...";
    }
}

function startAdTask(link, reward) {
    window.open(link, "_blank");
    let timeLeft = 60;
    document.getElementById('task-btn').disabled = true;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-box').innerText = "Wait: " + timeLeft + "s";
        
        if(timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('timer-box').innerHTML = `<button class="btn-main" onclick="claimExm(${reward})">CLAIM ${reward} EXM</button>`;
        }
    }, 1000);
}

function claimExm(amount) {
    balance += amount;
    document.getElementById('exm-display').innerText = balance.toFixed(2);
    document.getElementById('usd-display').innerText = "$" + (balance * 0.0001).toFixed(2);
    alert("Success! You earned " + amount + " EXM");
    switchTab('ads');
}

function runSpin() {
    if(spins > 0) {
        spins--;
        let win = Math.floor(Math.random() * 500); // مثال: المكافأة عشوائية
        balance += win;
        alert("You won " + win + " EXM!");
        document.getElementById('exm-display').innerText = balance.toFixed(2);
        document.getElementById('spin-count').innerText = spins;
    } else {
        alert("No spins left! Watch ad to get more.");
    }
   }
