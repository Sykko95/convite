const countdownCard = document.getElementById("countdownCard");

function timeUntil(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);
    let diffMs = target - now;

    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
    diffMs %= 1000 * 60 * 60 * 24 * 30;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    diffMs %= 1000 * 60 * 60 * 24;

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    diffMs %= 1000 * 60 * 60;

    const minutes = Math.floor(diffMs / (1000 * 60));
    diffMs %= 1000 * 60;

    const seconds = Math.floor(diffMs / 1000);

    return { months, days, hours, minutes, seconds };
}

function plural(v, s, p) {
    return v === 1 ? s : p;
}

function updateCountdown() {
    const r = timeUntil("2026-07-25T16:30:00.000-03:00");
    document.getElementById("countdown").innerHTML = `
        ${r.months ? `${r.months} ${plural(r.months, "mês", "meses")}` : ""}
        ${r.days ? `${r.days} ${plural(r.days, "dia", "dias")}` : ""}
        ${r.hours ? `${r.hours} ${plural(r.hours, "hora", "horas")}` : ""}
        ${r.minutes ? `${r.minutes} ${plural(r.minutes, "minuto", "minutos")}` : ""}
        ${r.seconds ? `${r.seconds} ${plural(r.seconds, "segundo", "segundos")}` : ""}
    `;
}

updateCountdown();

setInterval(updateCountdown, 1000);
