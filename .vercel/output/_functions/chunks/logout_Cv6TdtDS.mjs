import './page-ssr_D7qodE23.mjs';
import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import './sequence_BMWlBDiy.mjs';
import 'clsx';
import { S as SESSION_COOKIE } from './admin-auth_B-_wXA3q.mjs';

const prerender = false;
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Logout;
  Astro2.cookies.delete(SESSION_COOKIE, { path: "/" });
  return Astro2.redirect("/admin");
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/logout.astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/logout.astro";
const $$url = "/admin/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
