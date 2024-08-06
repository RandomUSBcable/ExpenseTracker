import BillsContainer from "../components/BillsContainer";

export default function Home() {
  return (
    <div className="main">
      <div className="Header">Admin</div>
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
        <div className="Dashboard">DATA</div>

        <div className="Bills">
          <div className="BillsSelector"></div>

          <BillsContainer />
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
