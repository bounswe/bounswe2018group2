package com.android.workhub.models;

public class JobBidModel {
    private int job_id;
    private int amount;
    private String description;
    public JobBidModel(){

    }

    public JobBidModel(int job_id, int amount, String description) {
        this.job_id = job_id;
        this.amount = amount;
        this.description = description;
    }

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
