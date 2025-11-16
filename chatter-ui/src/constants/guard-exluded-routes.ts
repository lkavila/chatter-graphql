import { Page } from "../interfaces/page.interface";

export const GUARD_EXCLUDED_ROUTES = ["/login", "/signup"];

export const unauthenticatedPages: Page[] = [{ title: "Login", path: "/login" }, { title: "Signup", path: "/signup" }];