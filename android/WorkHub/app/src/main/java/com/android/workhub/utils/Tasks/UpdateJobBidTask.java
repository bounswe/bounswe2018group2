package com.android.workhub.utils.Tasks;

import com.android.workhub.models.JobBidModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.models.UpdateJobBidModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class UpdateJobBidTask extends WorkHubRequester<SimpleMessageModel> {
    public UpdateJobBidTask(WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getUpdateJobBidTaskUrl(),listener);
    }
    public void run(String token, UpdateJobBidModel updateJobBidModel) {
        postWithToken(token,updateJobBidModel,SimpleMessageModel.class);
    }
}
