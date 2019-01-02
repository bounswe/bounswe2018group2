package com.android.workhub.utils.Tasks;

import com.android.workhub.models.AddInterestModel;
import com.android.workhub.models.JobBidModel;
import com.android.workhub.models.RemoveInterestModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.models.UpdateJobBidModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class RemoveInterestTask extends WorkHubRequester<SimpleMessageModel> {
    public RemoveInterestTask(WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getRemoveInterestUrl(),listener);
    }
    public void run(String token, RemoveInterestModel removeInterestModel) {
        postWithToken(token,removeInterestModel,SimpleMessageModel.class);
    }
}
