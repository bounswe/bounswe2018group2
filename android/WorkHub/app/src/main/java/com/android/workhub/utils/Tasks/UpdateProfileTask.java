package com.android.workhub.utils.Tasks;

import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.models.UpdateProfileModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class UpdateProfileTask extends WorkHubRequester<SimpleMessageModel>{

    public UpdateProfileTask(WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getUpdateProfileUrl(), listener);
    }

    public void run(String token, UpdateProfileModel model) {
        postWithToken(token,model, SimpleMessageModel.class);
    }
}
