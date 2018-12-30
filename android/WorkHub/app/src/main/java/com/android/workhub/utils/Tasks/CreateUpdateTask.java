package com.android.workhub.utils.Tasks;

import com.android.workhub.models.CreateUpdateModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class CreateUpdateTask extends WorkHubRequester<SimpleMessageModel> {

    public CreateUpdateTask(WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getCreateUpdateUrl(), listener);
    }

    public void run(String token, CreateUpdateModel model) {
        postWithToken(token, model,SimpleMessageModel.class);
    }

}

