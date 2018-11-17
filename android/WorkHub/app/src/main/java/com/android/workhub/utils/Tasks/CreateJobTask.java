package com.android.workhub.utils.Tasks;

import com.android.workhub.models.GetAllJobsReturnModel;
import com.android.workhub.models.JobModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class CreateJobTask extends WorkHubRequester<SimpleMessageModel> {

    public CreateJobTask(WorkHubServiceListener<SimpleMessageModel> listener) {
        super(EndpointManager.getCreateJobUrl(),listener);
    }
    public void run(JobModel jobModel) {
        post(jobModel,SimpleMessageModel.class);
    }
}
