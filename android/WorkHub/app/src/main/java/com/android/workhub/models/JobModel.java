package com.android.workhub.models;

import java.io.Serializable;
import java.util.Date;

public class JobModel{

    private int clientId;
    private String header;
    private String description;
    private Date dueDate;
    private int price;
    private int[] categories;

    public JobModel() {

    }

    public JobModel(int clientId, String header, String description, Date dueDate, int price, int[] categories) {
        this.clientId = clientId;
        this.header = header;
        this.description = description;
        this.dueDate = dueDate;
        this.price = price;
        this.categories = categories;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int[] getCategories() {
        return categories;
    }

    public void setCategories(int[] categories) {
        this.categories = categories;
    }
}
