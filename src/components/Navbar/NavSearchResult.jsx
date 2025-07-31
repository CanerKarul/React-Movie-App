export default function NavSearchResult({ total_results }) {
  return (
    <div className="col-4 text-end">
      <strong>{total_results} </strong> kayıt bulundu.
    </div>
  );
}
