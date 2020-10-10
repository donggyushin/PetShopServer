type ENVIRONMENT = "production " | "test" | "development";

const environment = (process.env.NODE_ENV || "development") as ENVIRONMENT;

export default environment;
