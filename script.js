// ১. ঢাকার বেইজ সময়সূচী ২০২৬ (ইসলামিক ফাউন্ডেশন অনুযায়ী আপডেট করা)
const dhakaSchedule = [
    { ramadan: 1, date: "19 Feb", sehri: "05:12", iftar: "17:58" },
    { ramadan: 2, date: "20 Feb", sehri: "05:11", iftar: "17:58" },
    { ramadan: 3, date: "21 Feb", sehri: "05:11", iftar: "17:59" },
    { ramadan: 4, date: "22 Feb", sehri: "05:10", iftar: "17:59" },
    { ramadan: 5, date: "23 Feb", sehri: "05:09", iftar: "18:00" },
    { ramadan: 6, date: "24 Feb", sehri: "05:08", iftar: "18:00" },
    { ramadan: 7, date: "25 Feb", sehri: "05:08", iftar: "18:01" },
    { ramadan: 8, date: "26 Feb", sehri: "05:07", iftar: "18:01" },
    { ramadan: 9, date: "27 Feb", sehri: "05:06", iftar: "18:02" },
    { ramadan: 10, date: "28 Feb", sehri: "05:05", iftar: "18:02" },
    { ramadan: 11, date: "01 Mar", sehri: "05:05", iftar: "18:03" },
    { ramadan: 12, date: "02 Mar", sehri: "05:04", iftar: "18:03" },
    { ramadan: 13, date: "03 Mar", sehri: "05:03", iftar: "18:04" },
    { ramadan: 14, date: "04 Mar", sehri: "05:02", iftar: "18:04" },
    { ramadan: 15, date: "05 Mar", sehri: "05:01", iftar: "18:05" },
    { ramadan: 16, date: "06 Mar", sehri: "05:00", iftar: "18:05" },
    { ramadan: 17, date: "07 Mar", sehri: "04:59", iftar: "18:06" },
    { ramadan: 18, date: "08 Mar", sehri: "04:58", iftar: "18:06" },
    { ramadan: 19, date: "09 Mar", sehri: "04:57", iftar: "18:07" },
    { ramadan: 20, date: "10 Mar", sehri: "04:57", iftar: "18:07" },
    { ramadan: 21, date: "11 Mar", sehri: "04:56", iftar: "18:07" },
    { ramadan: 22, date: "12 Mar", sehri: "04:55", iftar: "18:08" },
    { ramadan: 23, date: "13 Mar", sehri: "04:54", iftar: "18:08" },
    { ramadan: 24, date: "14 Mar", sehri: "04:53", iftar: "18:09" },
    { ramadan: 25, date: "15 Mar", sehri: "04:52", iftar: "18:09" },
    { ramadan: 26, date: "16 Mar", sehri: "04:51", iftar: "18:10" },
    { ramadan: 27, date: "17 Mar", sehri: "04:50", iftar: "18:10" },
    { ramadan: 28, date: "18 Mar", sehri: "04:49", iftar: "18:10" },
    { ramadan: 29, date: "19 Mar", sehri: "04:48", iftar: "18:11" },
    { ramadan: 30, date: "20 Mar", sehri: "04:47", iftar: "18:11" }
];


// ২. জেলা ভিত্তিক সময়ের পার্থক্য (ইসলামিক ফাউন্ডেশন ২০২৬ অনুযায়ী)
const districtOffsets = {
    "Dhaka": 0, "Gazipur": 0, "Narayanganj": 0, "Munshiganj": 0, "Narsingdi": -1, "Manikganj": +1,
    "Tangail": +1, "Faridpur": +2, "Gopalganj": +3, "Madaripur": +1, "Rajbari": +3, "Shariatpur": +1,
    "Kishoreganj": -2, "Mymensingh": -1, "Jamalpur": +1, "Netrokona": -3, "Sherpur": 0,
    "Chittagong": -5, "Coxs Bazar": -7, "Comilla": -3, "Brahmanbaria": -3, "Chandpur": -1,
    "Noakhali": -3, "Feni": -4, "Lakshmipur": -2, "Rangamati": -6, "Khagrachari": -6, "Bandarban": -7,
    "Sylhet": -6, "Sunamganj": -6, "Habiganj": -4, "Moulvibazar": -6,
    "Rajshahi": +7, "Chapai Nawabganj": +9, "Naogaon": +6, "Natore": +6, "Pabna": +5, "Sirajganj": +3,
    "Bogura": +4, "Joypurhat": +5,
    "Rangpur": +6, "Dinajpur": +8, "Gaibandha": +4, "Kurigram": +3, "Lalmonirhat": +4, "Nilphamari": +8,
    "Panchagarh": +10, "Thakurgaon": +10,
    "Khulna": +5, "Bagerhat": +4, "Chuadanga": +6, "Jessore": +6, "Jhenaidah": +5, "Kushtia": +5,
    "Magura": +4, "Meherpur": +7, "Narail": +4, "Satkhira": +7,
    "Barisal": +1, "Barguna": +2, "Bhola": -1, "Jhalokati": +2, "Patuakhali": +1, "Pirojpur": +2
};


// ৩. সময় ক্যালকুলেট
function adjustTime(timeStr, offsetMinutes) {
    if (!timeStr) return "--:--";
    let [hours, minutes] = timeStr.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes + offsetMinutes;
    let newHours = Math.floor(totalMinutes / 60);
    let newMinutes = totalMinutes % 60;
    if (newMinutes < 0) { newMinutes += 60; newHours -= 1; }
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

// ৪. ১২ ঘণ্টা ফরম্যাট
function formatTo12Hour(time24) {
    let [h, m] = time24.split(':').map(Number);
    let suffix = h >= 12 ? "PM" : "AM";
    let hour12 = h % 12 || 12;
    return `${String(hour12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`;
}

// ৫. মেইন অ্যাপ ফাংশন
function initApp() {
    const districtElem = document.getElementById('district');
    if (!districtElem) return;
    const selectedDistrict = districtElem.value;
    const offset = districtOffsets[selectedDistrict] || 0;

    // বর্তমান তারিখ লজিক
    const now = new Date();
    const todayDate = now.getDate();
    const month = now.getMonth() + 1;
    let dayIndex = 0;

    if (month === 2 && todayDate >= 19) {
        dayIndex = todayDate - 19; 
    } else if (month === 3) {
        dayIndex = todayDate + 9; 
    }
    if (dayIndex < 0) dayIndex = 0;
    if (dayIndex >= dhakaSchedule.length) dayIndex = dhakaSchedule.length - 1;

    let todayData = dhakaSchedule[dayIndex];

    // কার্ড আপডেট
    const sehriElem = document.getElementById("sehri-time");
    const iftarElem = document.getElementById("iftar-time");
    if (sehriElem && iftarElem) {
        sehriElem.innerText = formatTo12Hour(adjustTime(todayData.sehri, offset));
        iftarElem.innerText = formatTo12Hour(adjustTime(todayData.iftar, offset));
    }

    // টেবিল আপডেট
    const tableBody = document.getElementById('calendar-body');
    if (tableBody) {
        let rows = "";
        dhakaSchedule.forEach(day => {
            rows += `<tr>
                <td>${day.ramadan}</td>
                <td>${day.date}</td>
                <td>${formatTo12Hour(adjustTime(day.sehri, offset))}</td>
                <td>${formatTo12Hour(adjustTime(day.iftar, offset))}</td>
            </tr>`;
        });
        tableBody.innerHTML = rows;
    }
}

// ৬. পেজ পরিবর্তন
function showPage(pageId, event) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(s => s.style.display = 'none');
    
    if (pageId === 'home') {
        document.getElementById('home-section').style.display = 'block';
    } else {
        document.getElementById('home-section').style.display = 'none';
        const target = document.getElementById(pageId + '-section');
        if (target) target.style.display = 'block';
    }
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
}

// ৭. তসবিহ লজিক
document.addEventListener("DOMContentLoaded", () => {
    let count = parseInt(localStorage.getItem('tasbihCount')) || 0;
    const display = document.getElementById('counter-display');
    const btn = document.getElementById('count-btn');
    const rst = document.getElementById('reset-btn');

    if (display) display.innerText = count;
    if (btn) btn.onclick = () => { count++; display.innerText = count; localStorage.setItem('tasbihCount', count); };
    if (rst) rst.onclick = () => { if(confirm("Reset?")) { count = 0; display.innerText = 0; localStorage.setItem('tasbihCount', 0); }};
});

// ৮. স্মার্ট কাউন্টডাউন
function startCountdown() {
    setInterval(() => {
        const now = new Date();
        const ramadanDate = new Date("2026-02-19T00:00:00").getTime();
        const diffToRamadan = ramadanDate - now.getTime();
        const container = document.getElementById("countdown-container");
        const label = container ? container.querySelector('p') : null;

        if (diffToRamadan > 0) {
            document.getElementById("days").innerText = Math.floor(diffToRamadan / 86400000).toString().padStart(2, '0');
            document.getElementById("hours").innerText = Math.floor((diffToRamadan % 86400000) / 3600000).toString().padStart(2, '0');
            document.getElementById("minutes").innerText = Math.floor((diffToRamadan % 3600000) / 60000).toString().padStart(2, '0');
            document.getElementById("seconds").innerText = Math.floor((diffToRamadan % 60000) / 1000).toString().padStart(2, '0');
        } else {
            // রমজানকালীন লজিক
            if (label) label.innerText = "Iftar/Sehri Countdown...";
            document.getElementById("days").style.display = "none";
        }
    }, 1000);
}

// জাকাত ক্যালকুলেশন লজিক
function calculateZakat() {
    const cash = parseFloat(document.getElementById('cash-wealth').value) || 0;
    const gold = parseFloat(document.getElementById('gold-wealth').value) || 0;
    const other = parseFloat(document.getElementById('other-wealth').value) || 0;
    
    const totalWealth = cash + gold + other;
    const zakatText = document.getElementById('zakat-text');

    if (totalWealth <= 0) {
        zakatText.innerText = "৳ ০.০০";
        zakatText.style.color = "#ff4444";
        return;
    }

    // জাকাত ২.৫%
    const zakatAmount = totalWealth * 0.025;
    
    zakatText.style.color = "#00ff00";
    zakatText.innerText = "আপনার মোট জাকাত: ৳ " + zakatAmount.toLocaleString('bn-BD');
}
// লোড
window.onload = () => { initApp(); startCountdown(); };
