package com.android.workhub.models;

public class JobModel {

    private int id;
    private int client_id;
    private String header;
    private String description;
    private String duedate;
    private int price;
    private int duration;
    private String bidding_status;
    private String status;
    private String createdAt;
    private String updatedAt;
    private JobField[] Jobfields;
    private int[] categories;

    public JobModel() {

    }

    public JobModel(int id, int client_id, String header, String description, String duedate, int price, int duration, String bidding_status, JobField[] jobfields, String status) {
        this.id = id;
        this.client_id = client_id;
        this.header = header;
        this.description = description;
        this.duedate = duedate;
        this.price = price;
        this.duration = duration;
        this.bidding_status = bidding_status;
        this.Jobfields = jobfields;
        this.status = status;
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

    public String getDueDate() {
        return duedate;
    }

    public void setDueDate(String dueDate) {
        this.duedate = dueDate;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getBidding_status() {
        return bidding_status;
    }

    public void setBidding_status(String bidding_status) {
        this.bidding_status = bidding_status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getClientId() {
        return client_id;
    }

    public void setClientId(int clientId) {
        this.client_id = clientId;
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

    public JobField[] getJobfields() {
        return Jobfields;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;

    }

    public void setJobfields(JobField[] jobfields) {
        Jobfields = jobfields;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int[] getCategories() {
        return categories;
    }

    public void setCategories(int[] categories) {
        this.categories = categories;
    }
}


