package com.android.workhub.utils.Tasks;

import com.android.workhub.models.GetAllJobsReturnModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class GetSelfJobsTask extends WorkHubRequester<GetAllJobsReturnModel> {

    public GetSelfJobsTask(WorkHubServiceListener<GetAllJobsReturnModel> listener) {
        super(EndpointManager.getSelfJobs(), listener);
    }

    public void run(String token) {
        getWithToken(token, GetAllJobsReturnModel.class);
    }

}