package com.android.workhub.utils;

import android.content.Context;
import android.content.SharedPreferences;

import com.android.workhub.models.SimpleMessageModel;

public class Authentication {
    private static SharedPreferences sharedPreferences;

    public static void login(
            final String username,
            final String password,
            final WorkHubServiceListener<SimpleMessageModel> listener) {
        SimpleMessageModel simpleMessageModel = new SimpleMessageModel();
        simpleMessageModel.setMessage("success");
        listener.onSuccess(simpleMessageModel);
    }
}
