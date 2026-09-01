export const formatDate = (date, options = {}) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  }).format(parsedDate);
};

export const formatDateTime = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
};

export const formatNumber = (value) => {
  const number = Number(value);

  if (Number.isNaN(number)) return "0";

  return new Intl.NumberFormat("en-IN").format(number);
};

export const formatPercentage = (value, digits = 1) => {
  const number = Number(value);

  if (Number.isNaN(number)) return "0%";

  return `${number.toFixed(digits)}%`;
};

export const shortenHash = (hash, start = 8, end = 6) => {
  if (!hash || hash.length <= start + end) {
    return hash || "—";
  }

  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
};

export const capitalize = (value) => {
  if (!value) return "";

  return String(value).charAt(0).toUpperCase() +
    String(value).slice(1).toLowerCase();
};