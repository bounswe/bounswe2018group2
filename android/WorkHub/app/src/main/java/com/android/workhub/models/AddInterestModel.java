package com.android.workhub.models;

public class AddInterestModel {
    int[]categories;

    public AddInterestModel(int[] categories) {
        this.categories = categories;
    }

    public AddInterestModel() {
    }

    public int[] getCategories() {
        return categories;
    }

    public void setCategories(int[] categories) {
        this.categories = categories;
    }
}
