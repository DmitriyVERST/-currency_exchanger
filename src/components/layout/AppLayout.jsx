import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col overflow-hidden rounded-2xl border border-cream-dark bg-white shadow-xl shadow-navy-900/5 sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] dark:border-navy-700 dark:bg-navy-900 dark:shadow-black/30 md:flex-row">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-end border-b border-cream-dark px-6 py-4 dark:border-navy-700">
            <ThemeToggle />
          </header>

          <main className="flex-1 px-6 py-8 sm:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
