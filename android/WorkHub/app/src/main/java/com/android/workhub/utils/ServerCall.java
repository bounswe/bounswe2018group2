package com.android.workhub.utils;

import com.android.workhub.models.CreateUpdateModel;
import com.android.workhub.models.GetAllBidsReturnModel;
import com.android.workhub.models.GetAllJobsReturnModel;
import com.android.workhub.models.GetSelfReturnModel;
import com.android.workhub.models.JobBidModel;
import com.android.workhub.models.JobDetailModel;
import com.android.workhub.models.JobDetailReturnModel;
import com.android.workhub.models.JobModel;
import com.android.workhub.models.LoginModel;
import com.android.workhub.models.LoginReturnModel;
import com.android.workhub.models.PostBidModel;
import com.android.workhub.models.RequestUpdateModel;
import com.android.workhub.models.SendNotificationModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.models.UpdateJobBidModel;
import com.android.workhub.models.UpdateProfileModel;
import com.android.workhub.utils.Tasks.AcceptBidTask;
import com.android.workhub.utils.Tasks.CreateJobBidTask;
import com.android.workhub.utils.Tasks.CreateJobTask;
import com.android.workhub.utils.Tasks.CreateUpdateTask;
import com.android.workhub.utils.Tasks.GetAllBidsTask;
import com.android.workhub.utils.Tasks.GetAllJobsTask;
import com.android.workhub.utils.Tasks.GetSelfJobsTask;
import com.android.workhub.utils.Tasks.GetSelfTask;
import com.android.workhub.utils.Tasks.JobDetailTask;
import com.android.workhub.utils.Tasks.LoginTask;
import com.android.workhub.utils.Tasks.LogoutTask;
import com.android.workhub.utils.Tasks.RejectBidTask;
import com.android.workhub.utils.Tasks.RequestJobTask;
import com.android.workhub.utils.Tasks.SendNotificationTask;
import com.android.workhub.utils.Tasks.SignUpTask;
import com.android.workhub.utils.Tasks.UpdateJobBidTask;
import com.android.workhub.utils.Tasks.UpdateProfileTask;

public class ServerCall {
    public static void login(final Object model, final WorkHubServiceListener<LoginReturnModel> listener) {


        LoginTask task = new LoginTask(model, listener);
        task.run(model);

    }

    public static void signUp(final Object model, final WorkHubServiceListener<SimpleMessageModel> listener) {

        SignUpTask task = new SignUpTask(model, listener);
        task.run(model);

    }

    public static void getSelf(final String token,final WorkHubServiceListener<GetSelfReturnModel> listener) {

        GetSelfTask task = new GetSelfTask(token, listener);
        task.run(token);

    }
    public static void logout(final String token,final WorkHubServiceListener<SimpleMessageModel> listener) {

        LogoutTask task = new LogoutTask(token, listener);
        task.run(token);
    }

    public static void getAllJobs(final WorkHubServiceListener<GetAllJobsReturnModel> listener){
        GetAllJobsTask task = new GetAllJobsTask(listener);
        task.run();

    }
    public static void createJob(String token,JobModel jobModel, final WorkHubServiceListener<SimpleMessageModel> listener){
        CreateJobTask task =new CreateJobTask(listener);
        task.run(token,jobModel);
    }
    public static void getJobDetail(int jobId, final WorkHubServiceListener<JobDetailReturnModel> listener){
        JobDetailTask task = new JobDetailTask(jobId,listener);
        task.run();
    }
    public static void sendNotification(String token, SendNotificationModel model,final WorkHubServiceListener<SimpleMessageModel> listener){
        SendNotificationTask task = new SendNotificationTask(model,listener);
        task.run(token,model);
    }
    public static void updateProfile(String token, UpdateProfileModel model, final WorkHubServiceListener<SimpleMessageModel> listener){
        UpdateProfileTask task = new UpdateProfileTask(listener);
        task.run(token,model);
    }
    public static void createJobBid(String token, JobBidModel model,final WorkHubServiceListener<SimpleMessageModel> listener){
        CreateJobBidTask task =new CreateJobBidTask(listener);
        task.run(token,model);
    }
    public static void updateJobBid(String token, UpdateJobBidModel model , final WorkHubServiceListener<SimpleMessageModel> listener){
        UpdateJobBidTask task = new UpdateJobBidTask(listener);
        task.run(token,model);
    }
    public static void getAllBids(String token, int job_id, final WorkHubServiceListener<GetAllBidsReturnModel> listener){
        GetAllBidsTask task = new GetAllBidsTask(job_id,listener);
        task.run(token);
    }
    public static void acceptBid(String token, PostBidModel model, final WorkHubServiceListener<SimpleMessageModel> listener){
        AcceptBidTask task = new AcceptBidTask(listener);
        task.run(token,model);
    }
    public static void rejectBid(String token, PostBidModel model, final WorkHubServiceListener<SimpleMessageModel> listener){
        RejectBidTask task = new RejectBidTask(listener);
        task.run(token,model);
    }

    public static void createUpdate(String token, CreateUpdateModel model, final WorkHubServiceListener<SimpleMessageModel> listener){
        CreateUpdateTask task = new CreateUpdateTask(listener);
        task.run(token,model);
    }

    public static void getSelfJobs(String token,final WorkHubServiceListener<GetAllJobsReturnModel> listener){
        GetSelfJobsTask task = new GetSelfJobsTask(listener);
        task.run(token);
    }
    public static void requestUpdate(String token, RequestUpdateModel model, final WorkHubServiceListener<SimpleMessageModel> listener){
        RequestJobTask task = new RequestJobTask(listener);
        task.run(token,model);
    }
}
