package com.android.workhub.models;

public class GetCategoriesReturnModel {
    private CategoryModel[] categories;
    private String msg;

    public GetCategoriesReturnModel(CategoryModel[] categories, String msg) {
        this.categories = categories;
        this.msg = msg;
    }

    public GetCategoriesReturnModel() {
    }

    public CategoryModel[] getCategories() {
        return categories;
    }

    public void setCategories(CategoryModel[] categories) {
        this.categories = categories;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
