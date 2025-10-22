import { UserMenu } from "./user-menu";

export const Header = () => {
  return (
    <header className="h-16 px-4 flex items-center justify-between w-full border-b">
      <img
        src="/tanstack-word-logo-white.svg"
        className="invert h-8 w-auto"
        alt="Logo"
      />

      <UserMenu />
    </header>
  );
};
