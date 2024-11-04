import React from "react";

const page = () => {
  return (
    <div>
      <h1>Dashboard Help Documentation</h1>

      <h2>Overview</h2>
      <p>
        Welcome to the Dashboard! This application provides a visual
        representation of billing data, allowing users to analyze costs by
        employee and category. You can choose between different chart types and
        filter data to gain insights into spending patterns.
      </p>

      <h2>Table of Contents</h2>
      <ul>
        <li>
          <a href="#getting-started">Getting Started</a>
        </li>
        <li>
          <a href="#navigating-the-dashboard">Navigating the Dashboard</a>
        </li>
        <li>
          <a href="#chart-types">Chart Types</a>
        </li>
        <li>
          <a href="#filtering-data">Filtering Data</a>
        </li>
        <li>
          <a href="#exporting-data">Exporting Data</a>
        </li>
        <li>
          <a href="#user-authentication">User Authentication</a>
        </li>
        <li>
          <a href="#customizing-your-dashboard">Customizing Your Dashboard</a>
        </li>
        <li>
          <a href="#notifications-and-alerts">Notifications and Alerts</a>
        </li>
        <li>
          <a href="#frequently-asked-questions-faq">
            Frequently Asked Questions (FAQ)
          </a>
        </li>
        <li>
          <a href="#contact-support">Contact Support</a>
        </li>
      </ul>

      <h2 id="getting-started">Getting Started</h2>
      <p>
        To get started, simply navigate to the Dashboard URL. Once the data is
        loaded, you will see the total costs and options to select different
        chart types.
      </p>

      <h2 id="navigating-the-dashboard">Navigating the Dashboard</h2>
      <p>The main components of the Dashboard include:</p>
      <ul>
        <li>
          <strong>Total Costs:</strong> Displays the total amount of all bills.
        </li>
        <li>
          <strong>Chart Selection:</strong> Buttons to switch between Pie Chart
          and Line Chart.
        </li>
        <li>
          <strong>Charts:</strong> Visual representation of the data based on
          your selection.
        </li>
        <li>
          <strong>Legends:</strong> Displays categories and totals for better
          understanding of the data.
        </li>
      </ul>

      <h2 id="chart-types">Chart Types</h2>
      <p>The Dashboard supports two types of charts:</p>
      <ul>
        <li>
          <strong>Pie Chart:</strong> Shows the distribution of costs across
          different categories. Hover over segments to see detailed information.
        </li>
        <li>
          <strong>Line Chart:</strong> Illustrates the total costs incurred by
          each employee over time. Hover over points to view specific values.
        </li>
      </ul>

      <h3>Switching Chart Types</h3>
      <p>
        To switch between chart types, click the corresponding button ("Pie
        Chart" or "Line Chart") located above the charts.
      </p>

      <h2 id="filtering-data">Filtering Data</h2>
      <h3>Date Range Filter</h3>
      <p>
        You can filter the data based on a specific date range to analyze costs
        during a certain period. To apply a filter:
      </p>
      <ol>
        <li>Click on the date range filter option (if available).</li>
        <li>Select your desired start and end dates.</li>
        <li>Click "Apply" to update the charts.</li>
      </ol>

      <h3>Employee and Category Filters</h3>
      <p>
        You can also filter data by specific employees or categories. Simply
        select the desired options
      </p>
    </div>
  );
};

export default page;
