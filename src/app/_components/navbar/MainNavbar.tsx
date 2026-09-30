import Logo from "./Logo";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import SupportInfo from "./SupportInfo";
import NavActions from "./NavActions";
import MobileNavDrawer from "./MobileNavDrawer";

export default function MainNavbar() {
  return (
    <div
      className="
        sticky
        top-0
        z-[9999]
        flex
        items-center
        justify-between
        border-b
        border-gray-200
        bg-white
        px-4
        py-2

        md:px-3
        md:py-2

        lg:px-36
        lg:py-2
      "
    >
      {/* Logo */}
      <div className="shrink-0">
        <Logo />
      </div>

      {/* Search */}
      <div
        className="
          hidden
          min-w-0
          flex-1
          md:flex
          md:px-3

          lg:px-4
        "
      >
        <SearchBar />
      </div>

      {/* Desktop navigation */}
      <nav
        aria-label="Main navigation"
        className="hidden shrink-0 lg:flex"
      >
        <NavLinks />
      </nav>

      {/* Support */}
      <div className="hidden shrink-0 md:block">
        <SupportInfo />
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center">
        <NavActions />
        <MobileNavDrawer />
      </div>
    </div>
  );
}