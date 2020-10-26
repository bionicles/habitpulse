import Nav from "./nav.js";
function Layout({ user, setUser, children }) {
  return (
    <div className="h-screen w-screen">
      <Nav user={user} setUser={setUser} />
      {children}
    </div>
  );
}

export default Layout;
// <td class="border px-4 py-2 hover:bg-green-400 min-width-6">run</td>;
