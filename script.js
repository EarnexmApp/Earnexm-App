// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD3xCKkyQT-6FOURJBjBaTNKOFItL2M87Q",
  authDomain: "earnexmapp-8a0a2.firebaseapp.com",
  projectId: "earnexmapp-8a0a2",
  databaseURL: "https://earnexmapp-8a0a2-default-rtdb.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🆔 مستخدم بسيط (local)
let userId = localStorage.getItem("uid");
if (!userId) {
  userId = "user_" + Math.random().toString(36).substr(2,9);
  localStorage.setItem("uid", userId);

  // نعطيوه مليون EXM في البداية (sponsor)
  db.ref("users/"+userId).set({
    balance: 1000000
  });
}

const balanceEl = document.getElementById("balance");

db.ref("users/"+userId+"/balance").on("value", snap=>{
  balanceEl.innerText = snap.val();
});

// ➕ زيادة EXM
function addEXM(amount){
  const ref = db.ref("users/"+userId+"/balance");
  ref.transaction(b => (b || 0) + amount);
}

// 🎯 المهام
function earnTask(){
  addEXM(50);
  alert("ربحت 50 EXM");
}

// 🎁 هدية يومية
function dailyGift(){
  addEXM(100);
  alert("Daily Gift 🎁 +100 EXM");
}

// 🎡 عجلة الحظ
function openWheel(){
  document.getElementById("wheelBox").style.display="block";
}
function closeWheel(){
  document.getElementById("wheelBox").style.display="none";
}
function spinWheel(){
  const win = Math.floor(Math.random()*500)+10;
  addEXM(win);
  alert("ربحت "+win+" EXM");
}

// ➕ Add more EXM (زيادة فرص)
function addMoreEXM(){
  addEXM(200);
  alert("Boost +200 EXM");
}

// 💸 السحب اليدوي
function withdraw(){
  const wallet = prompt("دخل عنوان محفظتك (USDT)");
  if(!wallet) return;

  db.ref("withdraws/"+Date.now()).set({
    user: userId,
    wallet: wallet,
    balance: balanceEl.innerText
  });

  alert("تم إرسال الطلب، راح تراجعه يدويًا");
}
