package com.android.workhub.utils.Tasks;

import com.android.workhub.models.GetAllJobsReturnModel;
import com.android.workhub.models.GetCategoriesReturnModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class GetCategoriesTask extends WorkHubRequester<GetCategoriesReturnModel> {

    public GetCategoriesTask(WorkHubServiceListener<GetCategoriesReturnModel> listener) {
        super(EndpointManager.getCategoriesUrl(),listener);
    }
    public void run() {
        get(GetCategoriesReturnModel.class);
    }
}
