package com.android.workhub.utils.Tasks;

import com.android.workhub.models.JobBidModel;
import com.android.workhub.models.JobModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class CreateJobBidTask extends WorkHubRequester<SimpleMessageModel> {

    public CreateJobBidTask(WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getCreateJobBidUrl(),listener);
    }
    public void run(String token, JobBidModel jobBidModel) {
        postWithToken(token,jobBidModel,SimpleMessageModel.class);
    }
}
