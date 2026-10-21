const KEY = "lw_cart_token";

// Keeps the cart on the server when the API's cart cookie is blocked
// (Safari, Chrome with third-party cookies off). Kept after checkout on purpose.
export function getCartToken(): string | null {
  if (typeof window === "undefined") return null;

  try {
    let token = localStorage.getItem(KEY);
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem(KEY, token);
    }
    return token;
  } catch {
    return null;
  }
}
