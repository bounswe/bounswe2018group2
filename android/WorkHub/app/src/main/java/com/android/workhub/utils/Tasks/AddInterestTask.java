package com.android.workhub.utils.Tasks;

import com.android.workhub.models.AddInterestModel;
import com.android.workhub.models.JobBidModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.models.UpdateJobBidModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class AddInterestTask extends WorkHubRequester<SimpleMessageModel> {
    public AddInterestTask(WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getAddInterestUrl(),listener);
    }
    public void run(String token, AddInterestModel addInterestModel) {
        postWithToken(token,addInterestModel,SimpleMessageModel.class);
    }
}
