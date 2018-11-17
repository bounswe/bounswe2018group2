package com.android.workhub.models;

public class GetAllJobsReturnModel {

    private String msg;
    private JobModel[] jobs;

    public GetAllJobsReturnModel() {

    }

    public GetAllJobsReturnModel(String msg, JobModel[] jobs) {
        this.msg = msg;
        this.jobs = jobs;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public JobModel[] getJobs() {
        return jobs;
    }

    public void setJobs(JobModel[] jobs) {
        this.jobs = jobs;
    }
}
