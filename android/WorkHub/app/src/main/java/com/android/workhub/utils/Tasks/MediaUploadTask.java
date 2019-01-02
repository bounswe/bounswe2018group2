package com.android.workhub.utils.Tasks;

import com.android.workhub.models.GetMediaReturnModel;
import com.android.workhub.models.JobModel;
import com.android.workhub.models.LoginReturnModel;
import com.android.workhub.models.MediaModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class MediaUploadTask extends WorkHubRequester<GetMediaReturnModel> {

    public MediaUploadTask(WorkHubServiceListener<GetMediaReturnModel> listener) {
        super(EndpointManager.getMediaUploadUrl(), listener);
    }

    public void run(String token, MediaModel mediaModel) {
        postWithToken(token,mediaModel, GetMediaReturnModel.class);
    }

}
