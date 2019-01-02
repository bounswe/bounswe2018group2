package com.android.workhub.models;

public class RemoveInterestModel {
    int[]categories;

    public int[] getCategories() {
        return categories;
    }

    public void setCategories(int[] categories) {
        this.categories = categories;
    }

    public RemoveInterestModel(int[] categories) {
        this.categories = categories;
    }

    public RemoveInterestModel() {
    }
}
