export const isRequired = (value) => {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim().length > 0
  );
};

export const isValidEmail = (email) => {
  if (!email) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email).trim()
  );
};

export const isValidPassword = (password) => {
  return typeof password === "string" && password.length >= 8;
};

export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const isValidName = (name) => {
  return (
    typeof name === "string" &&
    name.trim().length >= 2 &&
    /^[A-Za-z\s.'-]+$/.test(name.trim())
  );
};

export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isRequired(password)) {
    errors.password = "Password is required.";
  }

  return errors;
};

export const validateRegistration = ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};

  if (!isValidName(name)) {
    errors.name = "Please enter a valid name.";
  }

  if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isValidPassword(password)) {
    errors.password =
      "Password must contain at least 8 characters.";
  }

  if (!passwordsMatch(password, confirmPassword)) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

export const isValidElectionDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return false;

  return new Date(startDate) <= new Date(endDate);
};