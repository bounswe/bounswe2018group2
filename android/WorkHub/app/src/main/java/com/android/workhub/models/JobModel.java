package com.android.workhub.models;

import java.util.Date;

public class JobModel {

    private int id;
    private String title;
    private String description;
    private Date dueTo;

    public JobModel(int id, String title, String description, Date dueTo) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueTo = dueTo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDueTo() {
        return dueTo;
    }

    public void setDueTo(Date dueTo) {
        this.dueTo = dueTo;
    }
}
