// Here the custom error class is defined
export const Error = [
  {
    message: "Internal Server Error",
  },
  {
    message: "NawqeqwN",
  },
  {
    message: "Error",
  },
  {
    message: "Invalid operator",
  },
  {
    message: "Infinity",
  },
  {
    message: "undefined",
  },
  {
    message: "Cannot divide by zero",
  },
];

// Check for errors and reset the display if needed
export function isError() {
  if (Error.some((err) => err.message == display.value)) {
    display.value = "";
    return;
  }
}
