package com.android.workhub.utils.Tasks;

import com.android.workhub.models.LoginReturnModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class SendNotificationTask extends WorkHubRequester<SimpleMessageModel> {

    public SendNotificationTask(Object model, WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getNotificationUrl(), listener);
    }

    public void run(String token,Object model) {
        postWithToken(token,model,SimpleMessageModel.class);
    }

}
