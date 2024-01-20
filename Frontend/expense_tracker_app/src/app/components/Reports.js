import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import APIs from "../constants/APIs";

export default class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      income: [],
      expenses: [],
      totalIncome: 0,
      totalExpenses: 0,
      message: "",
      selectedMonth: "",
      selectedYear: "", // New state property for selected year
    };
  }

  onView = () => {
    axios.get(`${APIs.SUMMARY_BASE_URL}/all`).then(
      (response) => {
        this.setState({
          income: response.data.income,
          expenses: response.data.expenses,
          totalIncome: response.data.totalIncome,
          totalExpenses: response.data.totalExpenses,
          message: "",
        });
      },
      (error) => {
        console.log(error);
        this.setState({
          message: "Report not found",
        });
      }
    );
  };

  onFilter = () => {
    const { selectedMonth, selectedYear } = this.state;

    if (selectedMonth.trim() === "" || selectedYear.trim() === "") {
      this.setState({
        income: [],
        expenses: [],
        totalIncome: 0,
        totalExpenses: 0,
      });
      this.setState({
        message: "Please enter a valid month and year.",
      });
      return;
    }

    const yearMonth = `${selectedYear}-${selectedMonth}`;

    axios
      .get(`${APIs.SUMMARY_BASE_URL}/byYearMonth?yearMonth=${yearMonth}`)
      .then(
        (response) => {
          this.setState({
            income: response.data.income,
            expenses: response.data.expenses,
            totalIncome: response.data.totalIncome,
            totalExpenses: response.data.totalExpenses,
            message: "",
          });
        },
        (error) => {
          this.setState({
            message: "Report not found",
          });
        }
      );
  };

  handleMonthChange = (event) => {
    this.setState({ selectedMonth: event.target.value });
  };

  render() {
    return (
      <div align="center">
        <h2>Reports</h2>
        <div className="my_workout">
          <div className="customButtonsContainer">
            <Button className="buttonStyle" onClick={this.onFilter}>
              Filter with Month
            </Button>

            <Button className="buttonStyle" onClick={this.onView}>
              View Report
            </Button>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <span>Select the date and year</span>

            <div className="d-flex">
              <select
                className="form-select"
                value={this.state.selectedMonth}
                onChange={(e) =>
                  this.setState({ selectedMonth: e.target.value })
                }
              >
                <option value="">Select Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>

              <select
                className="form-select ms-2"
                value={this.state.selectedYear}
                onChange={(e) =>
                  this.setState({ selectedYear: e.target.value })
                }
              >
                <option value="">Select Year</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
        </div>

        {this.state.message && (
          <h5 align="center" className="alert-warning">
            <i className="fa fa-warning"> {this.state.message}</i>
          </h5>
        )}

        {this.state.income.length > 0 && (
          <div>
            <h3>Income</h3>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "1px solid #dddddd",
                      borderRight: "1px solid #dddddd",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #dddddd",
                      borderRight: "1px solid #dddddd",
                    }}
                  >
                    Amount
                  </th>
                  <th style={{ borderBottom: "1px solid #dddddd" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.income.map((item) => (
                  <tr
                    key={item.id}
                    style={{ borderBottom: "1px solid #dddddd" }}
                  >
                    <td style={{ borderRight: "1px solid #dddddd" }}>
                      {item.description}
                    </td>
                    <td style={{ borderRight: "1px solid #dddddd" }}>
                      {item.amount}
                    </td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {this.state.expenses.length > 0 && (
          <div>
            <h3>Expenses</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.expenses.map((item) => (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {this.state.totalIncome > 0 && (
          <div>
            <h3>Total Income: {this.state.totalIncome}</h3>
          </div>
        )}

        {this.state.totalExpenses > 0 && (
          <div>
            <h3>Total Expenses: {this.state.totalExpenses}</h3>
          </div>
        )}
      </div>
    );
  }
}
