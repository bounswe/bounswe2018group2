package com.android.workhub.models;

public class JobDetailReturnModel {
    private String msg;
    private JobDetailModel job;

    public JobDetailReturnModel(String msg, JobDetailModel job) {
        this.msg = msg;
        this.job = job;
    }
    public JobDetailReturnModel(){

    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public JobDetailModel getJob() {
        return job;
    }

    public void setJob(JobDetailModel job) {
        this.job = job;
    }
}
