package com.example.expensetracker.api.controller;

import com.example.expensetracker.api.model.Transaction;
import com.example.expensetracker.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/summary")
public class SummaryController {

    @Autowired
    private SummaryService summaryService;
    @GetMapping("/all")
    public Map<String, Object> getAllSummary() {
        List<Transaction> allSummary = summaryService.getAllSummary();

        Map<String, Object> result = new HashMap<>();
        result.put("expenses", allSummary.stream()
                .filter(Transaction::isExpense)
                .peek(summary -> summary.setDescription("Expenses - " + summary.getDescription()))
                .collect(Collectors.toList()));

        result.put("income", allSummary.stream()
                .filter(Transaction::isIncome)
                .peek(summary -> summary.setDescription("Income - " + summary.getDescription()))
                .collect(Collectors.toList()));

        double totalExpenses = allSummary.stream()
                .filter(Transaction::isExpense)
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalIncome = allSummary.stream()
                .filter(Transaction::isIncome)
                .mapToDouble(Transaction::getAmount)
                .sum();
        result.put("totalIncome", totalIncome);
        result.put("totalExpenses", totalExpenses);

        return result;
    }

    @GetMapping("/byYearMonth")
    public Map<String, Object> getSummaryByYearMonth(@RequestParam(name = "yearMonth") String yearMonth) {
        List<Transaction> allSummary = summaryService.getAllSummary();

        Map<String, Object> result = new HashMap<>();

        // Filter expenses for the specified year and month
        List<Transaction> expenses = allSummary.stream()
                .filter(Transaction::isExpense)
                .filter(transaction -> isTransactionInYearMonth(transaction, yearMonth))
                .peek(summary -> summary.setDescription("Expenses - " + summary.getDescription()))
                .collect(Collectors.toList());
        result.put("expenses", expenses);

        // Filter income for the specified year and month
        List<Transaction> income = allSummary.stream()
                .filter(Transaction::isIncome)
                .filter(transaction -> isTransactionInYearMonth(transaction, yearMonth))
                .peek(summary -> summary.setDescription("Income - " + summary.getDescription()))
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
