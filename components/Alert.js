import Link from "next/link";
import React, { useState } from "react";
export default function Alert({ title, body }) {
  return (
    <div
      className="p-3 m-5 text-red-500 bg-red-50 rounded-md fixed left-0 top-10"
    >
      <p>
        <span className="font-bold">{title}</span>
        <span>{body}</span>
      </p>
    </div>
  );
}
