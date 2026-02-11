const countdownCard = document.getElementById("countdownCard");

function timeUntil(targetDate) {
    const now = new Date();
    const target = new Date(targetDate);

    let months =
        (target.getFullYear() - now.getFullYear()) * 12 +
        (target.getMonth() - now.getMonth());

    let days = target.getDate() - now.getDate();

    if (days < 0) {
        months--;
        const daysInPrevMonth = new Date(
            target.getFullYear(),
            target.getMonth(),
            0
        ).getDate();
        days += daysInPrevMonth;
    }

    // If time-of-day already passed, borrow 1 day
    if (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds() > target.getHours() * 3600 + target.getMinutes() * 60 + target.getSeconds()) {
        days--;
        if (days < 0) {
            months--;

            const prevMonth = new Date(
                target.getFullYear(),
                target.getMonth() - 1,
                0
            );

            days = prevMonth.getDate();
        }
    };

    const refDate = new Date(now);
    refDate.setMonth(refDate.getMonth() + months);
    refDate.setDate(refDate.getDate() + days);

    let diffMs = target - refDate;

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
        ${r.months} ${plural(r.months, "mês", "meses")}
        ${r.days} ${plural(r.days, "dia", "dias")}
        ${r.hours} ${plural(r.hours, "hora", "horas")}
        ${r.minutes} ${plural(r.minutes, "minuto", "minutos")}
        ${r.seconds} ${plural(r.seconds, "segundo", "segundos")}
    `;
}

updateCountdown();

setInterval(updateCountdown, 1000);
