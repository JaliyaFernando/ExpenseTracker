package com.example.expensetracker.api.model;

public class Transaction {
    private int id;
    private String description;
    private double amount;
    private String categoryId;
    private String date;

    public Transaction(int id, String description, double amount, String categoryId, String date) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.categoryId = categoryId;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isExpense() {
        return categoryId.startsWith("E");
    }

    public boolean isIncome() {
        return categoryId.startsWith("I");
    }
}
