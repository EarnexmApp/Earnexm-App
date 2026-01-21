// Earnexm - Eriuxum Engine (No Arabic in Code)
let balance = 0;
let spins = 20;
let timer;

function switchTab(tab) {
    const mainView = document.getElementById('main-view');
    const title = document.getElementById('view-title');
    const desc = document.getElementById('view-desc');
    
    title.innerText = tab.toUpperCase();
    
    if(tab === 'ads') {
        desc.innerHTML = `
            <p>Task Price: 50 EXM</p>
            <div id="timer-box">Wait: 60s</div>
            <button class="btn-main" id="task-btn" onclick="startAdTask()">START AD TASK</button>
        `;
    } else if(tab === 'spin') {
        desc.innerHTML = `
            <p>Available Spins: <span id="spin-count">${spins}</span></p>
            <button class="btn-main" onclick="runSpin()">SPIN NOW</button>
        `;
    } else {
        desc.innerText = "Section Coming Soon...";
    }
}

function startAdTask() {
    // Open Ad Link (Put your Monetag link here)
    window.open("https://your-ad-link.com", "_blank");
    
    let timeLeft = 60;
    document.getElementById('task-btn').disabled = true;
    
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-box').innerText = "Wait: " + timeLeft + "s";
        
        if(timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('timer-box').innerHTML = '<button class="btn-main" onclick="claimExm(50)">CLAIM 50 EXM</button>';
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
