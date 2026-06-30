import { NavLink } from "react-router-dom";

import { NAV_ITEMS } from "../../constants/navigation";
import { SITE } from "../../constants/siteContent";
import { cn } from "../../utils/cn";

export default function Sidebar() {
  return (
    <aside className="border-b border-cream-dark bg-white px-6 py-8 md:w-64 md:border-b-0 md:border-r dark:border-navy-700 dark:bg-navy-900">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-usa-red" />
          <span className="h-2 w-2 rounded-full bg-white ring-1 ring-navy-800 dark:ring-slate-300" />
          <span className="h-2 w-2 rounded-full bg-navy-800 dark:bg-slate-300" />
        </div>
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-navy-900 dark:text-white">
          {SITE.name}
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {SITE.tagline}
        </p>
      </div>

      <nav className="flex flex-row gap-2 overflow-x-auto md:flex-col md:gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-navy-900 text-white dark:bg-white dark:text-navy-900"
                  : "text-slate-600 hover:bg-cream dark:text-slate-300 dark:hover:bg-navy-800"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
