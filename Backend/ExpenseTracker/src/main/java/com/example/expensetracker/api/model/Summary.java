package com.example.expensetracker.api.model;

public class Summary {
    private int id;
    private String description;
    private double amount;
    private String type;
    private String code;
    private String date;

    // Constructors, getters, and setters

    public Summary(int id, String description, double amount, String type, String code, String date) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.code = code;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public double getAmount() {
        return amount;
    }

    public String getType() {
        return type;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCode() {
        return code;
    }

    public String getDate() {
        return date;
    }

    public boolean isExpense() {
        return type.startsWith("E");
    }

    public boolean isIncome() {
        return type.startsWith("I");
    }
}
