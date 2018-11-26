package com.android.workhub.models;

import java.util.Date;

public class JobModel{

    private int id;
    private int clientId;
    private String header;
    private String description;
    private Date duedate;
    private int price;
    private int[] categories;
    private int duration;
    private String bidding;
    private String createdAt;
    private String updatedAt;

    public JobModel() {

    }


    public JobModel(int id, int clientId, String header, String description, Date dueDate, int price, int[] categories, int duration, String bidding, String createdAt, String updatedAt) {
        this.id = id;
        this.clientId = clientId;
        this.header = header;
        this.description = description;
        this.duedate = dueDate;
        this.price = price;
        this.categories = categories;
        this.duration = duration;
        this.bidding = bidding;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
        return duedate;
    }

    public void setDueDate(Date dueDate) {
        this.duedate = dueDate;
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

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getBidding() {
        return bidding;
    }

    public void setBidding(String bidding) {
        this.bidding = bidding;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
