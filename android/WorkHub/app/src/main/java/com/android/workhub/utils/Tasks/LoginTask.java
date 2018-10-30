package com.android.workhub.utils.Tasks;

import com.android.workhub.models.LoginModel;
import com.android.workhub.models.LoginReturnModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.EndpointManager;
import com.android.workhub.utils.WorkHubRequester;
import com.android.workhub.utils.WorkHubServiceListener;

public class LoginTask extends WorkHubRequester<LoginReturnModel> {


        public LoginTask(Object model, WorkHubServiceListener<LoginReturnModel> listener) {
            super(EndpointManager.getLoginUrl(), listener);
        }

        public void run(Object model) {
            post(model, LoginReturnModel.class);
        }

}
