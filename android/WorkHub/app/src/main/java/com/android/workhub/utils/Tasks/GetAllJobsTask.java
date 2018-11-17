package com.android.workhub.utils.Tasks;

import com.android.workhub.models.GetAllJobsReturnModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class GetAllJobsTask extends WorkHubRequester<GetAllJobsReturnModel> {

    public GetAllJobsTask(WorkHubServiceListener<GetAllJobsReturnModel> listener) {
        super(EndpointManager.getGetAllJobsUrl(),listener);
    }
    public void run() {
        get(GetAllJobsReturnModel.class);
    }
}
