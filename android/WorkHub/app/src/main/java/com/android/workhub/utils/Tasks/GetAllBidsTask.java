package com.android.workhub.utils.Tasks;

import com.android.workhub.models.GetAllBidsReturnModel;
import com.android.workhub.models.GetAllJobsReturnModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class GetAllBidsTask extends WorkHubRequester<GetAllBidsReturnModel> {
    public GetAllBidsTask(int job_id,WorkHubServiceListener<GetAllBidsReturnModel> listener) {
        super(EndpointManager.getGetAllBidUrl()+ job_id,listener);
    }
    public void run(String token) {
        getWithToken(token,GetAllBidsReturnModel.class);
    }
}
