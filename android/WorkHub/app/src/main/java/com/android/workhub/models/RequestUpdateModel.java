package com.android.workhub.models;

public class RequestUpdateModel {
    int job_id;

    public RequestUpdateModel(int job_id) {
        this.job_id = job_id;
    }

    public RequestUpdateModel() {
    }

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }
}
