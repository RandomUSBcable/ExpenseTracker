import BillsContainer from "../components/BillsContainer";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

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
        <Dashboard />

        <div className="Bills">
          <div className="BillsSelector"></div>
          <BillsContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
}
