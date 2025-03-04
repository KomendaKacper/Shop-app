export default function NoAccess() {

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <h1 className="text-4xl font-bold">Error 403</h1>
      <p className="text-xl font-semibold">Oops! You do not have permission to access this page.</p>
      <p className="text-l font-semibold"><a href="/">Click here to go back to the homepage</a></p>
    </div>
  );
}