import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import APIs from "../constants/APIs";

export default class Reports extends Component {
  constructor(props) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.state = {
      income: [],
      expenses: [],
      totalIncome: 0,
      totalExpenses: 0,
      totalAllocateBudget: 0,
      message: "",
      selectedMonth: "",
      selectedYear: "",
      categories: [],
      categoryId: "",
      balanceBudget: 0,
    };
    this.getCategories();
  }
  intialState = {
    income: [],
    expenses: [],
    totalIncome: 0,
    totalExpenses: 0,
    totalAllocateBudget: 0,
    balanceBudget: 0,
  };

  getCategories() {
    axios.get(APIs.CATEGORIES_BASE_URL).then(
      (response) => {
        if (response.data.length > 0) {
          this.setState(
            {
              categories: response.data,
            },
            () => {
              console.log("No of categories:", this.state.categories.length);
            }
          );
        } else {
          this.setState({
            message: "No categories at the moment",
          });
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          message: "No categories at the moment",
        });
      }
    );
  }

  onChangeCategoryId(e) {
    const selectedCategory = this.state.categories.find(
      (category) => category.categoryId === e.target.value
    );
    this.setState({
      totalAllocateBudget: selectedCategory.categoryBudget,
      categoryId: e.target.value,
      message: "",
    });
  }

  onView = () => {
    axios.get(APIs.TRANSACTIONS_BASE_URL).then(
      (response) => {
        if (response.data.length > 0) {
          this.setState(
            {
              transactions: response.data,
            },
            () => {
              axios.post(`${APIs.SUMMARY_BASE_URL}/all`, response.data).then(
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
              console.log(response.data);
            }
          );
        } else {
          this.setState({
            message: "No transactions at the moment",
          });
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          message: "No transactions at the moment",
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
    axios.get(APIs.TRANSACTIONS_BASE_URL).then(
      (response) => {
        if (response.data.length > 0) {
          axios
            .post(
              `${APIs.SUMMARY_BASE_URL}/byYearMonth?yearMonth=${yearMonth}`,
              response.data
            )
            .then(
              (response) => {
                if (
                  response.data.income.length !== 0 ||
                  response.data.expenses.length !== 0
                ) {
                  this.setState({
                    income: response.data.income,
                    expenses: response.data.expenses,
                    totalIncome: response.data.totalIncome,
                    totalExpenses: response.data.totalExpenses,
                    message: "",
                  });
                } else {
                  this.setState(this.intialState);
                  this.setState({
                    message: "Transactions not found",
                  });
                }
              },

              (error) => {
                this.setState({
                  message: "Report not found",
                });
              }
            );
        } else {
          this.setState({
            message: "No transactions at the moment",
          });
        }
      },
      (error) => {
        console.log(error);
        this.setState({
          message: "No transactions at the moment",
        });
      }
    );
  };

  onCategoryFilter = () => {
    axios
      .get(
        APIs.TRANSACTIONS_BASE_URL +
          APIs.transaction.CATEGORY +
          this.state.categoryId
      )
      .then(
        (response) => {
          if (response.data.length > 0) {
            axios.post(`${APIs.SUMMARY_BASE_URL}/all`, response.data).then(
              (response) => {
                console.log(response.data);
                if (response.data.length !== 0) {
                  this.setState({
                    income: response.data.income,
                    expenses: response.data.expenses,
                    totalIncome: response.data.totalIncome,
                    totalExpenses: response.data.totalExpenses,
                    balanceBudget:
                      this.state.totalAllocateBudget -
                      response.data.totalExpenses,
                    message: "",
                  });
                } else {
                  this.setState(this.intialState);
                  this.setState({
                    message: "Transactions not found",
                  });
                }
              },
              (error) => {
                console.log(error);
                this.setState({
                  message: "Report not found",
                });
              }
            );
            console.log(response.data);
          } else {
            this.setState({
              income: [],
              expenses: [],
              totalIncome: 0.0,
              totalExpenses: 0.0,
              message: "No transactions at the moment",
            });
          }
        },
        (error) => {
          console.log(error);
          this.setState({
            message: "No transactions at the moment",
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
        <div>
          <div className="customButtonsContainer">
            <Button className="buttonStyle" onClick={this.onFilter}>
              Transaction Filter with Month
            </Button>

            <Button className="buttonStyle" onClick={this.onView}>
              View Report
            </Button>

            <Button className="buttonStyle" onClick={this.onCategoryFilter}>
              Summary Filter with Month
            </Button>
          </div>

          <div className="Add_Record" align="left">
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

              <select
                id="categoryId"
                name="categoryId"
                value={this.state.categoryId}
                onChange={this.onChangeCategoryId}
                required={true}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {this.state.categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName + " - " + category.categoryType}
                  </option>
                ))}
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
                  <th width="200px" align="left">
                    Description
                  </th>
                  <th width="200px" align="left">
                    Amount
                  </th>
                  <th width="200px" align="left">
                    Date
                  </th>
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

        {this.state.totalAllocateBudget > 0 && (
          <div>
            <h3>Allocate Budget: {this.state.totalAllocateBudget}</h3>
          </div>
        )}
        {this.state.balanceBudget > 0 && (
          <div>
            <h3> Balance Budget: {this.state.balanceBudget}</h3>
          </div>
        )}
      </div>
    );
  }
}
