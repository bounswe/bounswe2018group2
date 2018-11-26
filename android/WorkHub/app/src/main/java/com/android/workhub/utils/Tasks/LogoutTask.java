package com.android.workhub.utils.Tasks;

import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class LogoutTask extends WorkHubRequester<SimpleMessageModel>{
    public LogoutTask(String token, WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getLogoutUrl(), listener);
    }

    public void run(String token) {
        postToken(token, SimpleMessageModel.class);
    }
}
