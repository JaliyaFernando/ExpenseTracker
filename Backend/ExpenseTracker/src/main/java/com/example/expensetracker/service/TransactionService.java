package com.example.expensetracker.service;

import com.example.expensetracker.api.model.RecurringTransaction;
import com.example.expensetracker.api.model.Transaction;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private List<Transaction> transactionList;

    public TransactionService(){
        transactionList = new ArrayList<>();
        Transaction transaction = new RecurringTransaction(1, "Monthly Rent Payment",1200.0,
                "E001","2024-01-01","2026-01-01","Month","Monthly Rent Payment");
        Transaction transaction2 = new Transaction(2, "Grocery Shopping",50.0,"E003","2024-01-15");
        transactionList.add(transaction);
        transactionList.add(transaction2);
    }
    public Optional<Transaction> getTransactionById(Integer id){
        Optional optional = Optional.empty();
        for(Transaction transaction:transactionList){
            if(id == transaction.getId()){
                optional = Optional.of(transaction);
                return optional;
            }
        }
        return optional;
    }

    public List<Transaction> getTransactionByCategory(String id){
        List<Transaction> transactionListByCategory = new ArrayList<>();
        for(Transaction transaction:transactionList){
            if (id.equals(transaction.getCategoryId())){
                transactionListByCategory.add(transaction);
            }
        }
        return transactionListByCategory;
    }

    public List<Transaction> getAllTransactions() {
        return new ArrayList<>(transactionList);
    }

    public List<Transaction> getRecentTransactions(Integer amount){
        List<Transaction> transactions = this.getAllTransactions();

        // Sort transactions by date using streams
        List<Transaction> sortedTransactions = transactions.stream()
                .sorted((t1, t2) -> t1.getDate().compareTo(t2.getDate()))
                .limit(amount)
                .collect(Collectors.toList());

        // Print sorted transactions
        for (Transaction transaction : sortedTransactions) {
            System.out.println("ID: " + transaction.getId() + ", Description: " + transaction.getDescription() +
                    ", Amount: " + transaction.getAmount() + ", Date: " + transaction.getDate());
        }
        return sortedTransactions;
    }

    public Transaction addTransaction(Transaction newTransaction) {
        // need to modify this logic
        int newTransactionId = transactionList.size() + 1;
        newTransaction.setId(newTransactionId);

        transactionList.add(newTransaction);

        return newTransaction;
    }

    // deleteTransaction
    public String deleteTransaction(Integer id) {
        boolean idFound = false;
        for (Transaction transaction: transactionList) {
            if (id.equals(transaction.getId())) {
                transactionList.remove(transaction);
                idFound = true;
                return "Successfully Removed!";
            }
        }
        if (!idFound) {
            return "Not Found!";
        }
        return "Delete Failed!";
    
    }
    
    // deleteTransaction by category
    public String deleteTransactionByCategory(String categoryId) {
        boolean idFound = false;
        for (Transaction transaction : transactionList) {
            if (categoryId.equals(transaction.getCategoryId())) {
                transactionList.remove(transaction);
                idFound = true;
                return "Successfully Removed!";
            }
        }
        if (!idFound) {
            return "Not Found!";
        }
        return "Delete Failed!";
    }
    
    // updateTransaction
    public String updateTransaction(Integer id, Transaction newTransaction) {
        boolean idFound = false;
        for (Transaction transaction: transactionList) {
            if (id.equals(transaction.getId())) {
                transaction.setDescription(newTransaction.getDescription());
                transaction.setAmount(newTransaction.getAmount());
                transaction.setDate(newTransaction.getDate());
                idFound = true;
                return "Successfully Updated!";
            }
        }
        if (!idFound) {
            return "Not Found!";
        }
        return "Update Failed!";
    }
    

}

