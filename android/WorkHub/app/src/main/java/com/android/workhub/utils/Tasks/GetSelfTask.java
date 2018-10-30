package com.android.workhub.utils.Tasks;

import com.android.workhub.models.GetSelfReturnModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class GetSelfTask extends WorkHubRequester<GetSelfReturnModel> {

    public GetSelfTask(String token, WorkHubServiceListener<GetSelfReturnModel> listener) {
        super(EndpointManager.getGetSelfUrl(), listener);
    }

    public void run(String token) {
        get(token, GetSelfReturnModel.class);
    }

}
