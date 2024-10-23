import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-pink-50">
      <div className="max-w-auto mx-auto px-1 sm:px-3"> {/* if user's screen width exceeds sm (60px), then padding-x-1 (0.25rem). if <= sm (60px), then padding-x-3 (0.75rem) */}
        <div className="flex items-center justify-between h-16"> {/* flex container, all flex-items centered on the cross-axis and even distribution on main axis. height of navbar = 4rem */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-1 text-black"> {/* flex container that centers flex-items on cross-axis and evenly spaces flex-items by 0.25rem */}
                <Link
                  href="/"
                  className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4"
                >Home Logo
                </Link>
                <Link
                  href="/workshop"
                  className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4"
                >PC Workshop
                </Link>
                <Link
                  href="/products"
                  className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4"
                >Products
                </Link>
                <Link
                  href="/guides"
                  className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4"
                >Guides
                </Link>
                <Link
                  href="/glossary"
                  className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4"
                >Glossary
                </Link>
                <Link
                  href="/generate"
                  className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4"
                >Generate PC
                </Link>
                <Link
                  href="/credits"
                  className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4"
                >Credits
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/account/login"
            className="focus-within:bg-slate-200 hover:bg-slate-50 border-2 rounded-xl p-4"
          >Account
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;