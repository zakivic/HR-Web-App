import { validateUser } from "../utils/validation/validateUser.js";
import { validatePerformance } from "../utils/validation/validatePerformance.js";
import { validateTraining } from "../utils/validation/validateTraining.js";
import { validateEmployee } from "../utils/validation/validateEmployee.js";
import { validateDepartment } from "../utils/validation/validateDepartment.js";

export const validateUserBody = (req, res, next) => {
  const errors = validateUser(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: errors });
  }
  next();
};

export const validateTrainingRequestBody = (req, res, next) => {
  // Determine the request path
  const path = req.route.path;
  let errors;

  // Handle different request paths
  switch (path) {
    case "/:id":
      // If the request is being made to the update endpoint, skip the check for missing required fields
      // Call the validateTraining function to validate all fields that are present in the request body
      errors = validateTraining(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      break;
    default:
      // Check if all required fields are present in the request body
      const requiredFields = [
        "name",
        "instructor",
        "startDate",
        "endDate",
        "location",
      ];
      const missingFields = [];

      for (const field of requiredFields) {
        if (!(field in req.body)) {
          missingFields.push(field);
        }
      }

      // If any fields are missing, send a 400 Bad Request response
      if (missingFields.length > 0) {
        res.status(400).json({
          message: `Missing ${missingFields.join(", ")} in request body`,
        });
        return;
      }

      // If all required fields are present, call the validateTraining function
      errors = validateTraining(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      break;
  }

  // If the request body is valid, call the next middleware function
  next();
};

export const validatePerformanceReview = (req, res, next) => {
  // Determine the request path
  const path = req.route.path;
  let errors;

  // Handle different request paths
  switch (path) {
    case "/:id":
      // If the request is being made to the update endpoint, skip the check for missing required fields
      // Call the validatePerformance function to validate all fields that are present in the request body
      errors = validatePerformance(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      break;
    default:
      // Check if all required fields are present in the request body
      const requiredFields = [
        "employee",
        "reviewDate",
        "manager",
        "strengths",
        "areasForImprovement",
        "goals",
        "overallRating",
      ];
      const missingFields = [];

      for (const field of requiredFields) {
        if (!(field in req.body)) {
          missingFields.push(field);
        }
      }

      // If any fields are missing, send a 400 Bad Request response
      if (missingFields.length > 0) {
        res.status(400).json({
          message: `Missing ${missingFields.join(", ")} in request body`,
        });
        return;
      }

      // If all required fields are present, call the validatePerformance function
      errors = validatePerformance(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      break;
  }

  // If the request body is valid, call the next middleware function
  next();
};

export const validateEmployeeRequestBody = (req, res, next) => {
  // Determine the request path
  const path = req.route.path;
  let errors;

  // Handle different request paths
  switch (path) {
    case "/:id":
      // If the request is being made to the update endpoint, skip the check for missing required fields
      // Call the validateEmployee function to validate all fields that are present in the request body
      errors = validateEmployee(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      break;
    default:
      // Check if all required fields are present in the request body
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "mobilePhone",
        "hireDate",
        "department",
        "jobTitle",
        "nationalIDNumber",
        "socialSecurityNumber",
        "nationality",
        "gender",
        "address",
        "photo",
        "bloodType",
        "martialStatus",
        "militaryStatus",
        "educationStatus",
      ];
      const missingFields = [];

      for (const field of requiredFields) {
        if (!(field in req.body)) {
          missingFields.push(field);
        }
      }

      // If any fields are missing, send a 400 Bad Request response
      if (missingFields.length > 0) {
        res.status(400).json({
          message: `Missing ${missingFields.join(", ")} in request body`,
        });
        return;
      }

      // If all required fields are present, call the validateEmployee function
      errors = validateEmployee(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      break;
  }

  // If the request body is valid, call the next middleware function
  next();
};

export const validateDepartmentRequestBody = (req, res, next) => {
  // Determine the request path
  const path = req.route.path;
  let errors;

  // Handle different request paths
  switch (path) {
    case "/:id":
      // If the request is being made to the update endpoint, skip the check for missing required fields
      // Call the validateDepartment function to validate all fields that are present in the request body
      errors = validateDepartment(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      break;
    default:
      // Check if all required fields are present in the request body
      const requiredFields = ["name"];
      const missingFields = [];
      for (const field of requiredFields) {
        if (!(field in req.body)) {
          missingFields.push(field);
        }
      }

      // If any fields are missing, send a 400 Bad Request response
      if (missingFields.length > 0) {
        res.status(400).json({
          message: `Missing ${missingFields.join(", ")} in request body`,
        });
        return;
      }

      // If all required fields are present, call the validateDepartment function
      errors = validateDepartment(req.body);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
      break;
  }

  // If the request body is valid, call the next middleware function
  next();
};
