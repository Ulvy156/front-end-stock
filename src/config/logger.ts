if (import.meta.env.VITE_MODE === "production") {
  console.log = () => {};
  console.debug = () => {};
  console.error = () => {};
}
