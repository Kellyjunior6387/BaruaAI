import Link from 'next/link';

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-100/50">
      <div className="max-w-[640px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="font-medium text-gray-800 text-lg tracking-tight select-none">
          Barua <span className="text-[#D4537E]">💌</span>
        </Link>

        {/* Action Links */}
        <nav className="flex items-center space-x-6">
          {isLoggedIn ? (
            /* Logged In State (both mobile and desktop) */
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-[#D4537E] hover:opacity-85 transition-opacity"
            >
              Dashboard
            </Link>
          ) : (
            /* Logged Out State */
            <>
              {/* Desktop Only Links */}
              <Link
                href="/login"
                className="hidden sm:inline-block text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/create"
                className="text-sm font-semibold text-[#D4537E] hover:opacity-85 sm:bg-[#D4537E] sm:text-white sm:px-4 sm:py-2 sm:rounded-lg sm:hover:bg-[#c3436d] sm:shadow-sm sm:transition-all"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
