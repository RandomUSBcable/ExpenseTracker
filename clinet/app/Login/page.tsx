import Link from "next/link";

export default function Login() {
  return (
    <div className="main">
      <div className="Header"></div>
      <div className="Body">
        <div className="LoginHolder">
          <div className="Login">
            <div className="LoginAdmin">
              <Link href="./Admin">Admin</Link>
            </div>
            <div className="LoginUser">
              <Link href="./User">User</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="Footer">
        <ul className="FooterList">
          <li>HOME</li>
          <li>Log Out</li>
          <li>Back to top</li>
          <li>HELP</li>
        </ul>
      </div>
    </div>
  );
}
