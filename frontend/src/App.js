import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { Segment, Sidebar } from 'semantic-ui-react';
import * as jsonexport from "jsonexport/dist";
import downloadCsv from 'download-csv';
import { Routes } from "./routes";
import API from './api'

// CSS
import './assets/css/App.css'

// pages
import Home from "./pages/Home";
import samplecompany from "./pages/samplecompany";
import analytics from "./pages/analytics";

// components
import NavTopBar from './components/nav/NavTopBar'
import NavSideBar from './components/nav/NavSideBar'

/**
 * @param {*} component Page component to be rendered
 * @param {*} rest Any optional props to be used into the page components
 * @returns React app component wrapped with NavSideBar & NavTopBar
 */
const RouteWithSidebar = ({ page: Page, ...rest }) => {
  const [sideBarVisible, setSidebarVisible] = useState(false);
  const [ticketList, setTicketList] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    tier: (JSON.parse(localStorage.getItem("filterOptions")) ? JSON.parse(localStorage.getItem("filterOptions")).tier : null),
    company: (JSON.parse(localStorage.getItem("filterOptions")) ? JSON.parse(localStorage.getItem("filterOptions")).company : null),
  });
  const [data, setData] = useState(null);
  const [logo, setLogo] = useState(null);
  const logoSelector = {
    arco: logo_arco,
    cbre: logo_cbre,
    cisco: logo_cisco,
    clark: logo_clark,
    crossland: logo_crossland,
    samplecompany: logo_samplecompany,
    lendlease: logo_lendlease,
    mayo: logo_mayo,
    ptc: logo_ptc,
    thirdparty: logo_thirdparty,
  }

  const initalize = async () => {
    let options = null;
    setData(null);

    if (localStorage.getItem("filterOptions")) {
      options = JSON.parse(localStorage.getItem("filterOptions"));
      setFilterOptions({
        tier: options.tier,
        company: options.company,
      })
    }
    else {
      options = {
        tier: null,
        company: null,
      }
      localStorage.setItem("filterOptions", JSON.stringify(options))
      setFilterOptions({
        tier: options.tier,
        company: options.company,
      })
    }
  }

  useEffect(async () => {

    // Initialize filter local storage and filter options
    await initalize();

    // Set the logo
    let company = (JSON.parse(localStorage.getItem("filterOptions")).company ? JSON.parse(localStorage.getItem("filterOptions")).company : null);
    setLogo((company ? logoSelector[`${company.toLowerCase()}`] : "")) 

     // Get the data
    if (filterOptions.company != null || JSON.parse(localStorage.getItem("filterOptions")).company != null) {
      
      await API.get(
        `logs/?company=${((filterOptions.company ? filterOptions.company : (JSON.parse(localStorage.getItem("filterOptions")).company ? JSON.parse(localStorage.getItem("filterOptions")).company : null))).replace(/ /g, "%20")}&offset=6`
      ).then(res => setData(res.data));

      await API.get(
        `tickets/?company=${((filterOptions.company ? filterOptions.company : (JSON.parse(localStorage.getItem("filterOptions")).company ? JSON.parse(localStorage.getItem("filterOptions")).company : null))).replace(/ /g, "%20")}`
      ).then(res => setTicketList(res.data));
    }

  }, [setData, setTicketList, setFilterOptions])

  const getSideBarFilterOptions = async (value) => {
    setData(null);
    setLogo(null);

    // Set filter
    setFilterOptions({
      tier: value.tier,
      company: value.company,
    })

    localStorage.setItem("filterOptions", JSON.stringify({
      tier: value.tier,
      company: value.company,
    }));

    if (value.company != "" && value.company != null && value.company != undefined) {

      // Get the data
      await API.get(
        `logs/?company=${(value.company.replace(/ /g, "%20"))}&offset=6`
      ).then(res => setData(res.data));

      await API.get(
        `tickets/?company=${(value.company.replace(/ /g, "%20"))}`
      ).then(res => setTicketList(res.data));

      // Set the logo
      let company = (JSON.parse(localStorage.getItem("filterOptions")).company ? JSON.parse(localStorage.getItem("filterOptions")).company : null);
      setLogo((company ? logoSelector[`${company.toLowerCase()}`] : ""))
    }
  }

  const exportDataToCSV = async (value) => {
    setData(null);
    setLogo(null);

    // Set filter
    setFilterOptions({
      tier: value.tier,
      company: value.company,
    })

    localStorage.setItem("filterOptions", JSON.stringify({
      tier: value.tier,
      company: value.company,
    }));

    if (value.company != "" && value.company != null && value.company != undefined) {
      // Get the data
      await API.get(
        `logs/?company=${(value.company.replace(/ /g, "%20"))}&offset=6`
      ).then(res => setData(res.data));

      await API.get(
        `tickets/?company=${(value.company.replace(/ /g, "%20"))}`
      ).then(res => setTicketList(res.data));

      var company = (JSON.parse(localStorage.getItem("filterOptions")).company ? JSON.parse(localStorage.getItem("filterOptions")).company : null);
    }
    jsonexport(data, function(err, csv){
      if (err) return console.error(err);
      var fs = require('browserify-fs');
      fs.writeFile(company + '.csv', csv, function() {
        downloadCsv(csv, 'company.csv');
      });
  });
  }

  const setSideBarState = (value) => {
    setSidebarVisible(value);
  };

  return (
    <Route {...rest} render={props => (
      <Sidebar.Pushable className="app" as={Segment}>
        <NavSideBar onSave={getSideBarFilterOptions} onExport={exportDataToCSV} isVisible={sideBarVisible} />
        <Sidebar.Pusher>
          <div style={{height: "100vh", overflow: "hidden"}}>
            <NavTopBar toggleSideBarState={setSideBarState} isVisible={sideBarVisible} />
            <Page tickets={ticketList} imageUri={logo} data={data} filter={filterOptions} {...props} />
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )}
    />
  );
};

/**
 * @returns Switch component for pages wrapped with NavSideBar & NavTopBar
 */
export default () => (
  <Switch>
    {/* pages */}
    <RouteWithSidebar exact path={Routes.Home.path} page={Home} />
    <RouteWithSidebar exact path={Routes.samplecompany.path} page={samplecompany} />
    <RouteWithSidebar exact path={Routes.analytics.path} page={analytics} />
  </Switch>
);