// Earnexm - Eriuxum Engine
let balance = 0;
let spins = 20;
let timer;

const adLinks = [
    // Monetag links
    "https://otieu.com/4/10493012",
    "https://otieu.com/4/10493001",
    "https://otieu.com/4/10492992",
    "https://otieu.com/4/10492998",
    "https://otieu.com/4/10493000",
    "https://otieu.com/4/10492995",
    "https://otieu.com/4/10492997",
    "https://otieu.com/4/10492996",
    "https://otieu.com/4/10493002",
    "https://otieu.com/4/10493013",
    "https://otieu.com/4/10492994",
    "https://otieu.com/4/10493006",
    "https://otieu.com/4/10492993",
    "https://otieu.com/4/10493006",
    "https://otieu.com/4/10493007",
    "https://otieu.com/4/10492991",
    "https://otieu.com/4/10493005",
    "https://otieu.com/4/10493004",
    "https://otieu.com/4/10492936",
    "https://otieu.com/4/10492999",
    // Adsterra links
    "https://www.effectivegatecpm.com/njze4eg1xg?key=159eb9bfcd4ae292e143bc346e6aa518",
    "https://www.effectivegatecpm.com/v41im7s8?key=71cf533d5cc0a76e55e9a9545d527f49",
    "https://www.effectivegatecpm.com/rgudphv5?key=a31db716ac8d5da42a64a1a6625fa7ab"
];

function switchTab(tab) {
    const title = document.getElementById('view-title');
    const desc = document.getElementById('view-desc');
    
    title.innerText = tab.toUpperCase();
    
    if(tab === 'ads') {
        desc.innerHTML = `<p>Task Price: 50 EXM</p>
            <div id="timer-box">Wait: 60s</div>
            <button class="btn-main" id="task-btn" onclick="startAdTask()">START AD TASK</button>`;
    } else if(tab === 'spin') {
        desc.innerHTML = `<p>Available Spins: <span id="spin-count">${spins}</span></p>
            <button class="btn-main" onclick="runSpin()">SPIN NOW</button>`;
    } else if(tab === 'social') {
        desc.innerHTML = `<p>Complete social tasks for EXM!</p>`;
    } else if(tab === 'withdraw') {
        desc.innerHTML = `<p>Withdraw EXM to your wallet</p>
            <input type="text" id="wallet" placeholder="Wallet address">
            <button class="btn-main" onclick="withdrawEXM()">Withdraw</button>`;
    } else {
        desc.innerText = "Section Coming Soon...";
    }
}

function startAdTask() {
    const randomIndex = Math.floor(Math.random() * adLinks.length);
    const link = adLinks[randomIndex];
    window.open(link, "_blank");
    
    let timeLeft = 60;
    document.getElementById('task-btn').disabled = true;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-box').innerText = "Wait: " + timeLeft + "s";
        if(timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('timer-box').innerHTML = `<button class="btn-main" onclick="claimExm(50)">CLAIM 50 EXM</button>`;
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
        let win = Math.floor(Math.random() * 100);
        balance += win;
        alert("You won " + win + " EXM!");
        document.getElementById('exm-display').innerText = balance.toFixed(2);
        switchTab('spin');
    } else {
        alert("No spins left! Watch ad to get more.");
    }
}

function withdrawEXM() {
    const wallet = document.getElementById('wallet').value;
    if(balance >= 10000 && wallet) {
        alert("Withdrawal successful! Sent to " + wallet);
        balance = 0;
        document.getElementById('exm-display').innerText = balance.toFixed(2);
        document.getElementById('usd-display').innerText = "$" + (balance * 0.0001).toFixed(2);
    } else {
        alert("You need at least 10000 EXM or enter wallet address!");
    }
  }
