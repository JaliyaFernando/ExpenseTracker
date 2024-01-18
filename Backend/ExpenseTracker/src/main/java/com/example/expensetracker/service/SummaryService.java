package com.example.expensetracker.service;

import com.example.expensetracker.api.model.RecurringTransaction;
import com.example.expensetracker.api.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SummaryService {

    private final List<Transaction> transactionList;

    public SummaryService() {
        transactionList = new ArrayList<>();
        RecurringTransaction transaction1 = new RecurringTransaction(1, "Monthly Rent Payment", 1200.0,
                "E001", "2024-01-01", "2026-02-01", "Month", "Monthly Rent Payment");
        Transaction transaction2 = new Transaction(2, "Grocery Shopping", 50.0, "E003", "2024-01-15");
        Transaction transaction3 = new Transaction(3, "Salary", 2000.0, "I003", "2024-02-15");
        Transaction transaction4 = new Transaction(4, "Investment", 1000.0, "I004", "2024-01-15");

        transactionList.add(transaction1);
        transactionList.add(transaction2);
        transactionList.add(transaction3);
        transactionList.add(transaction4);
    }

    public List<Transaction> getAllSummary() {
        return transactionList;
    }
}
