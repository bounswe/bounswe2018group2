package com.android.workhub.models;

import java.util.ArrayList;

public class GetAllBidsReturnModel {
    private String msg;
    private BidModel[] bids;

    public GetAllBidsReturnModel(){

    }
    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public BidModel[] getBids() {
        return bids;
    }

    public void setBids(BidModel[] bids) {
        this.bids = bids;
    }
}
