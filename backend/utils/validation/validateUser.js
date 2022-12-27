import validator from "validator";

export const validateUser = (user) => {
  const errors = [];

  // Check if email is provided and in a valid format
  if (user.email) {
    if (validator.isEmpty(user.email)) {
      errors.push({ field: "email", message: "Email is required" });
    } else if (!validator.isEmail(user.email)) {
      errors.push({
        field: "email",
        message: "Email must be in a valid format",
      });
    }
  }

  // Check if password is provided and meets certain length and format requirements
  if (user.password) {
    if (validator.isEmpty(user.password)) {
      errors.push({ field: "password", message: "Password is required" });
    } else if (!validator.isLength(user.password, { min: 8 })) {
      errors.push({
        field: "password",
        message: "Password must be at least 8 characters long",
      });
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(user.password)
    ) {
      errors.push({
        field: "password",
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }
  }

  // Check if role is provided and is a valid value
  if (user.role) {
    if (validator.isEmpty(user.role)) {
      errors.push({ field: "role", message: "Role is required" });
    } else if (!["admin", "employee"].includes(user.role)) {
      errors.push({ field: "role", message: "Invalid role" });
    }
  }

  return errors;
};
