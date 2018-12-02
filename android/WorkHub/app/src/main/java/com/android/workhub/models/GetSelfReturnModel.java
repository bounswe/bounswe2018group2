package com.android.workhub.models;

public class GetSelfReturnModel {

    private String firstName;
    private String lastName;
    private String description;
    private String rating;
    private String type;

    public GetSelfReturnModel(String firstName, String lastName, String description, String rating, String type) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
        this.rating = rating;
        this.type = type;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
