import React, { Suspense } from "react";

const Layout = ({ children }) => {
  return (
    <>
      <main className="dark:bg-black">
        <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
      </main>
    </>
  );
};

export default Layout;
