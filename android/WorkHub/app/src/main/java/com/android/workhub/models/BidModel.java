package com.android.workhub.models;

public class BidModel {
    private int id;
    private int job_id;
    private int freelancer_id;
    private int amount;
    private String status;
    private String description;
    private String createdAt;
    private String updatedAt;
    private UserModel Freelancer;


    public BidModel(){}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }

    public int getFreelancer_id() {
        return freelancer_id;
    }

    public void setFreelancer_id(int freelancer_id) {
        this.freelancer_id = freelancer_id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public UserModel getFreelancer() {
        return Freelancer;
    }

    public void setFreelancer(UserModel freelancer) {
        Freelancer = freelancer;
    }
}
