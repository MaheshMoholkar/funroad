import React from "react";

function Footer() {
  return (
    <footer className="flex border-t justify-between font-medium p-6">
      <div className="flex item-center gap-2">
        <p>funroad, Inc. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
