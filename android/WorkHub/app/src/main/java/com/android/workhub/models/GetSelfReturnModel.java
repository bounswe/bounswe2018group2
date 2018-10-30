package com.android.workhub.models;

public class GetSelfReturnModel {

    private String firstName;
    private String lastName;
    private String desc;
    private String rating;

    public GetSelfReturnModel(String firstName, String lastName, String desc, String rating) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.desc = desc;
        this.rating = rating;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }
}
