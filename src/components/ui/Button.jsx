import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-800 dark:bg-white dark:text-navy-900 dark:hover:bg-slate-100",
  secondary:
    "border border-cream-dark bg-white text-navy-800 hover:border-navy-800 dark:border-navy-700 dark:bg-navy-800 dark:text-slate-100 dark:hover:border-slate-400",
  danger:
    "border border-usa-red/30 bg-usa-red/5 text-usa-red hover:bg-usa-red/10 dark:border-usa-red-light/40 dark:text-usa-red-light",
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
