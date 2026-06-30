import { cn } from "../../utils/cn";

export default function PageHeader({ title, description, children }) {
  return (
    <div className="mb-8 border-b border-cream-dark pb-6 dark:border-navy-700">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-navy-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        {children && <div className={cn("shrink-0")}>{children}</div>}
      </div>
    </div>
  );
}
