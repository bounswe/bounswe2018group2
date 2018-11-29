package com.android.workhub.models;

import com.android.workhub.utils.Tasks.SendNotificationTask;

public class SendNotificationModel {
    private int job_id;
    private String description;
    private String message_type;

    public SendNotificationModel(){

    }

    public SendNotificationModel(int job_id, String description, String message_type) {
        this.job_id = job_id;
        this.description = description;
        this.message_type = message_type;
    }

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMessage_type() {
        return message_type;
    }

    public void setMessage_type(String message_type) {
        this.message_type = message_type;
    }
}
