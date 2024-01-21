package com.example.expensetracker.api.controller;

import com.example.expensetracker.api.model.Transaction;
import com.example.expensetracker.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/summary")
public class SummaryController {

    @Autowired
    private SummaryService summaryService;
    @PostMapping("/all")
    public Map<String, Object> getAllSummary(@RequestBody List<Transaction> transactions) {
        Map<String, Object> result = new HashMap<>();

        List<Transaction> expenseTransactions = transactions.stream()
                .filter(Transaction::isExpense)
                .peek(summary -> summary.setDescription(summary.getDescription()))
                .collect(Collectors.toList());

        List<Transaction> incomeTransactions = transactions.stream()
                .filter(Transaction::isIncome)
                .peek(summary -> summary.setDescription(summary.getDescription()))
                .collect(Collectors.toList());

        double totalExpenses = expenseTransactions.stream()
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalIncome = incomeTransactions.stream()
                .mapToDouble(Transaction::getAmount)
                .sum();

        result.put("expenses", expenseTransactions);
        result.put("income", incomeTransactions);
        result.put("totalIncome", totalIncome);
        result.put("totalExpenses", totalExpenses);

        return result;
    }

    @PostMapping("/byYearMonth")
    public Map<String, Object> getSummaryByYearMonth(
            @RequestParam(name = "yearMonth") String yearMonth,
            @RequestBody List<Transaction> transactions) {

        Map<String, Object> result = new HashMap<>();

        // Filter expenses for the specified year and month
        List<Transaction> expenses = transactions.stream()
                .filter(Transaction::isExpense)
                .filter(transaction -> isTransactionInYearMonth(transaction, yearMonth))
                .peek(summary -> summary.setDescription(summary.getDescription()))
                .collect(Collectors.toList());
        result.put("expenses", expenses);

        // Filter income for the specified year and month
        List<Transaction> income = transactions.stream()
                .filter(Transaction::isIncome)
                .filter(transaction -> isTransactionInYearMonth(transaction, yearMonth))
                .peek(summary -> summary.setDescription(summary.getDescription()))
                .collect(Collectors.toList());
        result.put("income", income);

        double totalExpenses = expenses.stream()
                .mapToDouble(Transaction::getAmount)
                .sum();
        result.put("totalExpenses", totalExpenses);

        double totalIncome = income.stream()
                .mapToDouble(Transaction::getAmount)
                .sum();
        result.put("totalIncome", totalIncome);

        return result;
    }

    private boolean isTransactionInYearMonth(Transaction transaction, String targetYearMonth) {
        // Assuming the date format in the transaction is "yyyy-MM-dd"
        String transactionYearMonth = transaction.getDate().substring(0, 7);
        return transactionYearMonth.equals(targetYearMonth);
    }


}
