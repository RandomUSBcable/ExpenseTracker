import Link from "next/link";

export default function Home() {
  return (
    <div className="main">
      <div className="Header">User</div>
      <div className="Body">
        <div className="TimeSelector">
          <ul className="TimeSelectorOptions">
            {/*
              <li className="TimeSelectorOptionSingle">past 7 days</li>
              <li className="TimeSelectorOptionSingle">past 28 days</li>
              <li className="TimeSelectorOptionSingle">this week</li>
              <li className="TimeSelectorOptionSingle">this month</li>
              */}
          </ul>
        </div>
        <div className="Dashboard">
          <div className="Dashboard Total">100</div>
        </div>

        <div className="Bills">
          <div className="BillsSelector"></div>
          <ul className="BillsContainer">
            <li className="BillSingle">Bill 1</li>
            <li className="BillSingle">Bill 2</li>
            <li className="BillSingle">Bill 3</li>
            <li className="BillSingle">Bill 4</li>
            <li className="BillEntry"> Enter info</li>
          </ul>
        </div>
      </div>
      <div className="Footer">
        <ul className="FooterList">
          <li>
            <Link href="./Login">HOME</Link>
          </li>
          <li>
            <Link href="./Login">Log Out</Link>
          </li>
          <li>Back to top</li>
          <li>HELP</li>
        </ul>
      </div>
    </div>
  );
}
