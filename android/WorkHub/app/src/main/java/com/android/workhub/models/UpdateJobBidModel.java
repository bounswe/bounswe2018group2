package com.android.workhub.models;

public class UpdateJobBidModel {
    private int bid_id;
    private int new_amount;
    private String new_description;
    public UpdateJobBidModel(){

    }

    public UpdateJobBidModel(int bid_id, int new_amount, String new_description) {
        this.bid_id = bid_id;
        this.new_amount = new_amount;
        this.new_description = new_description;
    }

    public int getBid_id() {
        return bid_id;
    }

    public void setBid_id(int bid_id) {
        this.bid_id = bid_id;
    }

    public int getNew_amount() {
        return new_amount;
    }

    public void setNew_amount(int new_amount) {
        this.new_amount = new_amount;
    }

    public String getNew_description() {
        return new_description;
    }

    public void setNew_description(String new_description) {
        this.new_description = new_description;
    }
}
