package com.example.expensetracker.service;

import com.example.expensetracker.api.model.Category;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private List<Category> categoryList;

    private static int idCounter = 5;

    public CategoryService() {
        categoryList = new ArrayList<>();

        Category category1 = new Category("E1", "Groceries", "Expense", 500);
        Category category2 = new Category("I1", "Salary", "Income", 80000);
        Category category3 = new Category("E2", "Dining out", "Expense", 9000);
        Category category4 = new Category("E3", "Clothes", "Expense", 5000);
        Category category5 = new Category("E4", "Travel", "Expense", 10000);
        Category category6 = new Category("E5", "Sports", "Expense", 4500);

        categoryList.addAll(Arrays.asList(category1, category2, category3, category4, category5, category6));
    }

    public Optional<Category> getCategory(String id) {
        Optional<Category> optional = Optional.empty();
        for (Category category: categoryList) {
            if (id.equals(category.getCategoryId())){
                optional = Optional.of(category);
                return optional;
            }
        }
        return optional;
    }

    public List<Category> getAllCategories() {
        return categoryList;
    }

    public void addCategory(String name, String type, float budget) {
        String generatedId = "";
        if (type.equals("Expense")) {
            generatedId = "E" + generateUniqueNo();
        } else {
            generatedId = "I" + generateUniqueNo();
        }
        categoryList.add(new Category(generatedId, name, type, budget));
    }

    private synchronized int generateUniqueNo() {
        return ++idCounter;
    }

    public void deleteCategory(String id) {
        for (Category category: categoryList) {
            if (id.equals(category.getCategoryId())) {
                categoryList.remove(category);
            }
        }
    }

    public void updateCategory(String id, String name, String type, float budget) {
        for (Category category: categoryList) {
            if (id.equals(category.getCategoryId())) {
                category.setCategoryName(name);
                category.setCategoryType(type);
                category.setCategoryBudget(budget);
            }
        }
    }
}