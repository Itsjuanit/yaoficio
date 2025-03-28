import React from "react";

export default function PaginationNav1({ pageIndex, pageCount, gotoPage, canPreviousPage, canNextPage }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="list-style-none flex">
        <li>
          <button
            onClick={() => gotoPage(pageIndex - 1)}
            disabled={!canPreviousPage}
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white mr-2"
          >
            Anterior
          </button>
        </li>
        {Array.from({ length: pageCount }).map((_, i) => (
          <li key={i} aria-current={i === pageIndex ? "page" : undefined}>
            <button
              onClick={() => gotoPage(i)}
              className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 ${
                i === pageIndex
                  ? "text-neutral-600 font-bold"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => gotoPage(pageIndex + 1)}
            disabled={!canNextPage}
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white ml-2"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
}
