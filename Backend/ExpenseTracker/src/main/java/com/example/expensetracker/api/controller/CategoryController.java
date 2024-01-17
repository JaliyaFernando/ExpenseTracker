package com.example.expensetracker.api.controller;

import com.example.expensetracker.api.model.Category;
import com.example.expensetracker.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/category")
    public Category getCategory(@RequestParam String id) {
        Optional category = categoryService.getCategory(id);
        if (category.isPresent()) {
            return (Category) category.get();
        }
        return null;
    }

    @GetMapping
    public List<Category> getCategoryList() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/addCategory")
    public Category addCategory(@RequestBody Category newCategory) {
        return categoryService.addCategory(newCategory);
    }

    @DeleteMapping("/deleteCategory")
    public void deleteCategory(String id) {
        categoryService.deleteCategory(id);
    }

    @PutMapping("/updateCategory")
    public String updateCategory(@RequestParam String id, @RequestBody Category newCategory) {
        return categoryService.updateCategory(id, newCategory);
    }

}
