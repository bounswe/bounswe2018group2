package com.android.workhub.models;

public class GetMediaReturnModel {
    private String msg;
    private String url;

    public GetMediaReturnModel(String msg, String url) {
        this.msg = msg;
        this.url = url;
    }

    public GetMediaReturnModel() {
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
