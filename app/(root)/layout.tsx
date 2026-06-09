import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <h2 className="text-primary-100">PrepNOVA Interview</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;