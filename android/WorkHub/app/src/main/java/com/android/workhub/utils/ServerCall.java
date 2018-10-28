package com.android.workhub.utils;

import com.android.workhub.models.LoginModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.Tasks.LoginTask;
import com.android.workhub.utils.Tasks.SignUpTask;

public class ServerCall {
    public static void login(final Object model, final WorkHubServiceListener<SimpleMessageModel> listener) {


        LoginTask task = new LoginTask(model, listener);
        task.run(model);

    }

    public static void signUp(final Object model, final WorkHubServiceListener<SimpleMessageModel> listener) {

        SignUpTask task = new SignUpTask(model, listener);
        task.run(model);

    }
}
