package com.android.workhub.models;

public class CreateUpdateModel {
    private int job_id;
    private String type;

    public CreateUpdateModel(int job_id, String type) {
        this.job_id = job_id;
        this.type = type;
    }

    public CreateUpdateModel() {
    }

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
