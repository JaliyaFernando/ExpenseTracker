package com.example.expensetracker.api.model;

public class RecurringTransaction extends Transaction {
    private String endDate;
    private String recurringEvery;
    private String note;

    public RecurringTransaction(int id, String description, double amount, String categoryId, String date,
                                String endDate, String recurringEvery, String note) {
        super(id, description, amount, categoryId, date);
        this.endDate = endDate;
        this.recurringEvery = recurringEvery;
        this.note = note;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getRecurringEvery() {
        return recurringEvery;
    }

    public void setRecurringEvery(String recurringEvery) {
        this.recurringEvery = recurringEvery;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
