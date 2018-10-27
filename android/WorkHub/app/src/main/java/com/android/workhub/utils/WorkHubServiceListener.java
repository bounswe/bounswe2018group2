package com.android.workhub.utils;

public interface WorkHubServiceListener<T> {
    void onSuccess(T data);

    void onFailure(Exception e);
}
