package com.android.workhub.utils.Tasks;

import com.android.workhub.models.GetSelfReturnModel;
import com.android.workhub.models.JobDetailModel;
import com.android.workhub.models.JobDetailReturnModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class JobDetailTask extends WorkHubRequester<JobDetailReturnModel> {
    public JobDetailTask(int userId, WorkHubServiceListener<JobDetailReturnModel> listener) {
        super(EndpointManager.getJobDetails()+userId, listener);
    }

    public void run() {
        get(JobDetailReturnModel.class);
    }

}
