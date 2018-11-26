package com.android.workhub.models;

import java.util.Date;

public class JobDetailModel {
    private int id;
    private int client_id;
    private String header;
    private String description;
    private Date duedate;
    private int price;
    private int duration;
    private String bidding_status;
    private String createdAt;
    private String updatedAt;
    private UserModel Client;

    public JobDetailModel(){

    }

    public JobDetailModel(int id, int client_id, String header, String description, Date duedate, int price, int duration, String bidding_status, String createdAt, String updatedAt, UserModel client) {
        this.id = id;
        this.client_id = client_id;
        this.header = header;
        this.description = description;
        this.duedate = duedate;
        this.price = price;
        this.duration = duration;
        this.bidding_status = bidding_status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        Client = client;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getClient_id() {
        return client_id;
    }

    public void setClient_id(int client_id) {
        this.client_id = client_id;
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

    public Date getDuedate() {
        return duedate;
    }

    public void setDuedate(Date duedate) {
        this.duedate = duedate;
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

    public UserModel getClient() {
        return Client;
    }

    public void setClient(UserModel client) {
        Client = client;
    }
}
