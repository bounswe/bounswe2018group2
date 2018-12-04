package com.android.workhub.utils.Tasks;

import com.android.workhub.models.PostBidModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class RejectBidTask extends WorkHubRequester<SimpleMessageModel> {

    public RejectBidTask(WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getRejectBidUrl(),listener);
    }
    public void run(String token, PostBidModel model) {
        postWithToken(token,model,SimpleMessageModel.class);
    }
}
