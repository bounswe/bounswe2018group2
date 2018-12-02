package com.android.workhub.models;

public class UpdateProfileModel {

    private String firstName;
    private String lastName;
    private String description;
    private String type;

    public UpdateProfileModel() {
    }

    public UpdateProfileModel(String firstName, String lastName, String description, String type) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
