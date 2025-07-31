export default function Pagination({
  NextPage,
  PreviousPage,
  currentPage,
  totalPages,
}) {
  return (
    <nav>
      <ul className="pagination d-flex justify-content-between">
        <li className={currentPage != 1 ? "page-item" : "page-item disabled"}>
          <a href="#" className="page-link" onClick={PreviousPage}>
            Geri
          </a>
        </li>
        <li
          className={
            currentPage < totalPages ? "page-item" : "page-item disabled"
          }
        >
          <a href="#" className="page-link" onClick={NextPage}>
            İleri
          </a>
        </li>
      </ul>
    </nav>
  );
}
