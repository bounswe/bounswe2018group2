package com.android.workhub.utils.Tasks;

import com.android.workhub.models.CreateUpdateModel;
import com.android.workhub.models.RequestUpdateModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class RequestJobTask extends WorkHubRequester<SimpleMessageModel> {

    public RequestJobTask(WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getRequestUpdateUrl(), listener);
    }

    public void run(String token, RequestUpdateModel model) {
        postWithToken(token, model,SimpleMessageModel.class);
    }

}