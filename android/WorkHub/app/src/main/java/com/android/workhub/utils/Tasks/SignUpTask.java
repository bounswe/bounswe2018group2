package com.android.workhub.utils.Tasks;

import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class SignUpTask extends WorkHubRequester<SimpleMessageModel>{

    public SignUpTask(Object model, WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getSignUpUrl(), listener);
    }

    public void run(Object model) {
        post(model, SimpleMessageModel.class);
    }
}
