//* All public routes
export const publicRoutes = ["/"];

//* All auth routes
export const authRoutes = ["/login", "/register"];

//* All api/auth routes , these routes shouldnt be blocked in any case
export const apiAuthPrefix = "/api/auth";

//* User gets redirected to this default route
export const defaultLoginRedirect = "/about";
