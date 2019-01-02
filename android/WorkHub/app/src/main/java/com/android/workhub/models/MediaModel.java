package com.android.workhub.models;

public class MediaModel {
    private String key;
    private String file;

    public MediaModel(String key, String file) {
        this.key = key;
        this.file = file;
    }

    public MediaModel() {
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }
}
