package com.example.expensetracker.api.controller;

import com.example.expensetracker.api.model.RecurringTransaction;
import com.example.expensetracker.api.model.Transaction;
import com.example.expensetracker.service.TransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    private TransactionService transactionService;

    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }

    // Endpoint to get a single transaction by ID
    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable  Integer id){
        Optional transaction = transactionService.getTransactionById(id);
        if(transaction.isPresent()){
            return (Transaction) transaction.get();
        }
        return null;
    }

    // Endpoint to get all transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    // Endpoint to get recent  transactions
    @GetMapping("/recent/{amount}")
    public List<Transaction> getRecentTransactions(@PathVariable  Integer amount) {
        return transactionService.getRecentTransactions(amount);
    }

    // Endpoint to add a new transaction
    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction newTransaction) {
        return transactionService.addTransaction(newTransaction);
    }

    // Endpoint to add a new recurringTransaction
    @PostMapping("/recurring")
    public Transaction addRecurringTransaction(@RequestBody RecurringTransaction  newTransaction) {
        return transactionService.addTransaction(newTransaction);
    }
    
    // Endpoint to update a transaction
    @PutMapping("/updateTransaction")
    public String updateTransaction(@RequestParam Integer id, @RequestBody Transaction newTransaction) {
        return transactionService.updateTransaction(id, newTransaction);
    }

    @PutMapping("/updateTransaction/recurring")
    public String updateTransaction(@RequestParam Integer id, @RequestBody RecurringTransaction newTransaction) {
        return transactionService.updateTransaction(id, newTransaction);
    }

    // Endpoint to delete a transaction
    @DeleteMapping("/deleteTransaction")
    public String deleteTransaction(Integer id) {
        return transactionService.deleteTransaction(id);
    }
    
    // Endpoint to delete a transaction by category
    @DeleteMapping("/deleteTransactionByCategory")
    public String deleteTransactionByCategory(String categoryId) {
       return transactionService.deleteTransactionByCategory(categoryId);
    }
}
