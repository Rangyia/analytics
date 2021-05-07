import React, { useState, useEffect } from "react";
import { Menu, Sidebar, Dropdown, Header } from "semantic-ui-react";
import API from "../../api";
import dateUtils from "../../utils/dateUtils"

// css
import '../../assets/css/components/main/NavSideBar.css'

/**
 * @param {props} props [IsVisible, FilterPageMetrics]
 * @returns Sidebar component for filtering page metrics
 */
export default function NavSideBar(props) {

    const [companies, setCompanies] = useState(null);
    const [filteredCompanies, setFilteredCompanies] = useState(null);
    const [filterOptions, setFilterOptions] = useState({
        "tier": null,
        "company": null,
        "date": dateUtils.formatDate(new Date()),
    });
    const [selectedTier, setSelectedTier] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const tiers = [
        { key: 1, text: "Tier 1", value: 1 },
        { key: 2, text: "Tier 2", value: 2 },
        { key: 3, text: "Tier 3", value: 3 }
    ];

    useEffect(async () => {
        await API.get("companies").then(res => {
            setCompanies(res.data)
            setFilteredCompanies(res.data)
        });
    }, [setSelectedCompany, setFilteredCompanies]);
    
    const handleSelectedTier = async (e) => {
        setSelectedTier(e.target.id);
        filterOptions["tier"] = e.target.id;
        setFilterOptions(filterOptions)
        setFilteredCompanies(companies.filter((company) => Number.parseInt(company.tier) === Number.parseInt(e.target.id)))
    }

    const handleSelectedCompany = (e) => {
        setSelectedCompany(e.target.id);
        filterOptions["company"] = e.target.id;
        setFilterOptions(filterOptions)
    }

    const handleSelectedDate = (e) => {
        let { value } = e.target;
        let now = new Date();
        let selection = new Date(value);
        if (selection > now) {
            filterOptions["date"] = ((now.getMonth() + 1) + "-" + (now.getDate()) + "-" + now.getFullYear());
        } else {
            filterOptions["date"] = value;
        }
        setFilterOptions(filterOptions);
    }

    return (
        <Sidebar
            className="navSideBar"
            as={Menu}
            animation="slide out"
            icon="labeled"
            inverted
            vertical
            visible={props.isVisible}
            width="wide"
        >
            <Header style={{color: "white", paddingTop:"25px", textAlign:"center"}}>Filter Company Dashboard</Header>
            <Menu.Item style={{ marginTop: "20%" }}>
                <Dropdown
                    className="dropdownSidebar"
                    fluid
                    selection
                    text={tiers[selectedTier - 1] ? tiers[selectedTier - 1].text : "Tier"}
                >
                    <Dropdown.Menu className="dropdownItem">
                        {tiers ? tiers.map(tier => (
                            <Dropdown.Item id={tier.value} onClick={handleSelectedTier} text={tier.text} />
                        )) : <Dropdown.Item text="Tiers not found" />}
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
            <Menu.Item style={{ marginTop: "20%" }}>
                <Dropdown
                    className="dropdownSidebar"
                    fluid
                    selection
                    text={selectedCompany ? selectedCompany : "Company"}
                >
                    <Dropdown.Menu className="dropdownItem">
                        {filteredCompanies ? filteredCompanies.map(company => (
                            <Dropdown.Item key={company.name.toLowerCase()} id={company.name} onClick={handleSelectedCompany} text={company.name} />
                        )) : <Dropdown.Item text="Companies not found" />}
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
            <Menu.Item className="sidebar-btn" onClick={() => props.onSave(filterOptions)} style={{ margin: 0, width: "100", position: "fixed", bottom: 0, display: "inline"}}>
                <h3 className="sidebar-btn">Save</h3>
            </Menu.Item>
            <Menu.Item className="sidebar-btn" onClick={() => props.onExport(filterOptions)} style={{ margin: 0, width: "100", position: "fixed", bottom: 0}}>
                <h3 className="sidebar-btn">Export</h3>
            </Menu.Item>
            
        </Sidebar>
    )
}
