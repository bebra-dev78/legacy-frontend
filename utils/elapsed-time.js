"use client";

import { DateTime } from "luxon";

export default function ElapsedTime({ time }) {
  const diff = DateTime.now()
    .diff(DateTime.fromISO(time, { zone: "Europe/Moscow" }), [
      "years",
      "months",
      "days",
      "hours",
      "minutes",
      "seconds",
    ])
    .toObject();

  if (diff.years !== 0) {
    return `около  ${diff.years === 1 ? "1 года" : `${diff.years} лет`}`;
  } else if (diff.months !== 0) {
    return `около ${diff.months === 1 ? "1 месяца" : `${diff.months} месяцев`}`;
  } else if (diff.days !== 0) {
    if (diff.days % 10 === 1 && diff.days % 100 !== 11) {
      return `${diff.days} день`;
    } else if (
      [2, 3, 4].includes(diff.days % 10) &&
      ![12, 13, 14].includes(diff.days % 100)
    ) {
      return `${diff.days} дня`;
    } else {
      return `${diff.days} дней`;
    }
  } else if (diff.hours !== 0) {
    if (diff.hours % 10 === 1 && diff.hours % 100 !== 11) {
      return `${diff.hours} час`;
    } else if (
      [2, 3, 4].includes(diff.hours % 10) &&
      ![12, 13, 14].includes(diff.hours % 100)
    ) {
      return `${diff.hours} часа`;
    } else {
      return `${diff.hours} часов`;
    }
  } else if (diff.minutes !== 0) {
    if (diff.minutes % 10 === 1 && diff.minutes % 100 !== 11) {
      return `${diff.minutes} минуту`;
    } else if (
      [2, 3, 4].includes(diff.minutes % 10) &&
      ![12, 13, 14].includes(diff.minutes % 100)
    ) {
      return `${diff.minutes} минуты`;
    } else {
      return `${diff.minutes} минут`;
    }
  } else if (diff.seconds !== 0) {
    if (
      Math.floor(diff.seconds) % 10 === 1 &&
      Math.floor(diff.seconds) % 100 !== 11
    ) {
      return `${diff.days} секунду`;
    } else if (
      [2, 3, 4].includes(Math.floor(diff.seconds) % 10) &&
      ![12, 13, 14].includes(Math.floor(diff.seconds) % 100)
    ) {
      return `${Math.floor(diff.seconds)} секунды`;
    } else {
      return `${Math.floor(diff.seconds)} секунд`;
    }
  }
}
