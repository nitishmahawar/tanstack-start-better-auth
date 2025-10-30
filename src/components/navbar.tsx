import { UserMenu } from "./user-menu";

export const Navbar = () => {
  return (
    <header className="h-16 px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between w-full border-b">
      <img
        src="/tanstack-word-logo-white.svg"
        className="invert h-8 w-auto"
        alt="Logo"
      />

      <UserMenu />
    </header>
  );
};
