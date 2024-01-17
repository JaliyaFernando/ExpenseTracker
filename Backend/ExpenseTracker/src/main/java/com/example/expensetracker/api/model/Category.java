package com.example.expensetracker.api.model;

public class Category {
    private String categoryId;
    private String categoryName;
    private String categoryType;
    private float categoryBudget;

    public Category(String categoryId, String categoryName, String categoryType, float categoryBudget) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryType = categoryType;
        this.categoryBudget = categoryBudget;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryType() {
        return categoryType;
    }

    public void setCategoryType(String categoryType) {
        this.categoryType = categoryType;
    }

    public float getCategoryBudget() {
        return categoryBudget;
    }

    public void setCategoryBudget(float categoryBudget) {
        this.categoryBudget = categoryBudget;
    }
}

